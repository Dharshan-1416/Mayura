import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { ArrowLeft, Save } from 'lucide-react';
import { HUDLoader } from '../components/HUDLoader';

interface CreateCourseProps {
  onBack: () => void;
  onSuccess: (courseId: string) => void;
}

export const CreateCourse: React.FC<CreateCourseProps> = ({ onBack, onSuccess }) => {
  const { user } = useAuth();
  const { addCourse } = useData();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setTimeout(() => {
      const course = addCourse({
        trainerId: user.id,
        trainerName: user.fullName,
        title,
        description,
        isPublished
      });
      setSaving(false);
      onSuccess(course.id);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {saving && <HUDLoader variant="fullscreen" message="Creating Course..." />}

      <nav className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-slate-400 hover:text-white transition"
              aria-label="Back to dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>

            <h1 className="text-xl font-bold text-white">Create New Course</h1>
            <div className="w-20" />
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">
                Course Title *
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                placeholder="Introduction to React Development"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">
                Course Description *
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={6}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition resize-none"
                placeholder="Describe what trainees will learn in this course..."
              />
            </div>

            <div className="flex items-center space-x-3">
              <input
                id="isPublished"
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-5 h-5 bg-slate-900/50 border-slate-600 rounded text-amber-500 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-800"
              />
              <label htmlFor="isPublished" className="text-sm font-medium text-slate-300">
                Publish course immediately (trainees can enroll)
              </label>
            </div>

            <div className="flex items-center space-x-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                aria-label="Create course"
              >
                <Save className="w-5 h-5" />
                <span>Create Course</span>
              </button>

              <button
                type="button"
                onClick={onBack}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition"
                aria-label="Cancel"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
          <h3 className="text-blue-400 font-semibold mb-2">Next Steps</h3>
          <ul className="text-slate-300 text-sm space-y-1 list-disc list-inside">
            <li>After creating the course, you can add modules and learning materials</li>
            <li>Create assignments to assess trainee understanding</li>
            <li>Publish the course when you're ready for trainees to enroll</li>
          </ul>
        </div>
      </main>
    </div>
  );
};
