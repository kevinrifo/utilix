import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ComingSoonBanner } from "../components/ui/ComingSoonBanner";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Dropzone } from "../components/ui/Dropzone";
import { Field } from "../components/ui/Field";
import { Icon } from "../components/ui/Icons";
import { Select } from "../components/ui/Select";
import { ToolPageHeader } from "../components/ui/ToolPageHeader";
import {
  audioBitrates,
  audioFormats,
  bitrateChanged,
  filesAdded,
  fileRemoved,
  formatChanged,
  sampleRateChanged,
  sampleRates,
  selectAudioConverter,
} from "../features/audioConverter/audioConverterSlice";
import type { AudioBitrate, AudioFormat, SampleRate } from "../features/audioConverter/audioConverterSlice";
import { notificationAdded } from "../features/notifications/notificationsSlice";
import { formatBytes, formatCount } from "../lib/format";

export function AudioConverterPage() {
  const dispatch = useAppDispatch();
  const { files, format, bitrate, sampleRate } = useAppSelector(selectAudioConverter);

  const totalSize = files.reduce((total, file) => total + file.size, 0);
  const formatLabel =
    audioFormats.find((item) => item.value === format)?.label ?? format.toUpperCase();

  const handleConvert = () => {
    if (files.length === 0) {
      dispatch(
        notificationAdded({
          title: "Add audio first",
          message: "Choose one or more audio files to preview the conversion options.",
          tone: "info",
        }),
      );
      return;
    }

    dispatch(
      notificationAdded({
        title: "Conversion is coming soon",
        message: `${formatCount(files.length, "file")} queued for ${formatLabel} output at ${bitrate} kbps.`,
        tone: "info",
      }),
    );
  };

  return (
    <div className="space-y-8">
      <ToolPageHeader
        badgeLabel="Coming soon"
        badgeTone="amber"
        description="Prepare audio files for conversion with clear format, bitrate, and sample-rate options."
        icon="audio"
        iconClass="bg-violet-50 text-violet-600 ring-violet-100"
        title="Audio Converter"
      />

      <ComingSoonBanner
        title="Conversion is not connected yet"
        description="Explore the interface and adjust your settings now. Processing will be enabled in a later step."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet-50 text-violet-600">
                <Icon className="h-5 w-5" name="upload" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900">Add audio files</h2>
                <p className="text-sm text-slate-500">MP3, WAV, AAC, FLAC, OGG, and more.</p>
              </div>
            </div>

            <div className="mt-5">
              <Dropzone
                accept=".mp3,.wav,.aac,.flac,.ogg,.m4a,audio/*"
                description="or click to browse your device"
                files={files}
                onFilesSelected={(selectedFiles) =>
                  dispatch(
                    filesAdded(
                      selectedFiles.map((file) => ({ name: file.name, size: file.size })),
                    ),
                  )
                }
                onRemoveFile={(index) => dispatch(fileRemoved(index))}
                title="Drop your audio here"
              />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet-50 text-violet-600">
                <Icon className="h-5 w-5" name="sliders" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900">Output settings</h2>
                <p className="text-sm text-slate-500">Sensible defaults are already selected.</p>
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field htmlFor="audio-format" label="Output format">
                <Select
                  id="audio-format"
                  onChange={(event) => dispatch(formatChanged(event.target.value as AudioFormat))}
                  options={audioFormats}
                  value={format}
                />
              </Field>

              <Field htmlFor="audio-bitrate" label="Bitrate">
                <Select
                  id="audio-bitrate"
                  onChange={(event) => dispatch(bitrateChanged(event.target.value as AudioBitrate))}
                  options={audioBitrates}
                  value={bitrate}
                />
              </Field>

              <Field className="sm:col-span-2" htmlFor="audio-sample-rate" label="Sample rate">
                <Select
                  id="audio-sample-rate"
                  onChange={(event) => dispatch(sampleRateChanged(event.target.value as SampleRate))}
                  options={sampleRates}
                  value={sampleRate}
                />
              </Field>
            </div>
          </Card>
        </div>

        <Card className="h-fit p-6 lg:sticky lg:top-24">
          <h2 className="text-base font-bold text-slate-900">Conversion summary</h2>
          <p className="mt-1 text-sm text-slate-500">Review your selected output settings.</p>

          <dl className="mt-6 space-y-4 border-t border-slate-100 pt-6 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-slate-500">Files</dt>
              <dd className="font-semibold text-slate-900">{formatCount(files.length, "file")}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-slate-500">Original size</dt>
              <dd className="font-semibold text-slate-900">{formatBytes(totalSize)}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-slate-500">Format</dt>
              <dd className="font-semibold text-slate-900">{formatLabel}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-slate-500">Bitrate</dt>
              <dd className="font-semibold text-slate-900">{bitrate} kbps</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-slate-500">Sample rate</dt>
              <dd className="font-semibold text-slate-900">
                {(Number(sampleRate) / 1000).toFixed(1)} kHz
              </dd>
            </div>
          </dl>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <Icon className="h-4 w-4" name="clock" />
              Status
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Conversion will run locally once this feature is enabled.
            </p>
          </div>

          <Button className="mt-6" fullWidth onClick={handleConvert} size="lg">
            Convert audio
            <Icon className="h-4 w-4" name="arrow-right" />
          </Button>
          <p className="mt-3 text-center text-xs text-slate-400">UI preview · Processing not enabled yet</p>
        </Card>
      </div>
    </div>
  );
}
