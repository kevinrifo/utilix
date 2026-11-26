import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { toolCatalog } from "./toolCatalog";
import type { ToolFilter } from "./toolCatalog";

interface ToolsState {
  search: string;
  category: ToolFilter;
}

const initialState: ToolsState = {
  search: "",
  category: "All",
};

const toolsSlice = createSlice({
  name: "tools",
  initialState,
  reducers: {
    searchChanged(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    categoryChanged(state, action: PayloadAction<ToolFilter>) {
      state.category = action.payload;
    },
    filtersReset() {
      return initialState;
    },
  },
});

export const { searchChanged, categoryChanged, filtersReset } = toolsSlice.actions;

export default toolsSlice.reducer;

export const selectToolsState = (state: RootState) => state.tools;

export const selectFilteredTools = createSelector([selectToolsState], ({ search, category }) => {
  const term = search.trim().toLowerCase();

  return toolCatalog.filter((tool) => {
    const matchesCategory = category === "All" || tool.category === category;
    const searchableText = `${tool.name} ${tool.description} ${tool.category}`.toLowerCase();
    const matchesSearch = term.length === 0 || searchableText.includes(term);

    return matchesCategory && matchesSearch;
  });
});
