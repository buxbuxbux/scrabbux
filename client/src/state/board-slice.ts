import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WritableDraft } from 'immer/dist/internal'
import { act } from 'react-dom/test-utils'
import { BoardState, Move } from '../types/board'

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    board: [[]],
  } as BoardState,
  reducers: {
    setBoard: (state, action: PayloadAction<BoardState>) => {
      return action.payload
    },
    updateBoard: (state: WritableDraft<BoardState>, action: PayloadAction<Move>) => {
      console.log(action)
      state.board[action.payload.xAxis][action.payload.yAxis] = action.payload.letter
    }
  },
})

export const { setBoard, updateBoard } = boardSlice.actions
