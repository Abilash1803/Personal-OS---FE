import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

const PRIORITY_OPTIONS = [
  { label: 'High', color: 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100' },
  { label: 'Medium', color: 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100' },
  { label: 'Low', color: 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200' },
];

const DURATION_PRESETS = [15, 30, 45, 60, 90, 120];

const RECURRENCE_OPTIONS = ['Daily', 'Weekdays', 'Weekends', 'Weekly'];

export const CreateTemplateModal = ({ isOpen, onClose, onCreate, goals = [], defaultGoalId = null }) => {
  const [title, setTitle] = useState('');
  const [goalId, setGoalId] = useState('');
  const [estimatedMinutes, setEstimatedMinutes] = useState(30);
  const [priority, setPriority] = useState('Medium');
  const [recurrence, setRecurrence] = useState('Daily');

  if (!isOpen) return null;

  const currentGoalId = goalId || defaultGoalId || goals[0]?.id || '';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !currentGoalId) return;

    onCreate({
      goalId: currentGoalId,
      title: title.trim(),
      estimatedMinutes: Number(estimatedMinutes) || 30,
      priority,
      recurrence,
      active: true,
    });

    setTitle('');
    setGoalId('');
    setEstimatedMinutes(30);
    setPriority('Medium');
    setRecurrence('Daily');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 font-sans select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
          onClick={onClose}
        />

        {/* Modal / Bottom Sheet Window */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-lg bg-white border-t sm:border border-[#E2E8F0] rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden z-10 p-5 sm:p-6 space-y-4 sm:space-y-5 max-h-[88vh] overflow-y-auto"
        >
          {/* Mobile Handle */}
          <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto sm:hidden" />

          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">New Task Template</h3>
                <p className="text-xs text-slate-500">Reusable execution building block</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Template Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Morning Workout, Deep Focus Coding"
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:bg-white transition-all"
              />
            </div>

            {/* Goal Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Linked Strategic Goal
              </label>
              <select
                value={currentGoalId}
                onChange={(e) => setGoalId(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:bg-white transition-all cursor-pointer"
              >
                {goals.map((g) => (
                  <option key={g.id} value={g.id}>
                    🎯 {g.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Estimated Duration Presets */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Estimated Time
                </label>
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {estimatedMinutes} mins
                </span>
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {DURATION_PRESETS.map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setEstimatedMinutes(mins)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      estimatedMinutes === mins
                        ? 'bg-amber-500 text-white border-amber-600 shadow-2xs'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            </div>

            {/* Priority & Recurrence Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Priority */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Priority Level
                </label>
                <div className="flex items-center gap-1.5">
                  {PRIORITY_OPTIONS.map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setPriority(opt.label)}
                      className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                        priority === opt.label
                          ? 'ring-2 ring-slate-800 scale-105 shadow-2xs ' + opt.color
                          : 'bg-slate-50 border-slate-200 text-slate-600 opacity-70 hover:opacity-100'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recurrence */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Recurrence
                </label>
                <select
                  value={recurrence}
                  onChange={(e) => setRecurrence(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs font-semibold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:bg-white transition-all cursor-pointer"
                >
                  {RECURRENCE_OPTIONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <Button type="button" variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={!title.trim() || !currentGoalId}>
                Create Template
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
