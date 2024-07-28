import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ITaskSlice {
  createForm: {
    title: string;
    status: "todo" | "under-review" | "in-progress" | "done" | "";
    deadline?: string | undefined;
    description?: string;
    priority?: "low" | "medium" | "urgent" | "";
  };
}

const initialState: ITaskSlice = {
  createForm: {
    status: "",
    title: "",
    deadline: undefined,
    description: "",
    priority: "",
  },
};

const taskSlice = createSlice({
  name: "taskSlice",
  initialState,
  reducers: {
    updateStatus: (
      state,
      action: PayloadAction<ITaskSlice["createForm"]["status"]>
    ) => {
      state.createForm.status = action.payload;
    },
    updateTitle: (
      state,
      action: PayloadAction<ITaskSlice["createForm"]["title"]>
    ) => {
      state.createForm.title = action.payload;
    },
    updateDescription: (
      state,
      action: PayloadAction<ITaskSlice["createForm"]["description"]>
    ) => {
      state.createForm.description = action.payload;
    },
    updatePriority: (
      state,
      action: PayloadAction<ITaskSlice["createForm"]["priority"]>
    ) => {
      state.createForm.priority = action.payload;
    },
    updateDeadline: (
      state,
      action: PayloadAction<ITaskSlice["createForm"]["deadline"]>
    ) => {
      state.createForm.deadline = action.payload;
    },
  },
});

export const {
  updateStatus,
  updateDeadline,
  updateDescription,
  updatePriority,
  updateTitle,
} = taskSlice.actions;
export default taskSlice.reducer;
