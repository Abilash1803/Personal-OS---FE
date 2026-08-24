import { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { syncService } from '../../../services/syncService';
import { useToast } from '../../../hooks/useToast';
import { Cloud, CloudUpload, CloudDownload, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export const CloudSyncCard = () => {
  const { addToast } = useToast();
  const [status, setStatus] = useState({ loading: true, connected: false, error: null });
  const [isSyncing, setIsSyncing] = useState(false);

  const checkConnection = async () => {
    setStatus((prev) => ({ ...prev, loading: true }));
    const res = await syncService.getCloudStatus();
    setStatus({ loading: false, connected: res.connected, error: res.error });
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const handlePush = async () => {
    setIsSyncing(true);
    try {
      await syncService.pushLocalToCloud();
      addToast('Successfully synced local data to Supabase Cloud!', 'success');
      await checkConnection();
    } catch (err) {
      addToast(`Cloud push error: ${err.message}`, 'error');
    } finally {
      setIsSyncing(false);
    }
  };

  const handlePull = async () => {
    setIsSyncing(true);
    try {
      await syncService.pullCloudToLocal();
      addToast('Successfully pulled remote data from Supabase!', 'success');
      window.location.reload();
    } catch (err) {
      addToast(`Cloud pull error: ${err.message}`, 'error');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <Card hoverEffect={false} className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
            <Cloud className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-[#0F172A]">Supabase Cloud Sync</h2>
            <p className="text-xs text-[#64748B]">
              Sync goals, daily tasks, and reflections with your Supabase database
            </p>
          </div>
        </div>

        {/* Live Status Badge */}
        <div>
          {status.loading ? (
            <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              Connecting...
            </span>
          ) : status.connected ? (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Connected (Project ngqhp)
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
              Offline / Local Only
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100">
        <Button
          variant="primary"
          icon={CloudUpload}
          disabled={!status.connected || isSyncing}
          onClick={handlePush}
          className="text-xs py-2 px-4 font-bold"
        >
          {isSyncing ? 'Syncing...' : 'Push Local Data to Supabase'}
        </Button>

        <Button
          variant="secondary"
          icon={CloudDownload}
          disabled={!status.connected || isSyncing}
          onClick={handlePull}
          className="text-xs py-2 px-4 font-bold"
        >
          Pull Cloud Data to Local
        </Button>

        <button
          type="button"
          onClick={checkConnection}
          className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors ml-auto"
        >
          Check Connection
        </button>
      </div>
    </Card>
  );
};
