import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Check } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

const EMOJI_PRESETS = ['🎯', '🌱', '⚡', '🏋️', '💼', '📖', '💡', '🎨', '🚀', '❤️', '💰', '🧘', '🎓', '🏆', '🔥', '🌟'];

const COLOR_PRESETS = [
  { name: 'Blue', hex: '#2563EB', bg: 'bg-blue-600' },
  { name: 'Emerald', hex: '#10B981', bg: 'bg-emerald-500' },
  { name: 'Purple', hex: '#8B5CF6', bg: 'bg-purple-600' },
  { name: 'Amber', hex: '#F59E0B', bg: 'bg-amber-500' },
  { name: 'Rose', hex: '#E11D48', bg: 'bg-rose-600' },
  { name: 'Cyan', hex: '#06B6D4', bg: 'bg-cyan-500' },
  { name: 'Indigo', hex: '#6366F1', bg: 'bg-indigo-600' },
  { name: 'Teal', hex: '#0D9488', bg: 'bg-teal-600' },
];

export const CreateLifeAreaModal = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('🎯');
  const [selectedColor, setSelectedColor] = useState('#2563EB');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onCreate({
      name: name.trim(),
      icon: selectedIcon,
      color: selectedColor,
    });

    setName('');
    setSelectedIcon('🎯');
    setSelectedColor('#2563EB');
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
          className="relative w-full max-w-md bg-white border-t sm:border border-[#E2E8F0] rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden z-10 p-5 sm:p-6 space-y-4 sm:space-y-5 max-h-[88vh] overflow-y-auto"
        >
          {/* Mobile Handle */}
          <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto sm:hidden" />

          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">New Life Area</h3>
                <p className="text-xs text-slate-500">Define a core domain for your goals</p>
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
            {/* Live Preview Card */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Preview</span>
              <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-lg">{selectedIcon}</span>
                <span className="text-sm font-bold text-[#0F172A]">{name || 'Area Name'}</span>
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: selectedColor }}
                />
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Area Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Health & Fitness, Career, Learning"
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
              />
            </div>

            {/* Icon Picker */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Choose Icon
              </label>
              <div className="grid grid-cols-8 gap-1.5">
                {EMOJI_PRESETS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setSelectedIcon(emoji)}
                    className={`h-9 rounded-xl flex items-center justify-center text-base transition-all ${
                      selectedIcon === emoji
                        ? 'bg-blue-100 border-2 border-blue-600 scale-105 shadow-2xs'
                        : 'bg-slate-100 hover:bg-slate-200 border border-slate-200/60'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Swatches */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Accent Color
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {COLOR_PRESETS.map((color) => (
                  <button
                    key={color.hex}
                    type="button"
                    onClick={() => setSelectedColor(color.hex)}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${color.bg} ${
                      selectedColor === color.hex
                        ? 'ring-2 ring-offset-2 ring-slate-700 scale-110 shadow-sm'
                        : 'hover:scale-105 opacity-80 hover:opacity-100'
                    }`}
                  >
                    {selectedColor === color.hex && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <Button type="button" variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={!name.trim()}>
                Create Life Area
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
