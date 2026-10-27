import Sidebar from '@/components/provider/common/sidebar';
import SettingsContent from '@/components/customer/settings/settings-content';

export default function ProviderSettingsPage() {
  return (
    <main className="h-screen overflow-hidden bg-[#edf1f5] text-[#001a43]">
      <div className="mx-auto flex h-full max-w-[1600px] gap-0 px-0 py-0">
        <Sidebar />

        <div className="flex-1 overflow-y-auto px-10 py-8 md:px-12 lg:px-16">
          <h1 className="text-4xl font-black tracking-[-0.06em] text-[#001a43]">Settings</h1>
          <p className="mt-3 text-base text-[#48566d]">
            Manage your account preferences, personal details, security, and data privacy.
          </p>

          <SettingsContent />
        </div>
      </div>
    </main>
  );
}
