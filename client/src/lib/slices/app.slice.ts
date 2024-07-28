import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAppSlice {
  currentUser: null | {
    username: string;
    picture: string;
    email: string;
    tasks: number;
  };
  createTaskDrawerVisiblity: boolean;
}

const initialState: IAppSlice = {
  currentUser: null,
  createTaskDrawerVisiblity: false,
};

const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    updateCurrentUser(state, action: PayloadAction<IAppSlice["currentUser"]>) {
      state.currentUser = action.payload;
    },
    updateCreateTaskDrawerVisibility(
      state,
      action: PayloadAction<IAppSlice["createTaskDrawerVisiblity"]>
    ) {
      state.createTaskDrawerVisiblity = action.payload;
    },
  },
});

export const { updateCurrentUser, updateCreateTaskDrawerVisibility } =
  appSlice.actions;
export default appSlice.reducer;
