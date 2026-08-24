import { NavLink, useLocation } from 'react-router-dom';
import { House, Target, CalendarDays, Timer, Ellipsis } from 'lucide-react';
import { useActiveSession } from '../hooks/useActiveSession';

export const BottomNav = ({ onOpenMore }) => {
  const location = useLocation();
  const { isRunning, isPaused } = useActiveSession();

  const primaryItems = [
    { name: 'Home', path: '/', icon: House },
    { name: 'Goals', path: '/goals', icon: Target },
    { name: 'Planner', path: '/planner', icon: CalendarDays },
    { name: 'Focus', path: '/focus', icon: Timer, isFocus: true },
  ];

  const secondaryPaths = ['/history', '/analytics', '/reviews', '/settings'];
  const isMoreActive = secondaryPaths.some((p) => location.pathname.startsWith(p));

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] md:hidden select-none pb-[env(safe-area-inset-bottom)]"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {primaryItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              aria-current={isActive ? 'page' : undefined}
              className={`flex-1 flex flex-col items-center justify-center h-full min-h-[48px] px-1 transition-all rounded-xl ${
                isActive
                  ? 'text-[#2563EB] font-bold'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Icon className="w-5 h-5" />
                {item.isFocus && (isRunning || isPaused) && (
                  <span
                    className={`absolute -top-0.5 -right-1 w-2 h-2 rounded-full ${
                      isRunning ? 'bg-blue-600 animate-ping' : 'bg-amber-500'
                    }`}
                  />
                )}
              </div>
              <span className="text-[11px] mt-1 tracking-tight truncate">
                {item.name}
              </span>
            </NavLink>
          );
        })}

        {/* More Menu Trigger Button */}
        <button
          type="button"
          onClick={onOpenMore}
          aria-expanded={isMoreActive}
          className={`flex-1 flex flex-col items-center justify-center h-full min-h-[48px] px-1 transition-all rounded-xl ${
            isMoreActive
              ? 'text-[#2563EB] font-bold'
              : 'text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <Ellipsis className="w-5 h-5" />
          <span className="text-[11px] mt-1 tracking-tight truncate">More</span>
        </button>
      </div>
    </nav>
  );
};
