import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Target,
  CalendarDays,
  Zap,
  History,
  BarChart3,
  ClipboardCheck,
  Settings,
  Layers,
  UserCheck,
  X,
} from 'lucide-react';
import { useActiveSession } from '../hooks/useActiveSession';

export const Sidebar = ({ isMobileOpen, onMobileClose }) => {
  const { isRunning, isPaused } = useActiveSession();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard, enabled: true },
    { name: 'Goals', path: '/goals', icon: Target, enabled: true },
    { name: 'Planner', path: '/planner', icon: CalendarDays, enabled: true },
    { name: 'Focus', path: '/focus', icon: Zap, enabled: true, isFocus: true },
    { name: 'History', path: '/history', icon: History, enabled: true },
    { name: 'Analytics', path: '/analytics', icon: BarChart3, enabled: true },
    { name: 'Reviews', path: '/reviews', icon: ClipboardCheck, enabled: true },
    { name: 'Settings', path: '/settings', icon: Settings, enabled: true },
  ];

  const sidebarContent = (
    <aside className="w-[260px] bg-white border-r border-[#E2E8F0] h-screen sticky top-0 flex flex-col justify-between p-5 select-none shrink-0 z-30">
      <div className="flex flex-col gap-6">
        {/* Header & Logo */}
        <div className="flex items-center justify-between px-2 py-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-[#0F172A]">
                Personal<span className="text-[#2563EB]">OS</span>
              </h1>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block -mt-0.5">
                Productivity
              </span>
            </div>
          </div>

          {/* Close button for mobile */}
          {onMobileClose && (
            <button
              onClick={onMobileClose}
              className="md:hidden text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-1">
          <div className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;

            if (!item.enabled) {
              return (
                <div
                  key={item.name}
                  className="relative group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-400 opacity-40 cursor-not-allowed select-none"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </div>
                  <span className="text-[10px] font-mono font-medium bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded">
                    Soon
                  </span>

                  {/* Tooltip on hover */}
                  <div className="absolute left-full ml-2 px-2.5 py-1 bg-slate-900 text-white text-xs font-medium rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap z-50">
                    Coming Soon
                  </div>
                </div>
              );
            }

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onMobileClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-blue-50 text-[#2563EB] border border-blue-100 shadow-xs'
                      : 'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </div>

                {item.isFocus && (isRunning || isPaused) && (
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isRunning ? 'bg-blue-600 animate-ping' : 'bg-amber-500'
                    }`}
                    title={isRunning ? 'Focus timer running' : 'Focus session paused'}
                  />
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Version */}
      <div className="flex flex-col gap-3 pt-4 border-t border-[#E2E8F0]">
        {/* User Card */}
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-xs shrink-0">
            A
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-bold text-[#0F172A] truncate">Abilash</div>
            <div className="text-[10px] text-[#64748B] flex items-center gap-1">
              <UserCheck className="w-3 h-3 text-emerald-500" /> PersonalOS v7
            </div>
          </div>
        </div>

        {/* Version */}
        <div className="flex items-center justify-between px-2 text-[11px] text-slate-400 font-medium">
          <span>PersonalOS v7.0</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500" title="Review Engine Active" />
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block">{sidebarContent}</div>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={onMobileClose}
          />
          <div className="relative flex-1 max-w-xs w-full">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
