import type { ProfileDetail } from '@/data/customer-account-data';

type PersonalInformationCardProps = {
  details: ProfileDetail[];
};

export default function PersonalInformationCard({ details }: PersonalInformationCardProps) {
  return (
    <section className="mt-8 rounded-[22px] border border-[#dfe4f2] bg-white/80 p-6 shadow-[0_18px_45px_rgba(0,26,67,0.06)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-[1.06rem] font-black text-[#001a43]">Personal Information</h3>
          <p className="mt-1 text-sm text-[#6d7280]">Primary travel identity and contact details used for trip bookings.</p>
        </div>
        <button type="button" className="btn-primary rounded-full px-6 py-2.5 text-sm font-bold shadow-[0_12px_26px_rgba(0,61,155,0.2)]">
          Edit
        </button>
      </div>

      <div className="mt-8 divide-y divide-[#e6ebf4]">
        {details.map((item) => (
          <div key={item.label} className="grid grid-cols-[220px_1fr] items-center gap-4 py-4">
            <div className="text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#6d7280]">{item.label}</div>
            <div className="flex items-center gap-2 text-[1.03rem] font-bold text-[#001a43]">
              {item.flag ? <span className="text-base">{item.flag}</span> : null}
              <span>{item.value}</span>
              {item.tag ? (
                <span className="ml-2 inline-flex items-center rounded-md border border-[#dfe7f7] bg-[#f3f7ff] px-2.5 py-1 text-[0.7rem] font-semibold text-[#003d9b]">
                  {item.tag}
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
