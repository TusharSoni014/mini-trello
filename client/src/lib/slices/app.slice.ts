import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAppSlice {
  currentUser: null | {
    username: string;
    picture: string;
    email: string;
    tasks: number;
  };
}

const initialState: IAppSlice = {
  currentUser: null,
};

const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    updateCurrentUser(state, action: PayloadAction<IAppSlice["currentUser"]>) {
      state.currentUser = action.payload;
    },
  },
});

export const { updateCurrentUser } = appSlice.actions;
export default appSlice.reducer;
