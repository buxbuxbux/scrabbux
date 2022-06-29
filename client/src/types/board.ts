export type BoardCoordinates = {
  type: 'Board'
  x: number
  y: number
}

export type BenchCoordinates = {
  type: 'Bench'
  index: number
}

export type Position = BoardCoordinates | BenchCoordinates

export type Letter = {
  type: 'Letter'
  position: Position
  display: string
  value: number
}

export type Premium = {
  type: 'Premium'
  position: Position
  actions: 'Letter' | 'Word'
  multiplier: number
}

export type Center = {
  type: 'Center'
  position: Position
}

export type None = {
  type: 'None'
  position: Position
}

export type Playable = {
  type: 'Playable'
  position: Position
  faceValue: Letter
  previous: Square
}

export type Square = Letter | Premium | Center | None | Playable

export type Board = {
  board: Square[][]
  bench: Square[]
  selectedPlayBox?: Playable
  score: {
    round: number,
    total: number,
    words: string[]
  }
  // moveDraft: Move[]
}