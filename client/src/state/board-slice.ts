import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'
import { WritableDraft } from 'immer/dist/internal'
import { match } from 'ts-pattern'
import { Board, Letter, Playable, Position, Square } from '../types/board'
import { evaluate } from './scoring/evaluate-board'

const update = (
  state: WritableDraft<Board>,
  square: Square) =>
  match(square.position)
    .with({type: 'Bench'}, (b) => state.bench[b.index] = {...square, position: b})
    .with({type: 'Board'}, (b) => state.board[b.y][b.x] = {...square, position: b})
    .exhaustive()

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    board: [[]],
    bench: [],
    selectedPlayBox: undefined,
    score: {
      round: 0,
      total: 0,
      words: []
    }
  } as Board,
  reducers: {
    setBoard: (state, action: PayloadAction<Board>) => {
      return action.payload
    },
    updateBoard: (state: WritableDraft<Board>, action: PayloadAction<Square>) => {
      update(state, action.payload)
    },
    clickSquare: (state, action: PayloadAction<Square>) => {
      if (!state.selectedPlayBox) {
        if (action.payload.type === 'Playable')
          state.selectedPlayBox = action.payload
        return
      }

      if (action.payload.type === 'Playable') {
        // swap face values
        update(state, {...action.payload, faceValue: state.selectedPlayBox.faceValue})
        update(state, {...state.selectedPlayBox, faceValue: action.payload.faceValue})

        evaluate(state)
        state.selectedPlayBox = undefined
        return
      }

      const newSquare = {
        ...state.selectedPlayBox,
        position: action.payload.position,
        previous: action.payload}

      update(state, newSquare)
      update(state, state.selectedPlayBox.previous)
      evaluate(state)
      state.selectedPlayBox = undefined
    }
  },
})

export const { setBoard, updateBoard, clickSquare } = boardSlice.actions
