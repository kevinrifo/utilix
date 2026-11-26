import { configureStore } from "@reduxjs/toolkit";
import audioConverterReducer from "../features/audioConverter/audioConverterSlice";
import notificationsReducer from "../features/notifications/notificationsSlice";
import pdfCompressorReducer from "../features/pdfCompressor/pdfCompressorSlice";
import toolsReducer from "../features/tools/toolsSlice";
import videoDownloaderReducer from "../features/videoDownloader/videoDownloaderSlice";

export const store = configureStore({
  reducer: {
    tools: toolsReducer,
    pdfCompressor: pdfCompressorReducer,
    audioConverter: audioConverterReducer,
    videoDownloader: videoDownloaderReducer,
    notifications: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
