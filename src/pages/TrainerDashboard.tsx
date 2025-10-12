import React, { useState, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { BookOpen, Plus, Users, ClipboardList, LogOut } from 'lucide-react';
import { HUDLoader } from '../components/HUDLoader';

interface TrainerDashboardProps {
  onCreateCourse: () => void;
  onViewCourse: (courseId: string) => void;
  onGradeSubmissions: (courseId: string) => void;
}

export const TrainerDashboard: React.FC<TrainerDashboardProps> = ({
  onCreateCourse,
  onViewCourse,
  onGradeSubmissions
}) => {
  const { user, logout } = useAuth();
  const { courses, submissions, enrollments } = useData();
  const [loading] = useState(false);

  const myCourses = useMemo(
    () => courses.filter(c => c.trainerId === user?.id),
    [courses, user]
  );

  const pendingGrading = useMemo(() => {
    const myCoursesIds = new Set(myCourses.map(c => c.id));
    return submissions.filter(s => !s.grade && myCoursesIds.has(
      courses.find(c => c.id === s.assignmentId)?.id || ''
    ));
  }, [submissions, myCourses, courses]);

  const totalEnrollments = useMemo(() => {
    return enrollments.filter(e => myCourses.some(c => c.id === e.courseId)).length;
  }, [enrollments, myCourses]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {loading && <HUDLoader variant="fullscreen" message="Loading Dashboard..." />}

      <nav className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Internal LMS</h1>
                <p className="text-xs text-slate-400">Trainer Dashboard</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-white">{user?.fullName}</p>
                <p className="text-xs text-slate-400">{user?.email}</p>
              </div>
              <button
                onClick={logout}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition"
                aria-label="Sign out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-400 text-sm font-medium">Total Courses</h3>
              <BookOpen className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-3xl font-bold text-white">{myCourses.length}</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-400 text-sm font-medium">Total Students</h3>
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-white">{totalEnrollments}</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-400 text-sm font-medium">Pending Grading</h3>
              <ClipboardList className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-3xl font-bold text-white">{pendingGrading.length}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">My Courses</h2>
          <button
            onClick={onCreateCourse}
            className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold py-2.5 px-5 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-label="Create new course"
          >
            <Plus className="w-5 h-5" />
            <span>Create Course</span>
          </button>
        </div>

        {myCourses.length === 0 ? (
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-12 text-center">
            <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No courses yet</h3>
            <p className="text-slate-400 mb-6">Create your first course to get started</p>
            <button
              onClick={onCreateCourse}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold py-2.5 px-5 rounded-lg transition-all"
              aria-label="Create your first course"
            >
              <Plus className="w-5 h-5" />
              <span>Create Course</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myCourses.map(course => {
              const courseEnrollments = enrollments.filter(e => e.courseId === course.id).length;
              const courseSubmissions = submissions.filter(s => {
                const assignment = courses.find(c => c.id === s.assignmentId);
                return assignment?.id === course.id && !s.grade;
              }).length;

              return (
                <div
                  key={course.id}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 group"
                >
                  <div className="h-32 bg-gradient-to-br from-amber-500/20 to-orange-600/20 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-amber-500" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-white line-clamp-2 flex-1">{course.title}</h3>
                      {course.isPublished && (
                        <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                          Published
                        </span>
                      )}
                    </div>

                    <p className="text-slate-400 text-sm line-clamp-2 mb-4">{course.description}</p>

                    <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{courseEnrollments} students</span>
                      </div>
                      {courseSubmissions > 0 && (
                        <div className="flex items-center space-x-1 text-orange-400">
                          <ClipboardList className="w-4 h-4" />
                          <span>{courseSubmissions} to grade</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={() => onViewCourse(course.id)}
                        className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-lg transition"
                        aria-label={`Manage ${course.title}`}
                      >
                        Manage Course
                      </button>
                      {courseSubmissions > 0 && (
                        <button
                          onClick={() => onGradeSubmissions(course.id)}
                          className="w-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 font-medium py-2 px-4 rounded-lg transition"
                          aria-label={`Grade submissions for ${course.title}`}
                        >
                          Grade Submissions
                        </button>
                      )}
                    </div>
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
