import { useState, useEffect, useRef } from 'react';

export const InlineInput = ({
  value,
  onSave,
  className = '',
  placeholder = 'Type to edit...',
  autoFocus = false,
}) => {
  const [text, setText] = useState(value || '');
  const [isEditing, setIsEditing] = useState(autoFocus);
  const inputRef = useRef(null);

  useEffect(() => {
    setText(value || '');
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (text.trim() !== (value || '').trim()) {
      onSave(text.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur();
    } else if (e.key === 'Escape') {
      setText(value || '');
      setIsEditing(false);
    }
  };

  if (!isEditing) {
    return (
      <span
        onClick={() => setIsEditing(true)}
        className={`cursor-pointer hover:bg-slate-100/80 px-1.5 py-0.5 rounded transition-colors ${className}`}
        title="Click to edit inline"
      >
        {text || <span className="text-slate-400 italic">{placeholder}</span>}
      </span>
    );
  }

  return (
    <input
      ref={inputRef}
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      className={`bg-white border border-blue-500 rounded px-2 py-0.5 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${className}`}
    />
  );
};
