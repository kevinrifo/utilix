import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export type CompressionPreset = "balanced" | "strong" | "maximum";

export interface FileMeta {
  name: string;
  size: number;
}

interface PdfCompressorState {
  files: FileMeta[];
  preset: CompressionPreset;
  outputName: string;
}

export const compressionPresets: Array<{
  id: CompressionPreset;
  label: string;
  description: string;
}> = [
  {
    id: "balanced",
    label: "Balanced",
    description: "Recommended for most documents.",
  },
  {
    id: "strong",
    label: "Strong",
    description: "Smaller files, slightly lower image quality.",
  },
  {
    id: "maximum",
    label: "Maximum",
    description: "Smallest size for storage and email.",
  },
];

const initialState: PdfCompressorState = {
  files: [],
  preset: "balanced",
  outputName: "",
};

const pdfCompressorSlice = createSlice({
  name: "pdfCompressor",
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
    presetChanged(state, action: PayloadAction<CompressionPreset>) {
      state.preset = action.payload;
    },
    outputNameChanged(state, action: PayloadAction<string>) {
      state.outputName = action.payload;
    },
  },
});

export const { filesAdded, fileRemoved, presetChanged, outputNameChanged } =
  pdfCompressorSlice.actions;

export default pdfCompressorSlice.reducer;

export const selectPdfCompressor = (state: RootState) => state.pdfCompressor;
