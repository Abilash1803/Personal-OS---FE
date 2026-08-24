import { ProgressRing } from './ProgressRing';

export const FocusTimer = ({ formattedTime, progressPercentage, status }) => {
  const getStatusText = () => {
    switch (status) {
      case 'Running':
        return 'Focus Mode Active';
      case 'Paused':
        return 'Session Paused';
      case 'Completed':
        return 'Task Completed';
      case 'Skipped':
        return 'Session Skipped';
      default:
        return 'Ready to Focus';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'Running':
        return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'Paused':
        return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'Completed':
        return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      default:
        return 'text-slate-500 bg-slate-100 border-slate-200';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-6">
      <ProgressRing progressPercentage={progressPercentage} size={280} strokeWidth={10}>
        <div className="text-center space-y-1">
          {/* Main Large Timer Display */}
          <div className="text-5xl font-extrabold tracking-tight font-mono text-[#0F172A]">
            {formattedTime}
          </div>

          {/* Status Badge inside timer */}
          <span
            className={`inline-block px-3 py-0.5 text-xs font-semibold rounded-full border ${getStatusColor()}`}
          >
            {getStatusText()}
          </span>
        </div>
      </ProgressRing>
    </div>
  );
};
