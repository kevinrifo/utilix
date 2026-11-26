import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ComingSoonBanner } from "../components/ui/ComingSoonBanner";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Field } from "../components/ui/Field";
import { Icon } from "../components/ui/Icons";
import { ToolPageHeader } from "../components/ui/ToolPageHeader";
import { notificationAdded } from "../features/notifications/notificationsSlice";
import {
  playlistChanged,
  qualityChanged,
  selectVideoDownloader,
  urlChanged,
  videoQualities,
} from "../features/videoDownloader/videoDownloaderSlice";
import type { VideoQuality } from "../features/videoDownloader/videoDownloaderSlice";
import { cx } from "../lib/cx";

export function VideoDownloaderPage() {
  const dispatch = useAppDispatch();
  const { url, quality, includePlaylist } = useAppSelector(selectVideoDownloader);

  const activeQuality =
    videoQualities.find((item) => item.value === quality) ?? videoQualities[0];
  const hasUrl = url.trim().length > 0;

  const handleDownload = () => {
    if (!hasUrl) {
      dispatch(
        notificationAdded({
          title: "Add a video link first",
          message: "Paste a URL above to preview the download options.",
          tone: "info",
        }),
      );
      return;
    }

    dispatch(
      notificationAdded({
        title: "Download is coming soon",
        message: `${activeQuality.label} quality is selected${includePlaylist ? " with playlist support" : ""}.`,
        tone: "info",
      }),
    );
  };

  return (
    <div className="space-y-8">
      <ToolPageHeader
        badgeLabel="Coming soon"
        badgeTone="amber"
        description="Choose a video link and quality, then prepare the download when the feature goes live."
        icon="video"
        iconClass="bg-sky-50 text-sky-600 ring-sky-100"
        title="Video Downloader"
      />

      <ComingSoonBanner
        title="Downloading is not connected yet"
        description="Set your preferences now. No request is made and nothing is downloaded in this preview."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-sky-50 text-sky-600">
                <Icon className="h-5 w-5" name="link" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900">Video link</h2>
                <p className="text-sm text-slate-500">Paste the URL of the video you want to save.</p>
              </div>
            </div>

            <div className="mt-5">
              <Field htmlFor="video-url" label="Video URL">
                <input
                  className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                  id="video-url"
                  onChange={(event) => dispatch(urlChanged(event.target.value))}
                  placeholder="https://example.com/video"
                  type="url"
                  value={url}
                />
              </Field>
            </div>

            <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl bg-slate-50 p-4">
              <input
                checked={includePlaylist}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                onChange={(event) => dispatch(playlistChanged(event.target.checked))}
                type="checkbox"
              />
              <span>
                <span className="block text-sm font-semibold text-slate-800">Download playlist</span>
                <span className="mt-0.5 block text-xs text-slate-500">
                  Include all videos in the playlist if the link contains one.
                </span>
              </span>
            </label>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-sky-50 text-sky-600">
                <Icon className="h-5 w-5" name="sliders" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900">Quality</h2>
                <p className="text-sm text-slate-500">Pick the best option for your device.</p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {videoQualities.map((item) => {
                const isActive = quality === item.value;
                return (
                  <button
                    className={cx(
                      "rounded-2xl border p-4 text-left transition",
                      isActive
                        ? "border-brand-500 bg-brand-50 ring-2 ring-brand-100"
                        : "border-slate-200 bg-white hover:border-brand-300 hover:bg-brand-50/40",
                    )}
                    key={item.value}
                    onClick={() => dispatch(qualityChanged(item.value as VideoQuality))}
                    type="button"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-slate-900">{item.label}</span>
                      {isActive && <Icon className="h-4 w-4 text-brand-600" name="check" />}
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{item.note}</p>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        <Card className="h-fit p-6 lg:sticky lg:top-24">
          <h2 className="text-base font-bold text-slate-900">Download summary</h2>
          <p className="mt-1 text-sm text-slate-500">Check your settings before continuing.</p>

          <dl className="mt-6 space-y-4 border-t border-slate-100 pt-6 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-slate-500">Link</dt>
              <dd className="max-w-[180px] truncate font-semibold text-slate-900" title={url}>
                {hasUrl ? url : "Not set"}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-slate-500">Quality</dt>
              <dd className="font-semibold text-slate-900">{activeQuality.label}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-slate-500">Playlist</dt>
              <dd className="font-semibold text-slate-900">
                {includePlaylist ? "Included" : "Single video"}
              </dd>
            </div>
          </dl>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <Icon className="h-4 w-4" name="clock" />
              Status
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Downloads will be available once this tool is connected.
            </p>
          </div>

          <Button className="mt-6" fullWidth onClick={handleDownload} size="lg">
            Download video
            <Icon className="h-4 w-4" name="download" />
          </Button>
          <p className="mt-3 text-center text-xs text-slate-400">UI preview · Downloading not enabled yet</p>
        </Card>
      </div>
    </div>
  );
}
