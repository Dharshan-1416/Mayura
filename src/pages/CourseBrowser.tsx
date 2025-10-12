import React, { useState, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { BookOpen, ArrowLeft, Search, Users } from 'lucide-react';
import { HUDLoader } from '../components/HUDLoader';

interface CourseBrowserProps {
  onBack: () => void;
  onViewCourse: (courseId: string) => void;
}

export const CourseBrowser: React.FC<CourseBrowserProps> = ({ onBack, onViewCourse }) => {
  const { user } = useAuth();
  const { courses, enrollments, addEnrollment } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [enrolling, setEnrolling] = useState<string | null>(null);

  const publishedCourses = useMemo(
    () => courses.filter(c => c.isPublished),
    [courses]
  );

  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return publishedCourses;
    const query = searchQuery.toLowerCase();
    return publishedCourses.filter(
      c => c.title.toLowerCase().includes(query) || c.description.toLowerCase().includes(query)
    );
  }, [publishedCourses, searchQuery]);

  const myEnrollments = useMemo(
    () => new Set(enrollments.filter(e => e.traineeId === user?.id).map(e => e.courseId)),
    [enrollments, user]
  );

  const handleEnroll = async (courseId: string) => {
    if (!user) return;

    setEnrolling(courseId);
    setTimeout(() => {
      addEnrollment({
        courseId,
        traineeId: user.id,
        progress: 0
      });
      setEnrolling(null);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {enrolling && <HUDLoader variant="fullscreen" message="Enrolling in Course..." />}

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

            <h1 className="text-xl font-bold text-white">Browse Courses</h1>
            <div className="w-20" />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
              aria-label="Search courses"
            />
          </div>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-12 text-center">
            <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No courses found</h3>
            <p className="text-slate-400">
              {searchQuery ? 'Try a different search term' : 'No courses are available yet'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => {
              const isEnrolled = myEnrollments.has(course.id);
              const courseEnrollments = enrollments.filter(e => e.courseId === course.id).length;

              return (
                <div
                  key={course.id}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-300"
                >
                  <div className="h-32 bg-gradient-to-br from-amber-500/20 to-orange-600/20 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-amber-500" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{course.title}</h3>
                    <p className="text-slate-400 text-sm mb-3 line-clamp-3">{course.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2 text-sm text-slate-400">
                        <Users className="w-4 h-4" />
                        <span>{courseEnrollments} enrolled</span>
                      </div>
                      <span className="text-xs text-slate-500">By {course.trainerName}</span>
                    </div>

                    {isEnrolled ? (
                      <button
                        onClick={() => onViewCourse(course.id)}
                        className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2.5 px-4 rounded-lg transition"
                        aria-label={`View ${course.title}`}
                      >
                        View Course
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEnroll(course.id)}
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all"
                        aria-label={`Enroll in ${course.title}`}
                      >
                        Enroll Now
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};
