import { Square, Position } from './board'

export type MoveModel = {
  square: Square
} & Position
  