import { Button } from '../../../components/ui/Button';
import { Play, Pause, CheckCircle2, FastForward } from 'lucide-react';

export const SessionControls = ({
  status = 'NotStarted',
  onStart,
  onPause,
  onResume,
  onComplete,
  onSkip,
}) => {
  if (status === 'Completed' || status === 'Skipped') {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-3 flex-wrap sm:flex-nowrap">
      {status === 'NotStarted' && (
        <Button
          variant="primary"
          size="lg"
          icon={Play}
          onClick={onStart}
          className="px-8 py-3.5 text-base font-bold shadow-lg shadow-blue-500/20 w-full sm:w-auto min-h-[48px]"
        >
          Start Focus
        </Button>
      )}

      {status === 'Running' && (
        <>
          <Button
            variant="outline"
            size="lg"
            icon={Pause}
            onClick={onPause}
            className="px-6 py-3 font-semibold min-h-[48px]"
          >
            Pause
          </Button>

          <Button
            variant="primary"
            size="lg"
            icon={CheckCircle2}
            onClick={onComplete}
            className="px-8 py-3 font-bold bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 shadow-md shadow-emerald-500/20 min-h-[48px]"
          >
            Complete Task
          </Button>
        </>
      )}

      {status === 'Paused' && (
        <>
          <Button
            variant="primary"
            size="lg"
            icon={Play}
            onClick={onResume}
            className="px-8 py-3 font-bold min-h-[48px]"
          >
            Resume Focus
          </Button>

          <Button
            variant="outline"
            size="lg"
            icon={CheckCircle2}
            onClick={onComplete}
            className="px-6 py-3 font-semibold text-emerald-600 border-emerald-200 hover:bg-emerald-50 min-h-[48px]"
          >
            Complete
          </Button>
        </>
      )}

      <Button
        variant="ghost"
        size="md"
        icon={FastForward}
        onClick={onSkip}
        className="text-slate-400 hover:text-slate-700 min-h-[44px]"
      >
        Skip Session
      </Button>
    </div>
  );
};
