import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  tone: "info" | "success";
}

const initialState: AppNotification[] = [];

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    notificationAdded: {
      reducer(state, action: PayloadAction<AppNotification>) {
        state.push(action.payload);
      },
      prepare(input: Omit<AppNotification, "id">) {
        return { payload: { id: nanoid(), ...input } };
      },
    },
    notificationDismissed(state, action: PayloadAction<string>) {
      return state.filter((notification) => notification.id !== action.payload);
    },
  },
});

export const { notificationAdded, notificationDismissed } = notificationsSlice.actions;

export default notificationsSlice.reducer;

export const selectNotifications = (state: RootState) => state.notifications;
