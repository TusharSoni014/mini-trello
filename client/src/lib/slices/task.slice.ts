import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";
axios.defaults.withCredentials = true;

export interface ITaskSlice {
  createForm: {
    _id?: string;
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
  tasksLoading: boolean;
}

export const fetchMyTasksThunk = createAsyncThunk<
  Array<ITaskSlice["createForm"]>
>("fetch/myTasks", async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/task/all`
  );
  return response.data;
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
  tasksLoading: false,
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
  extraReducers: (builder) => {
    builder.addCase(fetchMyTasksThunk.pending, (state) => {
      state.tasksLoading = true;
    });
    builder.addCase(fetchMyTasksThunk.fulfilled, (state, action) => {
      const tasks = action.payload;
      state.myTasks = {
        todo: tasks.filter((task) => task.status === "todo"),
        "in-progress": tasks.filter((task) => task.status === "in-progress"),
        "under-review": tasks.filter((task) => task.status === "under-review"),
        done: tasks.filter((task) => task.status === "done"),
      };
      state.tasksLoading = false;
    });
    builder.addCase(fetchMyTasksThunk.rejected, (state) => {
      state.tasksLoading = false;
      toast("Some error occured while loading tasks!");
    });
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
