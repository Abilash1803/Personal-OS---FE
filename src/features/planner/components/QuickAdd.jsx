import { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Plus, X } from 'lucide-react';

export const QuickAdd = ({ selectedDate, onAddEvent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState('Meeting');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddEvent({
      title: title.trim(),
      date: selectedDate,
      time: time || '',
      type,
      description: description.trim(),
    });

    setTitle('');
    setTime('');
    setType('Meeting');
    setDescription('');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        icon={Plus}
        onClick={() => setIsOpen(true)}
        className="w-full justify-center py-2.5 text-xs font-semibold"
      >
        Quick Add Event
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-slate-50 border border-blue-200 rounded-2xl space-y-3 shadow-xs">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600">New Planner Event</h4>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="text-slate-400 hover:text-slate-700"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Event title (e.g. Client Call, Birthday)..."
        autoFocus
        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      />

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[10px] font-semibold text-slate-500 block mb-0.5">Time (optional)</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-2.5 py-1 text-xs bg-white border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="text-[10px] font-semibold text-slate-500 block mb-0.5">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-2 py-1 text-xs bg-white border border-slate-200 rounded-xl"
          >
            <option value="Meeting">Meeting</option>
            <option value="Task">Task</option>
            <option value="Reminder">Reminder</option>
            <option value="Payment">Payment</option>
            <option value="Birthday">Birthday</option>
            <option value="Personal">Personal</option>
            <option value="Custom">Custom</option>
          </select>
        </div>
      </div>

      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description / Notes (optional)..."
        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      />

      <div className="flex justify-end gap-2 pt-1">
        <Button variant="ghost" size="sm" type="button" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button variant="primary" size="sm" type="submit">
          Save Event
        </Button>
      </div>
    </form>
  );
};
