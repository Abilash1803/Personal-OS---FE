import { useRef } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { useBackup } from '../../../hooks/useBackup';
import { RestorePreviewModal } from '../../../components/backup/RestorePreviewModal';
import { DeleteDialog } from '../../../components/ui/DeleteDialog';
import {
  Database,
  Download,
  Upload,
  Clock,
  Trash2,
  AlertTriangle,
} from 'lucide-react';

export const DataManagementCard = ({ onClearAll }) => {
  const fileInputRef = useRef(null);

  const {
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
  } = useBackup();

  const handleClearConfirm = () => {
    setShowClearConfirmModal(false);
    onClearAll();
  };

  return (
    <>
      <div className="space-y-6 select-none">
        {/* Data & Backup Card */}
        <Card hoverEffect={false} className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#0F172A]">Data & Backup</h2>
                <p className="text-xs text-[#64748B] font-medium">Stored locally on this device</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>
                {lastBackupTime ? `Last Backup: ${lastBackupTime}` : 'Never backed up'}
              </span>
            </div>
          </div>

          {/* Action Rows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Export Backup Row */}
            <button
              type="button"
              onClick={handleExportBackup}
              disabled={isExporting}
              className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-blue-50/60 border border-slate-200/80 hover:border-blue-200 rounded-xl transition-all min-h-[48px] text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <Download className="w-4 h-4 text-blue-600 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-[#0F172A] block">Export Backup</span>
                  <span className="text-[10px] text-slate-500">Download JSON backup file</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                Download →
              </span>
            </button>

            {/* Import Backup Row */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isImporting}
              className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-purple-50/60 border border-slate-200/80 hover:border-purple-200 rounded-xl transition-all min-h-[48px] text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <Upload className="w-4 h-4 text-purple-600 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-[#0F172A] block">Import Backup</span>
                  <span className="text-[10px] text-slate-500">Restore from JSON file</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-purple-600 group-hover:translate-x-0.5 transition-transform">
                Select File →
              </span>
            </button>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              accept=".json,application/json"
              onChange={handleFileSelected}
              className="hidden"
            />
          </div>
        </Card>

        {/* Danger Zone Card */}
        <Card hoverEffect={false} className="p-5 border-rose-200 bg-rose-50/20 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-100 text-rose-600 rounded-xl border border-rose-200">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-rose-900">Danger Zone</h3>
              <p className="text-[11px] text-rose-700 font-medium">Irreversible storage deletion</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <p className="text-xs text-slate-600 font-normal">
              Permanently delete all locally stored PersonalOS goals, tasks, history, and settings.
            </p>
            <Button
              variant="danger"
              size="sm"
              icon={Trash2}
              onClick={() => setShowClearConfirmModal(true)}
              className="shrink-0 min-h-[40px]"
            >
              Clear All Data
            </Button>
          </div>
        </Card>
      </div>

      {/* Restore Preview Modal */}
      <RestorePreviewModal
        isOpen={showPreviewModal}
        metadata={backupMetadata}
        onConfirm={handleConfirmRestore}
        onCancel={handleCancelRestore}
      />

      {/* Clear All Confirmation Dialog with Pre-Clear Backup Option */}
      <DeleteDialog
        isOpen={showClearConfirmModal}
        onClose={() => setShowClearConfirmModal(false)}
        onConfirm={handleClearConfirm}
        title="Clear All Local Data?"
        message="This action will delete all PersonalOS data stored in this browser. Consider exporting a backup first."
      />
    </>
  );
};
