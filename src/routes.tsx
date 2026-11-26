import { createBrowserRouter } from "react-router";
import { AppShell } from "./components/layout/AppShell";
import { AudioConverterPage } from "./pages/AudioConverterPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PdfCompressorPage } from "./pages/PdfCompressorPage";
import { VideoDownloaderPage } from "./pages/VideoDownloaderPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "tools/pdf-compressor", element: <PdfCompressorPage /> },
      { path: "tools/audio-converter", element: <AudioConverterPage /> },
      { path: "tools/video-downloader", element: <VideoDownloaderPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
