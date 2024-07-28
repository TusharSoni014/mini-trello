import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ITaskSlice {
  createForm: {
    status: "todo" | "under-review" | "in-progress" | "done" | "";
  };
}

const initialState: ITaskSlice = {
  createForm: {
    status: "",
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
  },
});

export const { updateStatus } = taskSlice.actions;
export default taskSlice.reducer;
