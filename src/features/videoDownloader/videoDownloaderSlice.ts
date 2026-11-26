import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export type VideoQuality = "best" | "1080p" | "720p" | "480p" | "audio";

interface VideoDownloaderState {
  url: string;
  quality: VideoQuality;
  includePlaylist: boolean;
}

export const videoQualities: Array<{ value: VideoQuality; label: string; note: string }> = [
  { value: "best", label: "Best", note: "Highest available" },
  { value: "1080p", label: "1080p", note: "Full HD" },
  { value: "720p", label: "720p", note: "HD" },
  { value: "480p", label: "480p", note: "Standard" },
  { value: "audio", label: "Audio", note: "Sound only" },
];

const initialState: VideoDownloaderState = {
  url: "",
  quality: "best",
  includePlaylist: false,
};

const videoDownloaderSlice = createSlice({
  name: "videoDownloader",
  initialState,
  reducers: {
    urlChanged(state, action: PayloadAction<string>) {
      state.url = action.payload;
    },
    qualityChanged(state, action: PayloadAction<VideoQuality>) {
      state.quality = action.payload;
    },
    playlistChanged(state, action: PayloadAction<boolean>) {
      state.includePlaylist = action.payload;
    },
  },
});

export const { urlChanged, qualityChanged, playlistChanged } = videoDownloaderSlice.actions;

export default videoDownloaderSlice.reducer;

export const selectVideoDownloader = (state: RootState) => state.videoDownloader;
