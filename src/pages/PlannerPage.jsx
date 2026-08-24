import { useState, useMemo } from 'react';
import { PageContainer } from '../components/ui/PageContainer';
import { SectionHeader } from '../components/ui/SectionHeader';
import { usePlanner } from '../hooks/usePlanner';
import { useCalendar } from '../hooks/useCalendar';
import { usePlannerNotes } from '../hooks/usePlannerNotes';
import { MiniCalendar } from '../features/planner/components/MiniCalendar';
import { AgendaItem } from '../features/planner/components/AgendaItem';
import { QuickAdd } from '../features/planner/components/QuickAdd';
import { PlannerFilters } from '../features/planner/components/PlannerFilters';
import { UpcomingList } from '../features/planner/components/UpcomingList';
import { DayNotes } from '../features/planner/components/DayNotes';
import { WeekStrip } from '../features/planner/components/WeekStrip';
import { CalendarDays, Calendar as CalendarIcon, ChevronDown, ChevronUp } from 'lucide-react';

export const PlannerPage = () => {
  const {
    selectedDate,
    setSelectedDate,
    monthMatrix,
    monthTitle,
    nextMonth,
    prevMonth,
    selectToday,
  } = useCalendar();
  const [showMonthCalendar, setShowMonthCalendar] = useState(false);

  const {
    content: noteContent,
    isSaving: isSavingNote,
    updateContent: updateNote,
  } = usePlannerNotes(selectedDate);

  const {
    activeFilter,
    setActiveFilter,
    getAgendaForDate,
    getUpcomingEvents,
    createEvent,
    toggleEventCompleted,
    deleteEvent,
  } = usePlanner();

  const agendaItems = getAgendaForDate(selectedDate);
  const upcomingItems = getUpcomingEvents(selectedDate, 7);

  const formattedSelectedDate = useMemo(() => {
    if (!selectedDate) return '';
    const parts = selectedDate.split('-').map(Number);
    if (parts.length < 3) return selectedDate;
    const [y, m, d] = parts;
    return new Date(y, m - 1, d).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }, [selectedDate]);

  return (
    <PageContainer>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-600 mb-1">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Productivity Agenda</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
            Planner
          </h1>
          <p className="text-sm text-[#64748B] mt-0.5 font-normal">
            Organize reminders, client meetings, goal tasks, and daily plans.
          </p>
        </div>

        {/* Mobile Month Calendar Toggle */}
        <button
          type="button"
          onClick={() => setShowMonthCalendar((prev) => !prev)}
          className="md:hidden inline-flex items-center justify-center gap-2 px-3.5 py-2 bg-white border border-[#E2E8F0] rounded-xl text-xs font-bold text-slate-700 shadow-2xs self-start"
        >
          <CalendarIcon className="w-4 h-4 text-purple-600" />
          <span>{showMonthCalendar ? 'Hide Month Matrix' : 'Show Month Matrix'}</span>
          {showMonthCalendar ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Mobile Horizontal Week Strip Date Navigation */}
      <div className="md:hidden">
        <WeekStrip selectedDateStr={selectedDate} onSelectDate={setSelectedDate} />
      </div>

      {/* 2-Panel Master-Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Panel: Mini Calendar Matrix & Upcoming Forecast (4 cols) */}
        <div className={`lg:col-span-4 space-y-6 ${showMonthCalendar ? 'block' : 'hidden md:block'}`}>
          <MiniCalendar
            monthTitle={monthTitle}
            monthMatrix={monthMatrix}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            onPrevMonth={prevMonth}
            onNextMonth={nextMonth}
            onSelectToday={selectToday}
          />
          <UpcomingList upcomingItems={upcomingItems} onSelectDate={setSelectedDate} />
        </div>

        {/* Right Panel: Filters, Agenda List, Quick Add, Day Notes (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Quick Filter Pills */}
          <PlannerFilters
            activeFilter={activeFilter}
            onSelectFilter={setActiveFilter}
          />

          {/* Chronological Agenda Timeline for Selected Date */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-[0_2px_8px_rgba(15,23,42,0.04)] space-y-4">
            <SectionHeader
              icon={CalendarDays}
              iconBg="bg-purple-50 text-purple-600 border-purple-100"
              title={`Agenda for ${formattedSelectedDate}`}
              subtitle={`${agendaItems.length} items scheduled`}
            />

            {agendaItems.length === 0 ? (
              <div className="p-8 text-center bg-slate-50/60 border border-dashed border-slate-200 rounded-xl space-y-1">
                <p className="text-xs font-semibold text-[#0F172A]">No items scheduled for this date</p>
                <p className="text-[11px] text-[#64748B]">Use the Quick Add form below to create a reminder or meeting.</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {agendaItems.map((item) => (
                  <AgendaItem
                    key={item.id}
                    item={item}
                    onToggleCompleted={toggleEventCompleted}
                    onDelete={deleteEvent}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Quick Add Event Form */}
          <QuickAdd selectedDate={selectedDate} onCreateEvent={createEvent} />

          {/* Day Notes */}
          <DayNotes
            dateStr={selectedDate}
            content={noteContent}
            onContentChange={updateNote}
            isSaving={isSavingNote}
          />
        </div>
      </div>
    </PageContainer>
  );
};
