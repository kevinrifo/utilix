import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ToolCard } from "../components/tools/ToolCard";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { Icon } from "../components/ui/Icons";
import type { IconName } from "../components/ui/Icons";
import { toolCategories } from "../features/tools/toolCatalog";
import {
  categoryChanged,
  filtersReset,
  searchChanged,
  selectFilteredTools,
  selectToolsState,
} from "../features/tools/toolsSlice";
import { cx } from "../lib/cx";

const highlights: Array<{ icon: IconName; title: string; description: string }> = [
  {
    icon: "zap",
    title: "Fast by default",
    description: "Tools that stay in your browser and get out of your way.",
  },
  {
    icon: "shield",
    title: "Private by design",
    description: "Your files stay on your device. Nothing is uploaded.",
  },
  {
    icon: "sliders",
    title: "Simple controls",
    description: "Clear options with sensible defaults for every task.",
  },
];

export function HomePage() {
  const dispatch = useAppDispatch();
  const tools = useAppSelector(selectFilteredTools);
  const { search, category } = useAppSelector(selectToolsState);

  return (
    <div>
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-600 via-indigo-600 to-violet-700 px-6 py-12 text-white shadow-xl shadow-brand-900/10 sm:px-10 sm:py-16">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-inset ring-white/20">
              <Icon className="h-4 w-4" name="sparkles" />
              More tools on the way
            </span>
            <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Everyday file tasks, made simple.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-indigo-100 sm:text-lg">
              Compress documents, convert audio, save videos, and more — from one clean, fast place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-brand-700 shadow-lg shadow-indigo-900/20 transition hover:bg-indigo-50"
                to="/tools/pdf-compressor"
              >
                Try PDF Compressor
                <Icon className="h-4 w-4" name="arrow-right" />
              </Link>
              <a
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/30 px-6 text-sm font-bold text-white transition hover:bg-white/10"
                href="#explore-tools"
              >
                Explore all tools
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
            <p className="text-sm font-semibold text-indigo-100">Why UtiliX?</p>
            <ul className="mt-5 space-y-5">
              {highlights.map((highlight) => (
                <li className="flex gap-3" key={highlight.title}>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/15 text-white">
                    <Icon className="h-4 w-4" name={highlight.icon} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{highlight.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-indigo-100/80">
                      {highlight.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-12" id="explore-tools">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Toolbox</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Explore tools
            </h2>
            <p className="mt-2 text-sm text-slate-500">Pick a tool to see its interface.</p>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <Icon className="h-4 w-4" name="search" />
            </span>
            <input
              aria-label="Search tools"
              className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              onChange={(event) => dispatch(searchChanged(event.target.value))}
              placeholder="Search tools..."
              type="search"
              value={search}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter tools by category">
          {toolCategories.map((item) => (
            <button
              className={cx(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                category === item
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100",
              )}
              key={item}
              onClick={() => dispatch(categoryChanged(item))}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>

        {tools.length > 0 ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="mt-6">
            <EmptyState
              action={
                <Button onClick={() => dispatch(filtersReset())} variant="outline">
                  Reset filters
                </Button>
              }
              description="Try a different search term or category to find what you need."
              title="No tools found"
            />
          </div>
        )}
      </section>
    </div>
  );
}
