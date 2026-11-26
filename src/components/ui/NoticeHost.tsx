import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { notificationDismissed, selectNotifications } from "../../features/notifications/notificationsSlice";
import { Icon } from "./Icons";

export function NoticeHost() {
  const notifications = useAppSelector(selectNotifications);
  const dispatch = useAppDispatch();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3"
    >
      {notifications.map((notification) => (
        <div
          className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl"
          key={notification.id}
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <Icon className="h-5 w-5" name={notification.tone === "success" ? "check" : "info"} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-900">{notification.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-500">{notification.message}</p>
          </div>
          <button
            aria-label="Dismiss notification"
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            onClick={() => dispatch(notificationDismissed(notification.id))}
            type="button"
          >
            <Icon className="h-4 w-4" name="close" />
          </button>
        </div>
      ))}
    </div>
  );
}
