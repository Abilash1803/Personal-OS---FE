import { useState, useCallback } from 'react';
import { backupService } from '../services/backupService';
import { useToast } from './useToast';

export const useBackup = () => {
  const { addToast } = useToast();
  const [lastBackupTime, setLastBackupTime] = useState(() => backupService.getLastBackupTimestamp());
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  // Preview Modal state
  const [pendingBackup, setPendingBackup] = useState(null);
  const [backupMetadata, setBackupMetadata] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Clear data pre-export confirmation modal state
  const [showClearConfirmModal, setShowClearConfirmModal] = useState(false);

  // Handle Export Backup
  const handleExportBackup = useCallback(() => {
    setIsExporting(true);
    try {
      backupService.createBackup();
      const newTimestamp = backupService.getLastBackupTimestamp();
      setLastBackupTime(newTimestamp);
      addToast('Backup created successfully.', 'success');
    } catch (err) {
      addToast(err.message || 'Failed to export backup file.', 'error');
    } finally {
      setIsExporting(false);
    }
  }, [addToast]);

  // Handle File Selection (Import)
  const handleFileSelected = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsImporting(true);

      const reader = new FileReader();
      reader.onload = (event) => {
        setIsImporting(false);
        try {
          const content = event.target?.result;
          if (typeof content !== 'string') {
            throw new Error("This doesn't appear to be a valid PersonalOS backup.");
          }

          const parsedObj = JSON.parse(content);
          const validation = backupService.validateBackup(parsedObj);

          if (!validation.isValid) {
            addToast(validation.error, 'error');
            return;
          }

          const metadata = backupService.getBackupMetadata(parsedObj);
          setPendingBackup(parsedObj);
          setBackupMetadata(metadata);
          setShowPreviewModal(true);
        } catch {
          addToast("This doesn't appear to be a valid PersonalOS backup.", 'error');
        }
      };

      reader.onerror = () => {
        setIsImporting(false);
        addToast('Error reading the selected backup file.', 'error');
      };

      reader.readAsText(file);
      e.target.value = '';
    },
    [addToast]
  );

  // Confirm Restore
  const handleConfirmRestore = useCallback(() => {
    if (!pendingBackup) return;

    try {
      backupService.restoreBackup(pendingBackup);
      addToast('Backup restored successfully. Reloading application...', 'success');
      setShowPreviewModal(false);
      setPendingBackup(null);

      // Clean reload to update all reactive hooks & state
      setTimeout(() => {
        window.location.reload();
      }, 600);
    } catch (err) {
      addToast(err.message || 'Failed to restore backup.', 'error');
    }
  }, [pendingBackup, addToast]);

  const handleCancelRestore = useCallback(() => {
    setShowPreviewModal(false);
    setPendingBackup(null);
    setBackupMetadata(null);
  }, []);

  return {
    lastBackupTime,
    isExporting,
    isImporting,
    showPreviewModal,
    backupMetadata,
    showClearConfirmModal,
    setShowClearConfirmModal,
    handleExportBackup,
    handleFileSelected,
    handleConfirmRestore,
    handleCancelRestore,
  };
};
