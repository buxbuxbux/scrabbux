import { match } from 'ts-pattern'
import { Square } from '../types/board'

export const getId = (square: Square): string => 
  match(square.position)
    .with({type: 'Bench'}, (b) => `bench-${b.index}`)
    .with({type: 'Board'}, (b) => `board-${b.x}-${b.y}`)
    .exhaustive()