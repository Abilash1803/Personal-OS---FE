import { Card } from '../../../components/ui/Card';
import { Mail, ShieldCheck } from 'lucide-react';

export const ProfileCard = () => {
  return (
    <Card hoverEffect={false} className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-md">
          A
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#0F172A]">Abilash</h2>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-100">
              <ShieldCheck className="w-3 h-3" /> Local Workspace
            </span>
          </div>
          <p className="text-xs text-[#64748B] flex items-center gap-1 mt-0.5">
            <Mail className="w-3.5 h-3.5" />
            abilash@personalos.local
          </p>
        </div>
      </div>
      <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-600">
        PersonalOS runs 100% client-side. No external servers or auth required.
      </div>
    </Card>
  );
};
