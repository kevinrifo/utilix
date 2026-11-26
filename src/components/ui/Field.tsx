import type { ReactNode } from "react";
import { cx } from "../../lib/cx";

interface FieldProps {
  label: string;
  htmlFor?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}

export function Field({ label, htmlFor, hint, className, children }: FieldProps) {
  return (
    <div className={cx("space-y-2", className)}>
      <label className="block text-sm font-semibold text-slate-700" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {hint && <p className="text-xs leading-relaxed text-slate-500">{hint}</p>}
    </div>
  );
}
