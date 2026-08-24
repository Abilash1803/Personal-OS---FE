import { useState, useEffect } from 'react';
import { useDailyGenerator } from '../hooks/useDailyGenerator';
import { useProgress } from '../hooks/useProgress';
import { PageContainer } from '../components/ui/PageContainer';
import { GreetingHeader } from '../features/dashboard/components/GreetingHeader';
import { BackupNotice } from '../features/dashboard/components/BackupNotice';
import { TodayProgressCard } from '../features/dashboard/components/TodayProgressCard';
import { TodayTasksCard } from '../features/dashboard/components/TodayTasksCard';
import { TodayReminderCard } from '../features/dashboard/components/TodayReminderCard';
import { TodayNoteCard } from '../features/dashboard/components/TodayNoteCard';
import { RecentActivityCard } from '../features/dashboard/components/RecentActivityCard';
import { TodayReviewCard } from '../features/dashboard/components/TodayReviewCard';
import { SkeletonCard, SkeletonTaskList } from '../components/ui/SkeletonLoader';

export const DashboardPage = () => {
  const {
    tasks,
    note,
    isSavingNote,
    updateTaskStatus,
    updateNote,
  } = useDailyGenerator();

  const { metrics } = useProgress(tasks);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 150);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <PageContainer>
        <div className="h-16 bg-slate-200/60 rounded-xl animate-pulse mb-6 w-72" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">
            <SkeletonCard />
            <SkeletonTaskList />
          </div>
          <div className="lg:col-span-5 space-y-6">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* Greeting Header */}
      <GreetingHeader userName="Abilash" />

      {/* Non-blocking Backup Notice if never backed up */}
      <BackupNotice />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Progress, Tasks, & Today Notes (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <TodayProgressCard metrics={metrics} />
          <TodayTasksCard tasks={tasks} onStatusChange={updateTaskStatus} />
          <TodayNoteCard
            note={note}
            onNoteChange={updateNote}
            isSaving={isSavingNote}
          />
        </div>

        {/* Right Column: Review, Reminders Timeline, & Recent Activity (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <TodayReviewCard />
          <TodayReminderCard />
          <RecentActivityCard />
        </div>
      </div>
    </PageContainer>
  );
};
