import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course, Module, Material, Assignment, Submission, Enrollment, Discussion } from '../types';

interface DataContextType {
  courses: Course[];
  modules: Module[];
  materials: Material[];
  assignments: Assignment[];
  submissions: Submission[];
  enrollments: Enrollment[];
  discussions: Discussion[];
  addCourse: (course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>) => Course;
  updateCourse: (id: string, updates: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  addModule: (module: Omit<Module, 'id' | 'createdAt'>) => Module;
  updateModule: (id: string, updates: Partial<Module>) => void;
  deleteModule: (id: string) => void;
  addMaterial: (material: Omit<Material, 'id' | 'createdAt'>) => Material;
  updateMaterial: (id: string, updates: Partial<Material>) => void;
  deleteMaterial: (id: string) => void;
  addAssignment: (assignment: Omit<Assignment, 'id' | 'createdAt'>) => Assignment;
  updateAssignment: (id: string, updates: Partial<Assignment>) => void;
  deleteAssignment: (id: string) => void;
  addSubmission: (submission: Omit<Submission, 'id' | 'submittedAt'>) => Submission;
  updateSubmission: (id: string, updates: Partial<Submission>) => void;
  addEnrollment: (enrollment: Omit<Enrollment, 'id' | 'enrolledAt'>) => Enrollment;
  updateEnrollment: (id: string, updates: Partial<Enrollment>) => void;
  addDiscussion: (discussion: Omit<Discussion, 'id' | 'createdAt'>) => Discussion;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  courses: 'lms_courses',
  modules: 'lms_modules',
  materials: 'lms_materials',
  assignments: 'lms_assignments',
  submissions: 'lms_submissions',
  enrollments: 'lms_enrollments',
  discussions: 'lms_discussions'
};

const getStored = <T,>(key: string): T[] => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
};

const setStored = <T,>(key: string, data: T[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);

  useEffect(() => {
    setCourses(getStored<Course>(STORAGE_KEYS.courses));
    setModules(getStored<Module>(STORAGE_KEYS.modules));
    setMaterials(getStored<Material>(STORAGE_KEYS.materials));
    setAssignments(getStored<Assignment>(STORAGE_KEYS.assignments));
    setSubmissions(getStored<Submission>(STORAGE_KEYS.submissions));
    setEnrollments(getStored<Enrollment>(STORAGE_KEYS.enrollments));
    setDiscussions(getStored<Discussion>(STORAGE_KEYS.discussions));
  }, []);

  const addCourse = (courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newCourse: Course = {
      ...courseData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updated = [...courses, newCourse];
    setCourses(updated);
    setStored(STORAGE_KEYS.courses, updated);
    return newCourse;
  };

  const updateCourse = (id: string, updates: Partial<Course>) => {
    const updated = courses.map(c =>
      c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
    );
    setCourses(updated);
    setStored(STORAGE_KEYS.courses, updated);
  };

  const deleteCourse = (id: string) => {
    const updated = courses.filter(c => c.id !== id);
    setCourses(updated);
    setStored(STORAGE_KEYS.courses, updated);
  };

  const addModule = (moduleData: Omit<Module, 'id' | 'createdAt'>) => {
    const newModule: Module = {
      ...moduleData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    const updated = [...modules, newModule];
    setModules(updated);
    setStored(STORAGE_KEYS.modules, updated);
    return newModule;
  };

  const updateModule = (id: string, updates: Partial<Module>) => {
    const updated = modules.map(m => (m.id === id ? { ...m, ...updates } : m));
    setModules(updated);
    setStored(STORAGE_KEYS.modules, updated);
  };

  const deleteModule = (id: string) => {
    const updated = modules.filter(m => m.id !== id);
    setModules(updated);
    setStored(STORAGE_KEYS.modules, updated);
  };

  const addMaterial = (materialData: Omit<Material, 'id' | 'createdAt'>) => {
    const newMaterial: Material = {
      ...materialData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    const updated = [...materials, newMaterial];
    setMaterials(updated);
    setStored(STORAGE_KEYS.materials, updated);
    return newMaterial;
  };

  const updateMaterial = (id: string, updates: Partial<Material>) => {
    const updated = materials.map(m => (m.id === id ? { ...m, ...updates } : m));
    setMaterials(updated);
    setStored(STORAGE_KEYS.materials, updated);
  };

  const deleteMaterial = (id: string) => {
    const updated = materials.filter(m => m.id !== id);
    setMaterials(updated);
    setStored(STORAGE_KEYS.materials, updated);
  };

  const addAssignment = (assignmentData: Omit<Assignment, 'id' | 'createdAt'>) => {
    const newAssignment: Assignment = {
      ...assignmentData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    const updated = [...assignments, newAssignment];
    setAssignments(updated);
    setStored(STORAGE_KEYS.assignments, updated);
    return newAssignment;
  };

  const updateAssignment = (id: string, updates: Partial<Assignment>) => {
    const updated = assignments.map(a => (a.id === id ? { ...a, ...updates } : a));
    setAssignments(updated);
    setStored(STORAGE_KEYS.assignments, updated);
  };

  const deleteAssignment = (id: string) => {
    const updated = assignments.filter(a => a.id !== id);
    setAssignments(updated);
    setStored(STORAGE_KEYS.assignments, updated);
  };

  const addSubmission = (submissionData: Omit<Submission, 'id' | 'submittedAt'>) => {
    const newSubmission: Submission = {
      ...submissionData,
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString()
    };
    const updated = [...submissions, newSubmission];
    setSubmissions(updated);
    setStored(STORAGE_KEYS.submissions, updated);
    return newSubmission;
  };

  const updateSubmission = (id: string, updates: Partial<Submission>) => {
    const updated = submissions.map(s => (s.id === id ? { ...s, ...updates } : s));
    setSubmissions(updated);
    setStored(STORAGE_KEYS.submissions, updated);
  };

  const addEnrollment = (enrollmentData: Omit<Enrollment, 'id' | 'enrolledAt'>) => {
    const newEnrollment: Enrollment = {
      ...enrollmentData,
      id: crypto.randomUUID(),
      enrolledAt: new Date().toISOString()
    };
    const updated = [...enrollments, newEnrollment];
    setEnrollments(updated);
    setStored(STORAGE_KEYS.enrollments, updated);
    return newEnrollment;
  };

  const updateEnrollment = (id: string, updates: Partial<Enrollment>) => {
    const updated = enrollments.map(e => (e.id === id ? { ...e, ...updates } : e));
    setEnrollments(updated);
    setStored(STORAGE_KEYS.enrollments, updated);
  };

  const addDiscussion = (discussionData: Omit<Discussion, 'id' | 'createdAt'>) => {
    const newDiscussion: Discussion = {
      ...discussionData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    const updated = [...discussions, newDiscussion];
    setDiscussions(updated);
    setStored(STORAGE_KEYS.discussions, updated);
    return newDiscussion;
  };

  return (
    <DataContext.Provider
      value={{
        courses,
        modules,
        materials,
        assignments,
        submissions,
        enrollments,
        discussions,
        addCourse,
        updateCourse,
        deleteCourse,
        addModule,
        updateModule,
        deleteModule,
        addMaterial,
        updateMaterial,
        deleteMaterial,
        addAssignment,
        updateAssignment,
        deleteAssignment,
        addSubmission,
        updateSubmission,
        addEnrollment,
        updateEnrollment,
        addDiscussion
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
