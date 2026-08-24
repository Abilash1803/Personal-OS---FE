import { useState } from 'react';
import { PageContainer } from '../components/ui/PageContainer';
import { useMetrics } from '../hooks/useMetrics';
import { useStreaks } from '../hooks/useStreaks';
import { useAnalytics } from '../hooks/useAnalytics';
import { useInsights } from '../hooks/useInsights';
import { FilterBar } from '../features/analytics/components/FilterBar';
import { MetricCard } from '../features/analytics/components/MetricCard';
import { Heatmap } from '../features/analytics/components/Heatmap';
import { TrendChart } from '../features/analytics/components/TrendChart';
import { TimeDistributionChart } from '../features/analytics/components/TimeDistributionChart';
import { GoalAnalyticsCard } from '../features/analytics/components/GoalAnalyticsCard';
import { LifeAreaAnalyticsCard } from '../features/analytics/components/LifeAreaAnalyticsCard';
import { InsightCard } from '../features/analytics/components/InsightCard';
import { SectionHeader } from '../components/ui/SectionHeader';

import {
  BarChart3,
  CheckCircle2,
  Zap,
  Flame,
  CalendarCheck,
  Target,
  Layers,
  Lightbulb,
} from 'lucide-react';

export const AnalyticsPage = () => {
  const [activeRange, setActiveRange] = useState('This Week');

  const metrics = useMetrics(activeRange);
  const streaks = useStreaks();
  const { heatmapData, goalAnalytics, lifeAreaAnalytics, timeDistribution, completionTrends } = useAnalytics('Daily');
  const { insights } = useInsights();

  return (
    <PageContainer>
      {/* Page Header & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Performance Platform</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
            Productivity Analytics
          </h1>
          <p className="text-sm text-[#64748B] mt-0.5 font-normal">
            Measurable insights, goal progress metrics, and consistency tracking.
          </p>
        </div>

        {/* Date Range Selector */}
        <FilterBar activeRange={activeRange} onSelectRange={setActiveRange} />
      </div>

      {/* TOP: Overview Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Completion Rate"
          value={`${metrics.completionRate}%`}
          subtext={`${metrics.completedTasks} completed • ${metrics.skippedTasks} skipped`}
          icon={CheckCircle2}
          iconBg="bg-emerald-50 text-emerald-600 border-emerald-100"
          trend="Strong"
        />

        <MetricCard
          title="Total Focus Time"
          value={metrics.focusTimeFormatted}
          subtext={`${metrics.totalFocusSessions} completed focus sessions`}
          icon={Zap}
          iconBg="bg-blue-50 text-blue-600 border-blue-100"
          trend="Peak"
        />

        <MetricCard
          title="Daily Streak"
          value={`${streaks.currentDailyStreak} Days`}
          subtext={`Best streak: ${streaks.longestDailyStreak} days`}
          icon={Flame}
          iconBg="bg-amber-50 text-amber-600 border-amber-100"
          trend="Active"
        />

        <MetricCard
          title="Planner Accuracy"
          value={`${metrics.plannerAccuracy}%`}
          subtext={`Avg session: ${metrics.avgSessionMinutes} mins`}
          icon={CalendarCheck}
          iconBg="bg-purple-50 text-purple-600 border-purple-100"
          trend="High"
        />
      </div>

      {/* MIDDLE 1: GitHub-Style 90-Day Heatmap */}
      <Heatmap days={heatmapData} />

      {/* MIDDLE 2: Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8">
          <TrendChart trends={completionTrends} />
        </div>
        <div className="lg:col-span-4">
          <TimeDistributionChart timeDistribution={timeDistribution} />
        </div>
      </div>

      {/* BOTTOM 1: Goal Performance & Life Area Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Goal Analytics Breakdown (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <SectionHeader
            icon={Target}
            title="Goal Performance"
            subtitle="Measurable output by active goal"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {goalAnalytics.map((goal) => (
              <GoalAnalyticsCard key={goal.id} goal={goal} />
            ))}
          </div>
        </div>

        {/* Life Area Breakdown (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <SectionHeader
            icon={Layers}
            title="Life Area Health"
            subtitle="Balance across core life categories"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {lifeAreaAnalytics.map((la) => (
              <LifeAreaAnalyticsCard key={la.id} lifeArea={la} />
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM 2: Rule-Based Insights Engine */}
      <div className="space-y-4">
        <SectionHeader
          icon={Lightbulb}
          iconBg="bg-amber-50 text-amber-600 border-amber-100"
          title="Rule-Based Productivity Insights"
          subtitle="Calculated performance recommendations"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {insights.map((ins) => (
            <InsightCard key={ins.id} insight={ins} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
};
