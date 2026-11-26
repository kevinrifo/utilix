import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { FileMeta } from "../pdfCompressor/pdfCompressorSlice";

export type AudioFormat = "mp3" | "wav" | "aac" | "flac" | "ogg";
export type AudioBitrate = "128" | "192" | "256" | "320";
export type SampleRate = "44100" | "48000" | "96000";

interface AudioConverterState {
  files: FileMeta[];
  format: AudioFormat;
  bitrate: AudioBitrate;
  sampleRate: SampleRate;
}

export const audioFormats: Array<{ value: AudioFormat; label: string }> = [
  { value: "mp3", label: "MP3" },
  { value: "wav", label: "WAV" },
  { value: "aac", label: "AAC" },
  { value: "flac", label: "FLAC" },
  { value: "ogg", label: "OGG" },
];

export const audioBitrates: Array<{ value: AudioBitrate; label: string }> = [
  { value: "128", label: "128 kbps" },
  { value: "192", label: "192 kbps" },
  { value: "256", label: "256 kbps" },
  { value: "320", label: "320 kbps" },
];

export const sampleRates: Array<{ value: SampleRate; label: string }> = [
  { value: "44100", label: "44.1 kHz" },
  { value: "48000", label: "48 kHz" },
  { value: "96000", label: "96 kHz" },
];

const initialState: AudioConverterState = {
  files: [],
  format: "mp3",
  bitrate: "192",
  sampleRate: "48000",
};

const audioConverterSlice = createSlice({
  name: "audioConverter",
  initialState,
  reducers: {
    filesAdded(state, action: PayloadAction<FileMeta[]>) {
      for (const file of action.payload) {
        const alreadyAdded = state.files.some(
          (existing) => existing.name === file.name && existing.size === file.size,
        );

        if (!alreadyAdded) {
          state.files.push(file);
        }
      }
    },
    fileRemoved(state, action: PayloadAction<number>) {
      state.files.splice(action.payload, 1);
    },
    formatChanged(state, action: PayloadAction<AudioFormat>) {
      state.format = action.payload;
    },
    bitrateChanged(state, action: PayloadAction<AudioBitrate>) {
      state.bitrate = action.payload;
    },
    sampleRateChanged(state, action: PayloadAction<SampleRate>) {
      state.sampleRate = action.payload;
    },
  },
});

export const {
  filesAdded,
  fileRemoved,
  formatChanged,
  bitrateChanged,
  sampleRateChanged,
} = audioConverterSlice.actions;

export default audioConverterSlice.reducer;

export const selectAudioConverter = (state: RootState) => state.audioConverter;
