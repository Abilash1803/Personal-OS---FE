import { useNavigate } from 'react-router-dom';
import { PageContainer } from '../components/ui/PageContainer';
import { useFocus } from '../hooks/useFocus';
import { useTimer } from '../hooks/useTimer';
import { FocusHeader } from '../features/focus/components/FocusHeader';
import { FocusTimer } from '../features/focus/components/FocusTimer';
import { SessionControls } from '../features/focus/components/SessionControls';
import { SessionNotes } from '../features/focus/components/SessionNotes';
import { CompletionCard } from '../features/focus/components/CompletionCard';
import { DeleteDialog } from '../components/ui/DeleteDialog';
import { ArrowLeft, Zap } from 'lucide-react';

export const FocusPage = () => {
  const navigate = useNavigate();

  const {
    task,
    session,
    notes,
    isSavingNotes,
    showExitDialog,
    setShowExitDialog,
    handleStart,
    handlePause,
    handleResume,
    handleComplete,
    handleSkip,
    handleNotesChange,
  } = useFocus();

  const { formattedTime, progressPercentage } = useTimer(
    session,
    task?.estimatedMinutes || 30
  );

  const isCompletedOrSkipped = session?.status === 'Completed' || session?.status === 'Skipped';

  const handleExitClick = () => {
    if (session?.status === 'Running') {
      setShowExitDialog(true);
    } else {
      navigate('/');
    }
  };

  if (!task) {
    return (
      <PageContainer className="max-w-[700px]">
        <div className="p-8 text-center space-y-3 bg-white border border-[#E2E8F0] rounded-2xl shadow-xs">
          <Zap className="w-8 h-8 text-blue-600 mx-auto" />
          <h2 className="text-lg font-bold text-[#0F172A]">No Task Selected</h2>
          <p className="text-xs text-[#64748B]">Select a task from your dashboard or agenda to begin a focus session.</p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="max-w-[700px] py-4">
      {/* Top Exit Navigation Link */}
      <div className="flex items-center justify-between pb-2">
        <button
          type="button"
          onClick={handleExitClick}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors p-1.5 rounded-lg hover:bg-slate-100"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Focus</span>
        </button>

        <span className="hidden sm:inline-block text-[11px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
          Space: Start/Pause • Enter: Complete • Esc: Exit
        </span>
      </div>

      {/* Main Focus Content */}
      {isCompletedOrSkipped ? (
        <CompletionCard session={session} task={task} />
      ) : (
        <div className="space-y-6">
          {/* Header Metadata */}
          <FocusHeader task={task} />

          {/* Large Timer with SVG Progress Ring */}
          <FocusTimer
            formattedTime={formattedTime}
            progressPercentage={progressPercentage}
            status={session?.status}
          />

          {/* Action Control Buttons */}
          <SessionControls
            status={session?.status}
            onStart={handleStart}
            onPause={handlePause}
            onResume={handleResume}
            onComplete={handleComplete}
            onSkip={handleSkip}
          />

          {/* Plain Text Scratchpad Notes */}
          <SessionNotes
            notes={notes}
            onNotesChange={handleNotesChange}
            isSaving={isSavingNotes}
          />
        </div>
      )}

      {/* Exit Confirmation Dialog */}
      <DeleteDialog
        isOpen={showExitDialog}
        onClose={() => setShowExitDialog(false)}
        onConfirm={() => navigate('/')}
        title="Exit Active Focus Session?"
        message="Your timer will continue running in the background until paused or completed."
      />
    </PageContainer>
  );
};
