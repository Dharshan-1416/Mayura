import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { TrainerDashboard } from './pages/TrainerDashboard';
import { TraineeDashboard } from './pages/TraineeDashboard';
import { CourseBrowser } from './pages/CourseBrowser';
import { CreateCourse } from './pages/CreateCourse';
import { CourseDetail } from './pages/CourseDetail';
import { GradingQueue } from './pages/GradingQueue';
import { HUDLoader } from './components/HUDLoader';

type View =
  | { type: 'login' }
  | { type: 'register' }
  | { type: 'trainerDashboard' }
  | { type: 'traineeDashboard' }
  | { type: 'courseBrowser' }
  | { type: 'createCourse' }
  | { type: 'courseDetail'; courseId: string }
  | { type: 'gradingQueue'; courseId: string };

function AppContent() {
  const { user, loading } = useAuth();
  const [view, setView] = useState<View>({ type: 'login' });

  if (loading) {
    return <HUDLoader variant="fullscreen" message="Loading..." />;
  }

  if (!user) {
    if (view.type === 'register') {
      return <Register onNavigateToLogin={() => setView({ type: 'login' })} />;
    }
    return <Login onNavigateToRegister={() => setView({ type: 'register' })} />;
  }

  if (user.role === 'trainer') {
    switch (view.type) {
      case 'createCourse':
        return (
          <CreateCourse
            onBack={() => setView({ type: 'trainerDashboard' })}
            onSuccess={(courseId) => setView({ type: 'courseDetail', courseId })}
          />
        );
      case 'courseDetail':
        return (
          <CourseDetail
            courseId={view.courseId}
            onBack={() => setView({ type: 'trainerDashboard' })}
          />
        );
      case 'gradingQueue':
        return (
          <GradingQueue
            courseId={view.courseId}
            onBack={() => setView({ type: 'trainerDashboard' })}
          />
        );
      default:
        return (
          <TrainerDashboard
            onCreateCourse={() => setView({ type: 'createCourse' })}
            onViewCourse={(courseId) => setView({ type: 'courseDetail', courseId })}
            onGradeSubmissions={(courseId) => setView({ type: 'gradingQueue', courseId })}
          />
        );
    }
  }

  switch (view.type) {
    case 'courseBrowser':
      return (
        <CourseBrowser
          onBack={() => setView({ type: 'traineeDashboard' })}
          onViewCourse={(courseId) => setView({ type: 'courseDetail', courseId })}
        />
      );
    case 'courseDetail':
      return (
        <CourseDetail
          courseId={view.courseId}
          onBack={() => setView({ type: 'traineeDashboard' })}
        />
      );
    default:
      return (
        <TraineeDashboard
          onViewCourse={(courseId) => setView({ type: 'courseDetail', courseId })}
          onBrowseCourses={() => setView({ type: 'courseBrowser' })}
        />
      );
  }
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
