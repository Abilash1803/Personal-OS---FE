import { useState } from 'react';
import { PageContainer } from '../components/ui/PageContainer';
import { useHistory } from '../hooks/useHistory';
import { useDailySummary } from '../hooks/useDailySummary';
import { useReflection } from '../hooks/useReflection';
import { HistorySearch } from '../features/history/components/HistorySearch';
import { DateNavigator } from '../features/history/components/DateNavigator';
import { HistoryFilters } from '../features/history/components/HistoryFilters';
import { DailySummaryCard } from '../features/history/components/DailySummaryCard';
import { TimelineList } from '../features/history/components/TimelineList';
import { ReflectionEditor } from '../features/history/components/ReflectionEditor';
import { SectionHeader } from '../components/ui/SectionHeader';
import { getTodayISODate } from '../utils/dateUtils';
import { History as HistoryIcon, RotateCcw } from 'lucide-react';

export const HistoryPage = () => {
  const todayStr = getTodayISODate();
  const [selectedDate] = useState(todayStr);

  const {
    groupedTimeline,
    search,
    setSearch,
    dateRange,
    setDateRange,
    eventType,
    setEventType,
    resetFilters,
  } = useHistory();

  const summary = useDailySummary(selectedDate);
  const { content: reflectionContent, isSaving: isSavingReflection, updateContent: updateReflection } = useReflection(selectedDate);

  return (
    <PageContainer>
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
          <HistoryIcon className="w-3.5 h-3.5" />
          <span>Timeline & Journal</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
          Productivity History
        </h1>
        <p className="text-sm text-[#64748B] mt-1 font-normal">
          A chronological story of your achievements, focus sessions, and daily reflections.
        </p>
      </div>

      {/* 2-Panel Master-Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Panel: Search, Date Range, Filters (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Search Box */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-[0_2px_8px_rgba(15,23,42,0.04)] space-y-3">
            <SectionHeader
              icon={HistoryIcon}
              title="Search & Filters"
              subtitle="Filter activity timeline"
              rightAction={
                (search || dateRange !== 'All' || eventType !== 'All') && (
                  <button
                    onClick={resetFilters}
                    className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                    title="Reset all filters"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )
              }
            />

            <HistorySearch search={search} onSearchChange={setSearch} />

            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 block uppercase">Date Range</span>
              <DateNavigator dateRange={dateRange} onSelectDateRange={setDateRange} />
            </div>

            <div className="pt-2 border-t border-slate-100">
              <HistoryFilters eventType={eventType} onSelectEventType={setEventType} />
            </div>
          </div>
        </div>

        {/* Right Panel: Summary Stats, Grouped Timeline, Reflection Journal (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Daily Calculated Summary */}
          <DailySummaryCard summary={summary} />

          {/* Chronological Timeline List */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-[0_2px_8px_rgba(15,23,42,0.04)] space-y-4">
            <SectionHeader
              icon={HistoryIcon}
              title="Activity Journal"
              subtitle="Chronological productivity stream"
            />
            <TimelineList groupedTimeline={groupedTimeline} />
          </div>

          {/* Daily Reflection Journal */}
          <ReflectionEditor
            dateStr={selectedDate}
            content={reflectionContent}
            onContentChange={updateReflection}
            isSaving={isSavingReflection}
          />
        </div>
      </div>
    </PageContainer>
  );
};
