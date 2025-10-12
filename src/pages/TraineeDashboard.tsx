import React, { useState, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { BookOpen, Search, TrendingUp, Clock, CheckCircle, User } from 'lucide-react';
import { HUDLoader } from '../components/HUDLoader';

interface TraineeDashboardProps {
  onViewCourse: (courseId: string) => void;
  onBrowseCourses: () => void;
}

export const TraineeDashboard: React.FC<TraineeDashboardProps> = ({
  onViewCourse,
  onBrowseCourses
}) => {
  const { user, logout } = useAuth();
  const { courses, enrollments, submissions } = useData();
  const [loading] = useState(false);

  const myEnrollments = useMemo(
    () => enrollments.filter(e => e.traineeId === user?.id),
    [enrollments, user]
  );

  const enrolledCourses = useMemo(
    () => courses.filter(c => myEnrollments.some(e => e.courseId === c.id)),
    [courses, myEnrollments]
  );

  const mySubmissions = useMemo(
    () => submissions.filter(s => s.traineeId === user?.id),
    [submissions, user]
  );

  const completedCourses = useMemo(
    () => myEnrollments.filter(e => e.completedAt).length,
    [myEnrollments]
  );

  const inProgressCourses = useMemo(
    () => myEnrollments.filter(e => !e.completedAt).length,
    [myEnrollments]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {loading && <HUDLoader variant="fullscreen" message="Loading Dashboard..." />}

      <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold text-white">Mayura LMS</h1>
              </div>
            </div>

            <button
              onClick={logout}
              className="group flex items-center space-x-2 px-3 py-1.5 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition"
              aria-label="User menu"
            >
              <div className="w-7 h-7 bg-gradient-to-br from-slate-700 to-slate-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium hidden sm:block">{user?.fullName}</span>
            </button>
          </div>
        </div>
      </nav>

      <button
        onClick={onBrowseCourses}
        className="fixed bottom-6 right-6 z-50 group flex items-center space-x-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold py-4 px-4 rounded-full shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-900"
        aria-label="Browse available courses"
      >
        <Search className="w-6 h-6" />
        <span className="hidden sm:inline-block pr-2">Browse Courses</span>
      </button>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-400 text-sm font-medium">In Progress</h3>
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-white">{inProgressCourses}</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-400 text-sm font-medium">Completed</h3>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-white">{completedCourses}</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-400 text-sm font-medium">Submissions</h3>
              <TrendingUp className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-3xl font-bold text-white">{mySubmissions.length}</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6">My Courses</h2>

        {enrolledCourses.length === 0 ? (
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-12 text-center">
            <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No courses enrolled yet</h3>
            <p className="text-slate-400 mb-6">Discover and enroll in courses to start learning</p>
            <button
              onClick={onBrowseCourses}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold py-2.5 px-5 rounded-lg transition-all"
              aria-label="Browse available courses"
            >
              <Search className="w-5 h-5" />
              <span>Browse Courses</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map(course => {
              const enrollment = myEnrollments.find(e => e.courseId === course.id);
              const progress = enrollment?.progress || 0;

              return (
                <div
                  key={course.id}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 group"
                >
                  <div className="h-32 bg-gradient-to-br from-amber-500/20 to-orange-600/20 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-amber-500" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{course.title}</h3>
                    <p className="text-slate-400 text-sm line-clamp-2 mb-3">{course.description}</p>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
                        <span>Progress</span>
                        <span className="font-medium">{progress}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-amber-500 to-orange-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                          role="progressbar"
                          aria-valuenow={progress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`Course progress: ${progress}%`}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => onViewCourse(course.id)}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all"
                      aria-label={enrollment?.completedAt ? `Review ${course.title}` : `Continue ${course.title}`}
                    >
                      {enrollment?.completedAt ? 'Review Course' : 'Continue'}
                    </button>
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
