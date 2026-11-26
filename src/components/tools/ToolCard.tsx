import { Link } from "react-router";
import type { ToolDefinition } from "../../features/tools/toolCatalog";
import { cx } from "../../lib/cx";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { Icon } from "../ui/Icons";

interface ToolCardProps {
  tool: ToolDefinition;
}

export function ToolCard({ tool }: ToolCardProps) {
  const isPreview = tool.status === "preview";

  return (
    <Link className="block h-full" to={tool.path}>
      <Card className="group relative flex h-full flex-col overflow-hidden p-6" interactive>
        <span className={cx("absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r", tool.gradientClass)} />

        <div className="flex items-start justify-between gap-3">
          <span className={cx("grid h-12 w-12 place-items-center rounded-2xl ring-1", tool.iconClass)}>
            <Icon className="h-6 w-6" name={tool.icon} />
          </span>
          <Badge tone={isPreview ? "brand" : "amber"}>
            {isPreview ? "UI preview" : "Coming soon"}
          </Badge>
        </div>

        <div className="mt-5 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {tool.category}
          </p>
          <h3 className="mt-1 text-lg font-bold text-slate-900">{tool.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">{tool.description}</p>
        </div>

        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
          Open tool
          <Icon
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            name="arrow-right"
          />
        </div>
      </Card>
    </Link>
  );
}
