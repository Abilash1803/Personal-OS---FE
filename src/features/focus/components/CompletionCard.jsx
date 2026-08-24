import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { CheckCircle2, ArrowRight, Clock, Coffee } from 'lucide-react';
import { timerService } from '../../../services/timerService';

export const CompletionCard = ({ session }) => {
  const navigate = useNavigate();

  if (!session || (session.status !== 'Completed' && session.status !== 'Skipped')) {
    return null;
  }

  const isCompleted = session.status === 'Completed';
  const actualTimeFormatted = timerService.formatTime(session.actualDuration || 0);

  return (
    <Card hoverEffect={false} className="p-8 text-center space-y-5 bg-gradient-to-b from-white to-slate-50">
      <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
        {isCompleted ? <CheckCircle2 className="w-8 h-8" /> : <Coffee className="w-8 h-8 text-amber-600" />}
      </div>

      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-[#0F172A]">
          {isCompleted ? 'Excellent Work!' : 'Session Skipped'}
        </h2>
        <p className="text-sm text-[#64748B] max-w-sm mx-auto">
          {isCompleted
            ? 'Take a short break before starting your next task.'
            : 'Moving forward to the next priority.'}
        </p>
      </div>

      <div className="flex items-center justify-center gap-6 p-4 bg-white border border-[#E2E8F0] rounded-2xl max-w-md mx-auto shadow-2xs">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 block uppercase">Focus Time</span>
          <span className="text-base font-bold text-[#0F172A] flex items-center justify-center gap-1 mt-0.5">
            <Clock className="w-4 h-4 text-blue-600" />
            {actualTimeFormatted}
          </span>
        </div>

        <div className="w-px h-8 bg-slate-200" />

        <div>
          <span className="text-[11px] font-semibold text-slate-400 block uppercase">Paused Duration</span>
          <span className="text-base font-bold text-[#0F172A] mt-0.5 block">
            {timerService.formatTime(session.pausedDuration || 0)}
          </span>
        </div>
      </div>

      <div className="pt-2">
        <Button
          variant="primary"
          icon={ArrowRight}
          onClick={() => navigate('/')}
          className="px-6 py-2.5 text-sm font-semibold"
        >
          Return to Dashboard
        </Button>
      </div>
    </Card>
  );
};
