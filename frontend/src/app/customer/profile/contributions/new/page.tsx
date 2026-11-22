import ContributionForm from '@/components/customer/contribution/contribution-form';

export default function NewContributionPage() {
  return (
    <div className="brand-backdrop relative min-h-screen bg-[#eaf0fb] text-[#001a43]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[460px] bg-cover bg-center opacity-40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#f3f7ff]/60 via-[#eaf0fb]/90 to-[#eaf0fb]"
      />

      <main className="relative mx-auto max-w-[1180px] px-4 py-10 md:px-8">
        <div className="rounded-[32px] border border-white/70 bg-white/55 p-5 shadow-[0_30px_80px_rgba(0,26,67,0.12)] backdrop-blur-xl md:p-8">
          <ContributionForm />
        </div>
      </main>
    </div>
  );
}
