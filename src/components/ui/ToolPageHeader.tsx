import { Link } from "react-router";
import { cx } from "../../lib/cx";
import { Badge } from "./Badge";
import type { BadgeTone } from "./Badge";
import { Icon } from "./Icons";
import type { IconName } from "./Icons";

interface ToolPageHeaderProps {
  icon: IconName;
  iconClass: string;
  title: string;
  description: string;
  badgeLabel: string;
  badgeTone: BadgeTone;
}

export function ToolPageHeader({
  icon,
  iconClass,
  title,
  description,
  badgeLabel,
  badgeTone,
}: ToolPageHeaderProps) {
  return (
    <header>
      <Link
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-brand-600"
        to="/"
      >
        <Icon className="h-4 w-4 rotate-180" name="arrow-right" />
        All tools
      </Link>

      <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
        <span className={cx("grid h-14 w-14 shrink-0 place-items-center rounded-2xl ring-1", iconClass)}>
          <Icon className="h-7 w-7" name={icon} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
            <Badge tone={badgeTone}>{badgeLabel}</Badge>
          </div>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-slate-500">{description}</p>
        </div>
      </div>
    </header>
  );
}
