import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { BottomNav } from './BottomNav';
import { MobileHeader } from './MobileHeader';
import { MoreBottomSheet } from '../components/mobile/MoreBottomSheet';
import { ToastContainer } from '../components/ui/Toast';
import { ErrorBoundary } from '../components/ui/ErrorBoundary';
import { CommandPalette } from '../components/command/CommandPalette';
import { UpdateBanner } from '../components/pwa/UpdateBanner';
import { IOSInstallSheet } from '../components/pwa/IOSInstallSheet';
import { InstallPromptBanner } from '../components/pwa/InstallPromptBanner';
import { useCommandPalette } from '../hooks/useCommandPalette';
import { usePWA } from '../hooks/usePWA';


export const AppLayout = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const commandPalette = useCommandPalette();
  const pwa = usePWA();

  const isFocusMode = location.pathname === '/focus';

  return (
    <ErrorBoundary>
      <div className="flex min-h-[100dvh] bg-slate-50 font-sans text-[#0F172A] antialiased selection:bg-blue-100 selection:text-blue-900 pt-[env(safe-area-inset-top)]">
        {/* Desktop Sidebar (Hidden on mobile) */}
        <Sidebar
          isMobileOpen={isMobileOpen}
          onMobileClose={() => setIsMobileOpen(false)}
        />

        {/* Main Viewport Container */}
        <div className="flex-1 flex flex-col min-w-0 min-h-[100dvh]">
          {/* Desktop Navbar (≥ 768px) */}
          <Navbar onOpenCommandPalette={commandPalette.openPalette} />

          {/* Compact Mobile Header (< 768px, hidden in Focus mode) */}
          {!isFocusMode && (
            <MobileHeader onOpenCommandPalette={commandPalette.openPalette} />
          )}

          {/* Main Route Content Viewport */}
          <main className={`flex-1 p-4 sm:p-6 lg:p-8 ${!isFocusMode ? 'pb-[calc(84px+env(safe-area-inset-bottom))] md:pb-8' : ''}`}>
            <Outlet />
          </main>
        </div>

        {/* Fixed Mobile Bottom Navigation Bar (< 768px, hidden in Focus mode) */}
        {!isFocusMode && (
          <BottomNav onOpenMore={() => setIsMoreOpen(true)} />
        )}

        {/* Mobile Secondary More Bottom Sheet Modal */}
        <MoreBottomSheet
          isOpen={isMoreOpen}
          onClose={() => setIsMoreOpen(false)}
        />

        {/* PWA Update Banner */}
        <UpdateBanner
          needRefresh={pwa.needRefresh}
          onUpdate={pwa.updateServiceWorker}
          onDismiss={pwa.dismissUpdate}
        />

        {/* Mobile Install App Smart Floating Banner */}
        <InstallPromptBanner
          isInstallable={pwa.isInstallable}
          isStandalone={pwa.isStandalone}
          onInstall={pwa.promptInstall}
        />

        {/* iOS Install Instructions Sheet */}
        <IOSInstallSheet
          isOpen={pwa.showIOSSheet}
          onClose={() => pwa.setShowIOSSheet(false)}
        />

        {/* Global Toast Notification Container */}
        <ToastContainer />

        {/* Global Command Palette Dialog */}
        <CommandPalette
          isOpen={commandPalette.isOpen}
          search={commandPalette.search}
          onSearchChange={commandPalette.setSearch}
          filteredCommands={commandPalette.filteredCommands}
          selectedIndex={commandPalette.selectedIndex}
          onSelectIndex={commandPalette.setSelectedIndex}
          onClose={commandPalette.closePalette}
          onExecute={commandPalette.executeCommand}
          onKeyDown={commandPalette.handleKeyDown}
        />
      </div>
    </ErrorBoundary>
  );
};
