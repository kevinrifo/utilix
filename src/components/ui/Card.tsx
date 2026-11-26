import type { HTMLAttributes } from "react";
import { cx } from "../../lib/cx";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export function Card({ className, interactive = false, children, ...props }: CardProps) {
  return (
    <div
      className={cx(
        "rounded-3xl border border-slate-200 bg-white shadow-sm",
        interactive && "transition duration-200 hover:-translate-y-0.5 hover:shadow-lg",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
