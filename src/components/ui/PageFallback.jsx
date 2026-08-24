import { PageContainer } from './PageContainer';
import { SkeletonCard, SkeletonTaskList } from './SkeletonLoader';

export const PageFallback = () => (
  <PageContainer>
    <div className="h-14 bg-slate-200/60 rounded-xl animate-pulse mb-6 w-64" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SkeletonCard />
      <SkeletonTaskList />
    </div>
  </PageContainer>
);
