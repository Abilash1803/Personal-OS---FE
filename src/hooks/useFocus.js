import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { sessionService } from '../services/sessionService';
import { generatorService } from '../services/generatorService';
import { useToast } from './useToast';


export const useFocus = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addToast } = useToast();

  const taskIdFromQuery = searchParams.get('taskId');
  
  // Resolve task details
  const allResolvedTasks = useMemo(() => generatorService.getResolvedTodayTasks(), []);
  const task = useMemo(() => {
    if (taskIdFromQuery) {
      return allResolvedTasks.find((t) => t.id === taskIdFromQuery) || allResolvedTasks[0] || null;
    }
    const activeSession = sessionService.getActiveSession();
    if (activeSession) {
      return allResolvedTasks.find((t) => t.id === activeSession.dailyTaskId) || allResolvedTasks[0] || null;
    }
    return allResolvedTasks[0] || null;
  }, [taskIdFromQuery, allResolvedTasks]);

  // Session state
  const [session, setSession] = useState(() => {
    if (!task) return null;
    try {
      return sessionService.startSession(task.id);
    } catch {
      return sessionService.getActiveSession();
    }
  });

  const [notes, setNotes] = useState(() => session?.notes || '');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const notesDebounceTimerRef = useRef(null);

  // Sync notes when session changes
  useEffect(() => {
    if (session?.notes !== undefined) {
      setNotes(session.notes);
    }
  }, [session?.id, session?.notes]);

  useEffect(() => {
    return () => {
      if (notesDebounceTimerRef.current) {
        clearTimeout(notesDebounceTimerRef.current);
      }
    };
  }, []);

  // Start / Begin Timer
  const handleStart = useCallback(() => {
    if (!session) return;
    const updated = sessionService.beginTimer(session.id);
    setSession(updated);
    addToast('Focus session started.', 'info');
  }, [session, addToast]);

  // Pause Timer
  const handlePause = useCallback(() => {
    if (!session) return;
    const updated = sessionService.pauseSession(session.id);
    setSession(updated);
    addToast('Session paused.', 'info');
  }, [session, addToast]);

  // Resume Timer
  const handleResume = useCallback(() => {
    if (!session) return;
    const updated = sessionService.resumeSession(session.id);
    setSession(updated);
    addToast('Focus session resumed.', 'info');
  }, [session, addToast]);

  // Complete Session
  const handleComplete = useCallback(() => {
    if (!session) return;
    const completed = sessionService.completeSession(session.id, notes);
    setSession(completed);
    addToast('Task completed! Excellent work.', 'success');
  }, [session, notes, addToast]);

  // Skip Session
  const handleSkip = useCallback(() => {
    if (!session) return;
    const skipped = sessionService.skipSession(session.id);
    setSession(skipped);
    addToast('Focus session skipped.', 'info');
  }, [session, addToast]);

  // Autosave notes
  const handleNotesChange = useCallback((newNotes) => {
    setIsSavingNotes(true);
    setNotes(newNotes);
    if (session?.id) {
      sessionService.updateNotes(session.id, newNotes);
    }

    if (notesDebounceTimerRef.current) {
      clearTimeout(notesDebounceTimerRef.current);
    }

    notesDebounceTimerRef.current = setTimeout(() => {
      setIsSavingNotes(false);
    }, 300);
  }, [session?.id]);

  // Keyboard Shortcuts: Space (Start/Pause), Enter (Complete), Esc (Exit confirmation)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if typing in textareas or inputs
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        if (session?.status === 'NotStarted') handleStart();
        else if (session?.status === 'Running') handlePause();
        else if (session?.status === 'Paused') handleResume();
      } else if (e.code === 'Enter') {
        e.preventDefault();
        if (session?.status === 'Running' || session?.status === 'Paused') {
          handleComplete();
        }
      } else if (e.code === 'Escape') {
        e.preventDefault();
        if (session?.status === 'Running') {
          setShowExitDialog(true);
        } else {
          navigate('/');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [session, handleStart, handlePause, handleResume, handleComplete, navigate]);

  return {
    task,
    session,
    notes,
    isSavingNotes,
    showExitDialog,
    setShowExitDialog,
    handleStart,
    handlePause,
    handleResume,
    handleComplete,
    handleSkip,
    handleNotesChange,
  };
};
