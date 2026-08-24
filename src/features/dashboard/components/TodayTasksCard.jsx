import { Card } from '../../../components/ui/Card';
import { TaskItem } from './TaskItem';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { EmptyState } from '../../../components/ui/EmptyState';
import { TASK_STATUSES } from '../../../utils/taskUtils';
import { CheckSquare } from 'lucide-react';

export const TodayTasksCard = ({ tasks, onStatusChange }) => {
  const allCompleted = tasks.length > 0 && tasks.every((t) => t.status === TASK_STATUSES.COMPLETED);

  return (
    <Card hoverEffect={false} className="relative z-10 flex flex-col gap-4 overflow-visible">
      <SectionHeader
        icon={CheckSquare}
        title="Today's Tasks"
        subtitle="Core action items for today"
        rightAction={
          <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-[#0F172A] rounded-full border border-slate-200">
            {tasks.length} Tasks
          </span>
        }
      />

      {allCompleted ? (
        <EmptyState
          emoji="🎉"
          title="Everything completed!"
          subtitle="All daily goals achieved. Enjoy your evening."
          className="py-10"
        />
      ) : (
        <div className="flex flex-col gap-2.5">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onStatusChange={onStatusChange} />
          ))}
        </div>
      )}
    </Card>
  );
};
