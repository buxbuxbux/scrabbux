import { match } from 'ts-pattern'
import { Board, Playable, Position, Square } from '../../types/board'

export type BoardPlayable = Playable & {position: {type: 'Board'}}
export type Axis =  'x' | 'y'
export type Direction = -1 | 1

export const getPiece = (
  state: Board,
  position: Position): Square | undefined =>
  match(position)
    .with({type: 'Bench'}, (b) => state.bench[b.index])
    .with({type: 'Board'}, (b) => state.board[b.y] && state.board[b.y][b.x])
    .exhaustive()