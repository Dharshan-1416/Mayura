import React, { useState, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { ArrowLeft, BookOpen, Plus, FileText, Video, ExternalLink, Trash2, Send, Upload } from 'lucide-react';
import { Course } from '../types';
import { MaterialUpload } from '../components/MaterialUpload';

interface CourseDetailProps {
  courseId: string;
  onBack: () => void;
}

export const CourseDetail: React.FC<CourseDetailProps> = ({ courseId, onBack }) => {
  const { user } = useAuth();
  const {
    courses, modules, materials, discussions,
    addModule, updateModule, deleteModule,
    addMaterial, updateMaterial, deleteMaterial,
    updateCourse, addDiscussion
  } = useData();

  const course = courses.find(c => c.id === courseId);
  const isTrainer = user?.role === 'trainer' && course?.trainerId === user?.id;

  const [activeTab, setActiveTab] = useState<'content' | 'discussion'>('content');
  const [showModuleForm, setShowModuleForm] = useState(false);
  const [moduleTitle, setModuleTitle] = useState('');
  const [moduleDesc, setModuleDesc] = useState('');

  const [showMaterialForm, setShowMaterialForm] = useState<string | null>(null);
  const [materialTitle, setMaterialTitle] = useState('');
  const [materialContent, setMaterialContent] = useState('');
  const [showFileUpload, setShowFileUpload] = useState<string | null>(null);

  const [discussionText, setDiscussionText] = useState('');

  const courseModules = useMemo(
    () => modules.filter(m => m.courseId === courseId).sort((a, b) => a.orderIndex - b.orderIndex),
    [modules, courseId]
  );

  const courseMaterials = useMemo(() => {
    const mats: Record<string, typeof materials> = {};
    courseModules.forEach(mod => {
      mats[mod.id] = materials
        .filter(m => m.moduleId === mod.id)
        .sort((a, b) => a.orderIndex - b.orderIndex);
    });
    return mats;
  }, [materials, courseModules]);

  const courseDiscussions = useMemo(
    () => discussions.filter(d => d.courseId === courseId && !d.parentId).reverse(),
    [discussions, courseId]
  );

  if (!course) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Course not found</div>;
  }

  const handleAddModule = () => {
    if (!moduleTitle.trim()) return;

    addModule({
      courseId,
      title: moduleTitle,
      description: moduleDesc,
      orderIndex: courseModules.length
    });

    setModuleTitle('');
    setModuleDesc('');
    setShowModuleForm(false);
  };

  const handleDeleteModule = (moduleId: string) => {
    if (confirm('Delete this module and all its materials?')) {
      deleteModule(moduleId);
    }
  };

  const handleAddMaterial = (moduleId: string) => {
    if (!materialTitle.trim()) return;

    const moduleMaterials = courseMaterials[moduleId] || [];
    addMaterial({
      moduleId,
      title: materialTitle,
      content: materialContent,
      orderIndex: moduleMaterials.length
    });

    setMaterialTitle('');
    setMaterialContent('');
    setShowMaterialForm(null);
  };

  const handleAddFile = (moduleId: string, fileData: { fileUrl: string; fileType: 'video' | 'pdf' }) => {
    const moduleMaterials = courseMaterials[moduleId] || [];
    const fileTitle = fileData.fileType === 'video' ? 'Video Lecture' : 'PDF Document';

    addMaterial({
      moduleId,
      title: fileTitle,
      content: '',
      fileUrl: fileData.fileUrl,
      fileType: fileData.fileType,
      orderIndex: moduleMaterials.length
    });

    setShowFileUpload(null);
  };

  const getVideoEmbedUrl = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('youtu.be')
        ? url.split('youtu.be/')[1]?.split('?')[0]
        : url.split('v=')[1]?.split('&')[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }
    if (url.includes('vimeo.com')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
    }
    return url;
  };

  const handleDeleteMaterial = (materialId: string) => {
    if (confirm('Delete this material?')) {
      deleteMaterial(materialId);
    }
  };

  const handleTogglePublish = () => {
    updateCourse(courseId, { isPublished: !course.isPublished });
  };

  const handlePostDiscussion = () => {
    if (!discussionText.trim() || !user) return;

    addDiscussion({
      courseId,
      userId: user.id,
      userName: user.fullName,
      userRole: user.role,
      content: discussionText
    });

    setDiscussionText('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-slate-400 hover:text-white transition"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>

            <h1 className="text-xl font-bold text-white truncate max-w-md">{course.title}</h1>

            {isTrainer && (
              <button
                onClick={handleTogglePublish}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  course.isPublished
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20'
                    : 'bg-slate-700 text-white hover:bg-slate-600'
                }`}
                aria-label={course.isPublished ? 'Unpublish course' : 'Publish course'}
              >
                {course.isPublished ? 'Published' : 'Publish'}
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-6">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">{course.title}</h2>
              <p className="text-slate-400">{course.description}</p>
              <p className="text-sm text-slate-500 mt-2">Instructor: {course.trainerName}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden">
          <div className="border-b border-slate-700">
            <div className="flex">
              <button
                onClick={() => setActiveTab('content')}
                className={`flex-1 px-6 py-4 font-medium transition ${
                  activeTab === 'content'
                    ? 'text-amber-500 border-b-2 border-amber-500 bg-slate-800/50'
                    : 'text-slate-400 hover:text-white'
                }`}
                aria-label="Course content"
              >
                Course Content
              </button>
              <button
                onClick={() => setActiveTab('discussion')}
                className={`flex-1 px-6 py-4 font-medium transition ${
                  activeTab === 'discussion'
                    ? 'text-amber-500 border-b-2 border-amber-500 bg-slate-800/50'
                    : 'text-slate-400 hover:text-white'
                }`}
                aria-label="Discussion"
              >
                Discussion
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'content' && (
              <div className="space-y-6">
                {isTrainer && (
                  <div className="flex justify-end">
                    <button
                      onClick={() => setShowModuleForm(!showModuleForm)}
                      className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg transition"
                      aria-label="Add module"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Module</span>
                    </button>
                  </div>
                )}

                {showModuleForm && (
                  <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 space-y-3">
                    <input
                      type="text"
                      placeholder="Module title"
                      value={moduleTitle}
                      onChange={(e) => setModuleTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <textarea
                      placeholder="Module description (optional)"
                      value={moduleDesc}
                      onChange={(e) => setModuleDesc(e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={handleAddModule}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded font-medium transition"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => setShowModuleForm(false)}
                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded font-medium transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {courseModules.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    {isTrainer ? 'Add modules to start building your course' : 'No modules available yet'}
                  </div>
                ) : (
                  courseModules.map((module, idx) => (
                    <div key={module.id} className="bg-slate-900/30 border border-slate-700 rounded-lg overflow-hidden">
                      <div className="bg-slate-800/50 px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-amber-500 font-semibold">Module {idx + 1}</span>
                          <h3 className="text-white font-bold">{module.title}</h3>
                        </div>
                        {isTrainer && (
                          <button
                            onClick={() => handleDeleteModule(module.id)}
                            className="p-1 text-slate-400 hover:text-red-400 transition"
                            aria-label="Delete module"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      {module.description && (
                        <div className="px-4 py-2 text-slate-400 text-sm border-b border-slate-700">
                          {module.description}
                        </div>
                      )}

                      <div className="p-4 space-y-3">
                        {courseMaterials[module.id]?.map(material => (
                          <div key={material.id} className="bg-slate-800/30 rounded-lg overflow-hidden">
                            {material.fileType === 'video' && material.fileUrl && (
                              <div className="aspect-video bg-black">
                                <iframe
                                  src={getVideoEmbedUrl(material.fileUrl)}
                                  className="w-full h-full"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  title={material.title}
                                />
                              </div>
                            )}

                            <div className="flex items-center justify-between px-4 py-3">
                              <div className="flex items-center space-x-3 flex-1">
                                {material.fileType === 'video' ? (
                                  <Video className="w-5 h-5 text-amber-500 flex-shrink-0" />
                                ) : material.fileType === 'pdf' ? (
                                  <FileText className="w-5 h-5 text-red-500 flex-shrink-0" />
                                ) : (
                                  <FileText className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                )}
                                <div className="flex-1 min-w-0">
                                  <p className="text-white font-medium">{material.title}</p>
                                  {material.content && (
                                    <p className="text-slate-400 text-sm line-clamp-1">{material.content}</p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {material.fileUrl && material.fileType === 'pdf' && (
                                  <a
                                    href={material.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-slate-400 hover:text-amber-400 transition"
                                    aria-label="Open PDF"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                )}
                                {isTrainer && (
                                  <button
                                    onClick={() => handleDeleteMaterial(material.id)}
                                    className="p-2 text-slate-400 hover:text-red-400 transition"
                                    aria-label="Delete material"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}

                        {isTrainer && showMaterialForm === module.id && (
                          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 space-y-2">
                            <input
                              type="text"
                              placeholder="Material title"
                              value={materialTitle}
                              onChange={(e) => setMaterialTitle(e.target.value)}
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                            <textarea
                              placeholder="Content"
                              value={materialContent}
                              onChange={(e) => setMaterialContent(e.target.value)}
                              rows={3}
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                            />
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleAddMaterial(module.id)}
                                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-sm rounded font-medium transition"
                              >
                                Add
                              </button>
                              <button
                                onClick={() => setShowMaterialForm(null)}
                                className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded font-medium transition"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}

                        {isTrainer && showFileUpload === module.id && (
                          <MaterialUpload
                            onUpload={(fileData) => handleAddFile(module.id, fileData)}
                            onCancel={() => setShowFileUpload(null)}
                          />
                        )}

                        {isTrainer && showMaterialForm !== module.id && showFileUpload !== module.id && (
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => setShowMaterialForm(module.id)}
                              className="flex items-center justify-center space-x-2 py-2 text-slate-400 hover:text-amber-500 hover:bg-slate-800/30 rounded-lg transition"
                              aria-label="Add text material"
                            >
                              <Plus className="w-4 h-4" />
                              <span className="text-sm font-medium">Add Text</span>
                            </button>
                            <button
                              onClick={() => setShowFileUpload(module.id)}
                              className="flex items-center justify-center space-x-2 py-2 text-slate-400 hover:text-amber-500 hover:bg-slate-800/30 rounded-lg transition"
                              aria-label="Add video or PDF"
                            >
                              <Upload className="w-4 h-4" />
                              <span className="text-sm font-medium">Add Media</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'discussion' && (
              <div className="space-y-6">
                <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                  <textarea
                    placeholder="Share your thoughts or ask a question..."
                    value={discussionText}
                    onChange={(e) => setDiscussionText(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none mb-3"
                  />
                  <button
                    onClick={handlePostDiscussion}
                    className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg transition"
                    aria-label="Post discussion"
                  >
                    <Send className="w-4 h-4" />
                    <span>Post</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {courseDiscussions.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                      No discussions yet. Start the conversation!
                    </div>
                  ) : (
                    courseDiscussions.map(discussion => (
                      <div key={discussion.id} className="bg-slate-900/30 border border-slate-700 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-medium text-sm">
                              {discussion.userName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-white font-medium">{discussion.userName}</span>
                              <span className={`text-xs px-2 py-0.5 rounded ${
                                discussion.userRole === 'trainer'
                                  ? 'bg-amber-500/10 text-amber-400'
                                  : 'bg-blue-500/10 text-blue-400'
                              }`}>
                                {discussion.userRole}
                              </span>
                              <span className="text-slate-500 text-sm">
                                {new Date(discussion.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-slate-300">{discussion.content}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
