import { useState, useEffect } from 'react';
import { storageService } from '../../../services/storageService';
import { backupService } from '../../../services/backupService';
import { ShieldCheck, Download, X } from 'lucide-react';

export const BackupNotice = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const lastBackup = storageService.getItem('LAST_BACKUP_AT');
    const dismissed = sessionStorage.getItem('personal_os_backup_notice_dismissed');

    if (!lastBackup && !dismissed) {
      const goals = storageService.getCollection('GOALS');
      if (goals.length > 0) {
        setIsVisible(true);
      }
    }
  }, []);

  if (!isVisible) return null;

  const handleBackupNow = () => {
    backupService.createBackup();
    setIsVisible(false);
  };

  const handleDismiss = () => {
    sessionStorage.setItem('personal_os_backup_notice_dismissed', 'true');
    setIsVisible(false);
  };

  return (
    <div className="flex items-center justify-between gap-3 p-3 bg-blue-50/80 border border-blue-200/80 rounded-2xl text-xs text-blue-900 font-medium select-none shadow-2xs">
      <div className="flex items-center gap-2.5">
        <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
        <span>Protect your PersonalOS data by creating a backup.</span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={handleBackupNow}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-[11px] rounded-xl transition-all shadow-xs"
        >
          <Download className="w-3 h-3" />
          <span>Backup Now</span>
        </button>

        <button
          type="button"
          onClick={handleDismiss}
          className="p-1 text-blue-400 hover:text-blue-700 rounded-lg"
          title="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
