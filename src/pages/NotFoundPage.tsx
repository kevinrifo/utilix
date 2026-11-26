import { Link } from "react-router";
import { Button } from "../components/ui/Button";
import { Icon } from "../components/ui/Icons";

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
        <Icon className="h-7 w-7" name="search" />
      </span>
      <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-brand-600">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Page not found</h1>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">
        The page you are looking for does not exist. Head back to the toolbox to find what you need.
      </p>
      <Link className="mt-6" to="/">
        <Button size="lg">
          <Icon className="h-4 w-4 rotate-180" name="arrow-right" />
          Back to home
        </Button>
      </Link>
    </div>
  );
}
