import { configureStore } from '@reduxjs/toolkit'
import { boardSlice } from './board-slice'

export const store = configureStore({
  reducer: {
    boardSlice: boardSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
