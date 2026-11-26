import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { toolCatalog } from "../../features/tools/toolCatalog";
import { cx } from "../../lib/cx";
import { NoticeHost } from "../ui/NoticeHost";
import { Icon } from "../ui/Icons";
import type { IconName } from "../ui/Icons";

interface NavItem {
  label: string;
  path: string;
  icon: IconName;
  end?: boolean;
}

const navItems: NavItem[] = [
  { label: "Home", path: "/", icon: "home", end: true },
  ...toolCatalog.map((tool) => ({
    label: tool.name.replace(" Converter", "").replace(" Compressor", "").replace(" Downloader", ""),
    path: tool.path,
    icon: tool.icon,
  })),
];

function navClass({ isActive }: { isActive: boolean }) {
  return cx(
    "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition",
    isActive
      ? "bg-brand-50 text-brand-700"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  );
}

export function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link className="flex items-center gap-2.5" to="/" onClick={() => setMenuOpen(false)}>
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white shadow-lg shadow-brand-600/25">
              <Icon className="h-5 w-5" name="sparkles" />
            </span>
            <span className="text-xl font-bold tracking-tight">
              Utili<span className="text-brand-600">X</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink className={navClass} end={item.end} key={item.path} to={item.path}>
                <Icon className="h-4 w-4" name={item.icon} />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200 md:flex">
            <Icon className="h-3.5 w-3.5" name="check" />
            Free to use
          </div>

          <button
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-slate-200 bg-white px-4 py-3 md:hidden" aria-label="Mobile navigation">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  className={navClass}
                  end={item.end}
                  key={item.path}
                  onClick={() => setMenuOpen(false)}
                  to={item.path}
                >
                  <Icon className="h-4 w-4" name={item.icon} />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} UtiliX. Simple tools for everyday tasks.
          </p>
          <p className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-brand-600" name="shield" />
            Local-first · No account required
          </p>
        </div>
      </footer>

      <NoticeHost />
    </div>
  );
}
