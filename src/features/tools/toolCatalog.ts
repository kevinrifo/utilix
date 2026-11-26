export type ToolId = "pdf-compressor" | "audio-converter" | "video-downloader";

export type ToolCategory = "Documents" | "Audio" | "Video";

export type ToolStatus = "preview" | "coming-soon";

export type ToolIconName = "pdf" | "audio" | "video";

export interface ToolDefinition {
  id: ToolId;
  name: string;
  description: string;
  category: ToolCategory;
  path: string;
  status: ToolStatus;
  icon: ToolIconName;
  iconClass: string;
  gradientClass: string;
}

export const toolCatalog: ToolDefinition[] = [
  {
    id: "pdf-compressor",
    name: "PDF Compressor",
    description: "Shrink PDF files while keeping them readable and easy to share.",
    category: "Documents",
    path: "/tools/pdf-compressor",
    status: "preview",
    icon: "pdf",
    iconClass: "bg-rose-50 text-rose-600 ring-rose-100",
    gradientClass: "from-rose-500 to-orange-500",
  },
  {
    id: "audio-converter",
    name: "Audio Converter",
    description: "Convert audio files between popular formats and bitrates.",
    category: "Audio",
    path: "/tools/audio-converter",
    status: "coming-soon",
    icon: "audio",
    iconClass: "bg-violet-50 text-violet-600 ring-violet-100",
    gradientClass: "from-violet-500 to-fuchsia-500",
  },
  {
    id: "video-downloader",
    name: "Video Downloader",
    description: "Save videos from a link in the quality that suits you best.",
    category: "Video",
    path: "/tools/video-downloader",
    status: "coming-soon",
    icon: "video",
    iconClass: "bg-sky-50 text-sky-600 ring-sky-100",
    gradientClass: "from-sky-500 to-cyan-500",
  },
];

export const toolCategories = ["All", "Documents", "Audio", "Video"] as const;

export type ToolFilter = (typeof toolCategories)[number];
