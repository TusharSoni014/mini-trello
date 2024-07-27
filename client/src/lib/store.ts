import { configureStore } from '@reduxjs/toolkit'
import appSlice from './slices/app.slice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      appSlice
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']