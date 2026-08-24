import { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { usePWA } from '../../../hooks/usePWA';
import { requestPersistentStorage } from '../../../utils/pwaUtils';
import { Cpu, Download, CheckCircle, Smartphone, ShieldCheck } from 'lucide-react';

export const AppVersionCard = () => {
  const { isStandalone, isInstallable, promptInstall } = usePWA();
  const [persistentStatus, setPersistentStatus] = useState('Checking...');

  useEffect(() => {
    requestPersistentStorage().then((res) => {
      if (res.persisted) {
        setPersistentStatus('Persistent Storage Enabled');
      } else {
        setPersistentStatus('Local Device Storage');
      }
    });
  }, []);

  return (
    <Card hoverEffect={false} className="p-5 space-y-4 select-none">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0F172A]">Application & Status</h3>
            <p className="text-xs text-[#64748B] font-medium">PersonalOS v1.0</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>{isStandalone ? 'Installed App' : 'Browser Mode'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {/* Storage Persistence Status */}
        <div className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <div>
            <span className="text-xs font-bold text-[#0F172A] block">Storage Status</span>
            <span className="text-[10px] text-slate-500 font-medium">{persistentStatus}</span>
          </div>
        </div>

        {/* Install PersonalOS Row */}
        {!isStandalone && isInstallable ? (
          <Button
            variant="primary"
            icon={Download}
            onClick={promptInstall}
            className="w-full justify-center py-3 text-xs font-bold shadow-xs min-h-[48px]"
          >
            Install PersonalOS
          </Button>
        ) : (
          <div className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
            <Smartphone className="w-4 h-4 text-blue-600 shrink-0" />
            <div>
              <span className="text-xs font-bold text-[#0F172A] block">Display Mode</span>
              <span className="text-[10px] text-slate-500 font-medium">
                {isStandalone ? 'Standalone Mobile App' : 'Web Browser'}
              </span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
