type Variant = "primary" | "gold" | "muted" | "danger";

const variantClass: Record<Variant, string> = {
  primary: "bg-primary-container text-white hover:bg-[#002d6b]",
  gold: "bg-[#c9a227] text-[#001a43] hover:bg-[#d8b030]",
  muted: "bg-surface-container-high text-on-surface hover:bg-surface-container-highest",
  danger: "bg-rose-500/10 text-rose-500 hover:bg-rose-500/20",
};

interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: Variant;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}

export default function ActionButton({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
  className = "",
}: ActionButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-bold transition focus:outline-none focus:ring-2 focus:ring-[#c9a227]/50 disabled:cursor-not-allowed disabled:opacity-40 ${variantClass[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
