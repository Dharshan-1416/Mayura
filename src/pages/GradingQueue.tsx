import React, { useState, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { ArrowLeft, CheckCircle, FileText } from 'lucide-react';
import { HUDLoader } from '../components/HUDLoader';

interface GradingQueueProps {
  courseId: string;
  onBack: () => void;
}

export const GradingQueue: React.FC<GradingQueueProps> = ({ courseId, onBack }) => {
  const { user } = useAuth();
  const { courses, assignments, submissions, updateSubmission } = useData();

  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');
  const [grading, setGrading] = useState(false);

  const course = courses.find(c => c.id === courseId);

  const courseAssignments = useMemo(
    () => assignments.filter(a => a.courseId === courseId),
    [assignments, courseId]
  );

  const pendingSubmissions = useMemo(() => {
    const assignmentIds = new Set(courseAssignments.map(a => a.id));
    return submissions.filter(s => assignmentIds.has(s.assignmentId) && !s.grade);
  }, [submissions, courseAssignments]);

  const selectedSub = selectedSubmission
    ? submissions.find(s => s.id === selectedSubmission)
    : null;

  const selectedAssignment = selectedSub
    ? assignments.find(a => a.id === selectedSub.assignmentId)
    : null;

  const handleGrade = async () => {
    if (!selectedSub || !user) return;

    const gradeNum = parseInt(grade);
    if (isNaN(gradeNum) || gradeNum < 0) return;

    setGrading(true);
    setTimeout(() => {
      updateSubmission(selectedSub.id, {
        grade: gradeNum,
        feedback,
        gradedAt: new Date().toISOString(),
        gradedBy: user.id
      });

      setGrading(false);
      setSelectedSubmission(null);
      setGrade('');
      setFeedback('');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {grading && <HUDLoader variant="fullscreen" message="Submitting Grade..." />}

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

            <h1 className="text-xl font-bold text-white">Grading Queue</h1>
            <div className="w-20" />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-4 mb-6">
          <h2 className="text-lg font-bold text-white">{course?.title}</h2>
          <p className="text-slate-400 text-sm">{pendingSubmissions.length} submissions pending</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Pending Submissions</h3>

            {pendingSubmissions.length === 0 ? (
              <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-8 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="text-slate-400">All caught up! No pending submissions.</p>
              </div>
            ) : (
              pendingSubmissions.map(submission => {
                const assignment = assignments.find(a => a.id === submission.assignmentId);
                return (
                  <button
                    key={submission.id}
                    onClick={() => {
                      setSelectedSubmission(submission.id);
                      setGrade('');
                      setFeedback('');
                    }}
                    className={`w-full text-left bg-slate-800/50 border rounded-xl p-4 transition ${
                      selectedSubmission === submission.id
                        ? 'border-amber-500 bg-slate-800'
                        : 'border-slate-700 hover:border-slate-600'
                    }`}
                    aria-label={`View submission from ${submission.traineeName}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-white font-bold">{assignment?.title}</h4>
                        <p className="text-slate-400 text-sm">by {submission.traineeName}</p>
                      </div>
                      <FileText className="w-5 h-5 text-slate-400" />
                    </div>
                    <p className="text-slate-500 text-xs">
                      Submitted {new Date(submission.submittedAt).toLocaleDateString()}
                    </p>
                  </button>
                );
              })
            )}
          </div>

          <div>
            {selectedSub && selectedAssignment ? (
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden sticky top-4">
                <div className="bg-slate-800 border-b border-slate-700 p-4">
                  <h3 className="text-lg font-bold text-white">{selectedAssignment.title}</h3>
                  <p className="text-slate-400 text-sm">Submitted by {selectedSub.traineeName}</p>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-slate-300 mb-2">Assignment Description</h4>
                    <p className="text-slate-400 text-sm">{selectedAssignment.description}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-slate-300 mb-2">Submission</h4>
                    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                      <p className="text-white whitespace-pre-wrap">{selectedSub.content || 'No content provided'}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Grade (max: {selectedAssignment.maxPoints})
                    </label>
                    <input
                      type="number"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      min="0"
                      max={selectedAssignment.maxPoints}
                      className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Enter grade"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Feedback
                    </label>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                      placeholder="Provide feedback to the trainee..."
                    />
                  </div>

                  <button
                    onClick={handleGrade}
                    disabled={!grade || grading}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Submit grade"
                  >
                    Submit Grade
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-12 text-center">
                <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">Select a submission to grade</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
