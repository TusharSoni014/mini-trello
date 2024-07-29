import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

export interface ITaskSlice {
  createForm: {
    title: string;
    status: "todo" | "under-review" | "in-progress" | "done" | "";
    deadline?: string | undefined;
    description?: string;
    priority?: "low" | "medium" | "urgent" | "";
  };
  myTasks: {
    todo: Array<ITaskSlice["createForm"]>;
    "in-progress": Array<ITaskSlice["createForm"]>;
    "under-review": Array<ITaskSlice["createForm"]>;
    done: Array<ITaskSlice["createForm"]>;
  };
}

export const fetchMyTasksThunk = createAsyncThunk("fetch/myTasks", async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/task/all`
  );
  console.log("All Tasks", response.data);
});

const initialState: ITaskSlice = {
  createForm: {
    status: "",
    title: "",
    deadline: undefined,
    description: "",
    priority: "",
  },
  myTasks: {
    "in-progress": [],
    "under-review": [],
    done: [],
    todo: [],
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
