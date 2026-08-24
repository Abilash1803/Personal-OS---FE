import { PageContainer } from '../components/ui/PageContainer';
import { usePersonalOSStorage } from '../hooks/usePersonalOSStorage';
import { ProfileCard } from '../features/settings/components/ProfileCard';
import { AppVersionCard } from '../features/settings/components/AppVersionCard';
import { CloudSyncCard } from '../features/settings/components/CloudSyncCard';
import { DataManagementCard } from '../features/settings/components/DataManagementCard';
import { ThemeCard } from '../features/settings/components/ThemeCard';
import { FutureFeaturesCard } from '../features/settings/components/FutureFeaturesCard';
import { Settings as SettingsIcon } from 'lucide-react';

export const SettingsPage = () => {
  const { resetTodayData, clearAllData } = usePersonalOSStorage();

  return (
    <PageContainer className="max-w-4xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
          <SettingsIcon className="w-3.5 h-3.5" />
          <span>System Preferences</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
          Settings
        </h1>
        <p className="text-sm text-[#64748B] mt-1 font-normal">
          Manage local storage data, system preferences, and view application status.
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        <ProfileCard />
        <CloudSyncCard />
        <AppVersionCard />
        <DataManagementCard
          onResetToday={resetTodayData}
          onClearAll={clearAllData}
        />
        <ThemeCard />
        <FutureFeaturesCard />
      </div>
    </PageContainer>
  );
};
