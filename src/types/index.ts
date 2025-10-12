export type UserRole = 'trainer' | 'trainee';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Course {
  id: string;
  trainerId: string;
  trainerName: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  orderIndex: number;
  createdAt: string;
}

export interface Material {
  id: string;
  moduleId: string;
  title: string;
  content: string;
  fileUrl?: string;
  fileType?: string;
  orderIndex: number;
  createdAt: string;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate?: string;
  maxPoints: number;
  createdAt: string;
}

export interface Submission {
  id: string;
  assignmentId: string;
  traineeId: string;
  traineeName: string;
  content: string;
  fileUrl?: string;
  submittedAt: string;
  grade?: number;
  feedback: string;
  gradedAt?: string;
  gradedBy?: string;
}

export interface Enrollment {
  id: string;
  courseId: string;
  traineeId: string;
  enrolledAt: string;
  progress: number;
  completedAt?: string;
}

export interface Discussion {
  id: string;
  courseId: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  content: string;
  parentId?: string;
  createdAt: string;
  replies?: Discussion[];
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string, role: UserRole) => Promise<void>;
  logout: () => void;
}
