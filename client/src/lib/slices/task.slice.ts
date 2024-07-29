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

export const updateTaskPositionThunk = createAsyncThunk(
  "task/updatePosition",
  async (
    {
      taskId,
      newColumnId,
      newIndex,
    }: { taskId: string; newColumnId: string; newIndex: number },
    { dispatch }
  ) => {
    // try {
    //   await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/task/updatePosition`, {
    //     taskId,
    //     newColumnId,
    //     newIndex
    //   });
    //   // Optionally refetch tasks to ensure sync with backend
    //   dispatch(fetchMyTasksThunk());
    // } catch (error) {
    //   toast('Error updating task position');
    //   throw error;
    // }
    console.log(taskId, newColumnId, newIndex);
  }
);

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
    updateTaskPosition: (
      state,
      action: PayloadAction<{
        taskId: string;
        newColumnId: ITaskSlice["createForm"]["status"];
        newIndex: number;
      }>
    ) => {
      const { taskId, newColumnId, newIndex } = action.payload;
      const allTasks = Object.values(state.myTasks).flat();
      const taskToMove = allTasks.find((t) => t._id === taskId);

      if (taskToMove && newColumnId !== "") {
        // Remove task from its current column
        const oldColumnId = taskToMove.status;
        if (oldColumnId !== "") {
          state.myTasks[oldColumnId] = state.myTasks[oldColumnId].filter(
            (t) => t._id !== taskId
          );
        }

        // Update task status
        taskToMove.status = newColumnId;

        // Insert task at the new position in the correct column
        state.myTasks[newColumnId].splice(newIndex, 0, taskToMove);
      }
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
  updateTaskPosition,
} = taskSlice.actions;
export default taskSlice.reducer;
