import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCommandRegistry } from '../components/command/commandRegistry';

export const useCommandPalette = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands = useMemo(() => getCommandRegistry(navigate), [navigate]);

  // Filter commands by search query
  const filteredCommands = useMemo(() => {
    if (!search.trim()) return commands;
    const q = search.toLowerCase().trim();

    return commands.filter((cmd) => {
      const matchLabel = cmd.label.toLowerCase().includes(q);
      const matchKeywords = cmd.keywords.some((k) => k.toLowerCase().includes(q));
      return matchLabel || matchKeywords;
    });
  }, [commands, search]);

  const openPalette = useCallback(() => {
    setIsOpen(true);
    setSearch('');
    setSelectedIndex(0);
  }, []);

  const closePalette = useCallback(() => {
    setIsOpen(false);
    setSearch('');
    setSelectedIndex(0);
  }, []);

  const executeCommand = useCallback(
    (cmd) => {
      if (!cmd) return;
      closePalette();
      cmd.action();
    },
    [closePalette]
  );

  // Global Ctrl+K / Cmd+K event listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Keyboard navigation inside palette (ArrowUp, ArrowDown, Enter, Escape)
  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : Math.max(0, filteredCommands.length - 1)
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          executeCommand(filteredCommands[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closePalette();
      }
    },
    [isOpen, filteredCommands, selectedIndex, executeCommand, closePalette]
  );

  return {
    isOpen,
    search,
    setSearch,
    selectedIndex,
    setSelectedIndex,
    filteredCommands,
    openPalette,
    closePalette,
    executeCommand,
    handleKeyDown,
  };
};
