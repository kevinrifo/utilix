import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ComingSoonBanner } from "../components/ui/ComingSoonBanner";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Dropzone } from "../components/ui/Dropzone";
import { Field } from "../components/ui/Field";
import { Icon } from "../components/ui/Icons";
import { ToolPageHeader } from "../components/ui/ToolPageHeader";
import { notificationAdded } from "../features/notifications/notificationsSlice";
import {
  compressionPresets,
  filesAdded,
  fileRemoved,
  outputNameChanged,
  presetChanged,
  selectPdfCompressor,
} from "../features/pdfCompressor/pdfCompressorSlice";
import { cx } from "../lib/cx";
import { formatBytes, formatCount } from "../lib/format";

export function PdfCompressorPage() {
  const dispatch = useAppDispatch();
  const { files, preset, outputName } = useAppSelector(selectPdfCompressor);

  const totalSize = files.reduce((total, file) => total + file.size, 0);
  const activePreset =
    compressionPresets.find((item) => item.id === preset) ?? compressionPresets[0];
  const suggestedName = files[0]
    ? `${files[0].name.replace(/\.pdf$/i, "")}-compressed.pdf`
    : "compressed.pdf";
  const finalOutputName = outputName.trim() || suggestedName;

  const handleCompress = () => {
    if (files.length === 0) {
      dispatch(
        notificationAdded({
          title: "Add a PDF first",
          message: "Choose one or more PDF files to preview the compression options.",
          tone: "info",
        }),
      );
      return;
    }

    dispatch(
      notificationAdded({
        title: "Compression is coming soon",
        message: `${formatCount(files.length, "file")} and your ${activePreset.label.toLowerCase()} preset are ready for when processing is enabled.`,
        tone: "info",
      }),
    );
  };

  return (
    <div className="space-y-8">
      <ToolPageHeader
        badgeLabel="UI preview"
        badgeTone="brand"
        description="Reduce the size of PDF documents with a simple, predictable set of options."
        icon="pdf"
        iconClass="bg-rose-50 text-rose-600 ring-rose-100"
        title="PDF Compressor"
      />

      <ComingSoonBanner />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <Icon className="h-5 w-5" name="upload" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900">Add PDF files</h2>
                <p className="text-sm text-slate-500">You can add more than one file at a time.</p>
              </div>
            </div>

            <div className="mt-5">
              <Dropzone
                accept=".pdf,application/pdf"
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
                title="Drop your PDFs here"
              />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <Icon className="h-5 w-5" name="sliders" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900">Compression preset</h2>
                <p className="text-sm text-slate-500">Choose how aggressively to reduce file size.</p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {compressionPresets.map((item) => {
                const isActive = preset === item.id;
                return (
                  <button
                    className={cx(
                      "rounded-2xl border p-4 text-left transition",
                      isActive
                        ? "border-brand-500 bg-brand-50 ring-2 ring-brand-100"
                        : "border-slate-200 bg-white hover:border-brand-300 hover:bg-brand-50/40",
                    )}
                    key={item.id}
                    onClick={() => dispatch(presetChanged(item.id))}
                    type="button"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-slate-900">{item.label}</span>
                      {isActive && <Icon className="h-4 w-4 text-brand-600" name="check" />}
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-slate-500">{item.description}</p>
                  </button>
                );
              })}
            </div>

            <Field
              className="mt-6"
              hint="A suggested name is generated from your first file. This can be changed later."
              htmlFor="pdf-output-name"
              label="Output file name"
            >
              <input
                className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                id="pdf-output-name"
                onChange={(event) => dispatch(outputNameChanged(event.target.value))}
                placeholder={suggestedName}
                type="text"
                value={outputName}
              />
            </Field>
          </Card>
        </div>

        <Card className="h-fit p-6 lg:sticky lg:top-24">
          <h2 className="text-base font-bold text-slate-900">Compression summary</h2>
          <p className="mt-1 text-sm text-slate-500">A preview of the options you selected.</p>

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
              <dt className="text-slate-500">Preset</dt>
              <dd className="font-semibold text-slate-900">{activePreset.label}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-slate-500">Output</dt>
              <dd className="max-w-[180px] truncate font-semibold text-slate-900" title={finalOutputName}>
                {finalOutputName}
              </dd>
            </div>
          </dl>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <Icon className="h-4 w-4" name="clock" />
              Estimated result
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Size estimates will appear here once compression is connected.
            </p>
          </div>

          <Button className="mt-6" fullWidth onClick={handleCompress} size="lg">
            Compress PDF
            <Icon className="h-4 w-4" name="arrow-right" />
          </Button>
          <p className="mt-3 text-center text-xs text-slate-400">UI preview · Processing not enabled yet</p>
        </Card>
      </div>
    </div>
  );
}
