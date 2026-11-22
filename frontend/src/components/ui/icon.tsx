import React from "react";

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 24, className = "", ...props }: IconProps) {
  return (
    <span
      className={`material-symbols-outlined select-none inline-flex items-center justify-center ${className}`}
      style={{ fontSize: `${size}px`, width: `${size}px`, height: `${size}px` }}
      aria-hidden="true"
      {...props}
    >
      {name}
    </span>
  );
}

export default Icon;
