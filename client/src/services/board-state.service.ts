import { useEffect } from 'react'
import { setBoard } from '../state/board-slice'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import { useRealTimeUpdates } from '../state/realtime-updater'
import { Board, Letter, Square } from '../types/board'

export const useBoardState = () => {
  const dispatch = useAppDispatch()
  const boardState = useAppSelector(state => state.boardSlice)
  
  useEffect(() => {
    fetch(
      'api/board-state',
      {
        method: 'GET',
      }
    )
      .then(res => res.json())
      .then(response => {
        dispatch(setBoard(mapBoardStateModel(response)))
      })
      .catch(error => console.log(error))
  }, [dispatch])
  
  useRealTimeUpdates()
  
  return boardState
}

const mapBoardStateModel = (model: BoardStateModel): Board => ({
  board: model.board.map((x, i) => x.map((y, j) => ({
    ...y,
    position: {type: 'Board', x: j, y: i}}))),
  bench: model.playLetters.map((l, i) => ({
    type: 'Playable',
    position: {type: 'Bench', index: i},
    faceValue: l,
    previous: {
      type: 'None',
      position: {type: 'Bench', index: i}
    }})),
  score: {
    round: 0,
    total: 0,
    words: []
  }
//   moveDraft: []
})

type BoardStateModel = {
  board: Square[][]
  playLetters: Letter[]
  score: {
    round: number,
    total: number,
    words: []
  }
}
  