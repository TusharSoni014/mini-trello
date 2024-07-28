import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slices/app.slice";
import taskSlice from "./slices/task.slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      appSlice,
      taskSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
