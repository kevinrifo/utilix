import { Card } from "./Card";
import { Icon } from "./Icons";

interface ComingSoonBannerProps {
  title?: string;
  description?: string;
}

export function ComingSoonBanner({
  title = "This tool is a UI preview",
  description = "The interface is ready, but processing is not connected yet. Your settings are kept locally while you explore.",
}: ComingSoonBannerProps) {
  return (
    <Card className="border-brand-200 bg-brand-50/70 p-4 shadow-none">
      <div className="flex gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-brand-600 shadow-sm ring-1 ring-brand-100">
          <Icon className="h-5 w-5" name="info" />
        </span>
        <div>
          <p className="text-sm font-semibold text-brand-900">{title}</p>
          <p className="mt-1 text-sm leading-relaxed text-brand-800/80">{description}</p>
        </div>
      </div>
    </Card>
  );
}
