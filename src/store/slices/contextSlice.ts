import type { CycleDto } from "@/services/cycle/dtos";
import type { WorkspaceDto } from "@/services/workspace/dtos";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ContextState {
  workspace: WorkspaceDto | null;
  cycle: CycleDto | null;
}

const initialState: ContextState = {
  workspace: null,
  cycle: null,
};

const contextSlice = createSlice({
  name: "context",
  initialState,
  reducers: {
    setCurrentWorkspace: (state, action: PayloadAction<WorkspaceDto | null>) => {
      state.workspace = action.payload;
    },

    setCurrentCycle: (state, action: PayloadAction<CycleDto | null>) => {
      state.cycle = action.payload;
    }
  },
});

export const { setCurrentWorkspace, setCurrentCycle } = contextSlice.actions;
export default contextSlice.reducer;
