import Link from 'next/link';

type ServiceCardProps = {
  title: string;
  description: string;
  accent: string;
  icon: string;
  href: string;
};

export default function ServiceCard({ title, description, accent, icon, href }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full min-h-[240px] max-w-[1000px] flex-col justify-between rounded-[1.75rem] border border-[#dfe8f4] bg-white p-6 text-left shadow-[0_16px_42px_rgba(0,26,67,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_62px_rgba(0,26,67,0.12)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl shadow-[0_12px_24px_rgba(0,26,67,0.12)]"
          style={{ backgroundColor: accent }}
        >
          {icon}
        </div>

      </div>

      <div className="mt-8">
        <h3 className="text-[1.8rem] font-black tracking-[-0.06em] text-[#001a43]">{title}</h3>
        <p className="mt-3 text-base leading-7 text-[#4f5d76]">{description}</p>
      </div>

      <div className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#001a43]">
        <span>+ADD {title.toUpperCase()}</span>
      </div>
    </Link>
  );
}
