import { useRef, useState } from "react";
import type { DragEvent } from "react";
import { cx } from "../../lib/cx";
import { formatBytes } from "../../lib/format";
import type { FileMeta } from "../../features/pdfCompressor/pdfCompressorSlice";
import { Icon } from "./Icons";

interface DropzoneProps {
  accept: string;
  files: FileMeta[];
  onFilesSelected: (files: File[]) => void;
  onRemoveFile: (index: number) => void;
  title?: string;
  description?: string;
  multiple?: boolean;
}

export function Dropzone({
  accept,
  files,
  onFilesSelected,
  onRemoveFile,
  title = "Drop files here",
  description = "or click to browse from your device",
  multiple = true,
}: DropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(event.dataTransfer.files);
    if (droppedFiles.length === 0) {
      return;
    }
    onFilesSelected(multiple ? droppedFiles : droppedFiles.slice(0, 1));
  };

  return (
    <div>
      <button
        className={cx(
          "flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition",
          isDragging
            ? "border-brand-500 bg-brand-50"
            : "border-slate-300 bg-slate-50/70 hover:border-brand-400 hover:bg-brand-50/40",
        )}
        onClick={() => inputRef.current?.click()}
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setIsDragging(false);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
        type="button"
      >
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-brand-600 shadow-sm ring-1 ring-slate-200">
          <Icon name="upload" />
        </span>
        <span className="mt-4 text-sm font-semibold text-slate-900">{title}</span>
        <span className="mt-1 text-sm text-slate-500">{description}</span>
        <span className="mt-4 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-200">
          {accept.replaceAll(",", " · ")}
        </span>
      </button>

      <input
        accept={accept}
        className="hidden"
        multiple={multiple}
        onChange={(event) => {
          const selectedFiles = Array.from(event.target.files ?? []);
          if (selectedFiles.length > 0) {
            onFilesSelected(multiple ? selectedFiles : selectedFiles.slice(0, 1));
          }
          event.target.value = "";
        }}
        ref={inputRef}
        type="file"
      />

      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map((file, index) => (
            <li
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
              key={`${file.name}-${file.size}-${index}`}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
                <Icon className="h-4 w-4" name="file" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-800">{file.name}</p>
                <p className="text-xs text-slate-500">{formatBytes(file.size)}</p>
              </div>
              <button
                aria-label={`Remove ${file.name}`}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                onClick={() => onRemoveFile(index)}
                type="button"
              >
                <Icon className="h-4 w-4" name="trash" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
