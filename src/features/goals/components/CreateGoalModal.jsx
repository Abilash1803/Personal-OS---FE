import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, Calendar } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export const CreateGoalModal = ({ isOpen, onClose, onCreate, lifeAreas = [], defaultLifeAreaId = null }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [lifeAreaId, setLifeAreaId] = useState('');
  const [targetDate, setTargetDate] = useState('');

  if (!isOpen) return null;

  const currentLifeAreaId = lifeAreaId || defaultLifeAreaId || lifeAreas[0]?.id || '';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !currentLifeAreaId) return;

    onCreate({
      lifeAreaId: currentLifeAreaId,
      title: title.trim(),
      description: description.trim(),
      targetDate: targetDate || '',
      isActive: true,
    });

    setTitle('');
    setDescription('');
    setTargetDate('');
    setLifeAreaId('');
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
              <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">New Strategic Goal</h3>
                <p className="text-xs text-slate-500">Define a high-impact objective</p>
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
                Goal Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Master Modern Tech, Complete Marathon"
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition-all"
              />
            </div>

            {/* Life Area Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Life Area Domain
              </label>
              <select
                value={currentLifeAreaId}
                onChange={(e) => setLifeAreaId(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition-all cursor-pointer"
              >
                {lifeAreas.map((la) => (
                  <option key={la.id} value={la.id}>
                    {la.icon} {la.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Description Textarea */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Notes & Scope (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe key outcomes, milestones, or target metrics..."
                rows={3}
                className="w-full p-3 bg-slate-50 border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:bg-white resize-none transition-all"
              />
            </div>

            {/* Target Date Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Target Completion Date (Optional)
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition-all"
                />
                <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <Button type="button" variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={!title.trim() || !currentLifeAreaId}>
                Create Goal
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
