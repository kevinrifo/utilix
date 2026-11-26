import type { ReactNode } from "react";
import { Icon } from "./Icons";
import type { IconName } from "./Icons";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: IconName;
}

export function EmptyState({
  title,
  description,
  action,
  icon = "search",
}: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white/60 px-6 py-12 text-center">
      <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-slate-500">
        <Icon name={icon} />
      </span>
      <h3 className="mt-4 text-base font-semibold text-slate-900">{title}</h3>
      <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">{description}</p>
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}
