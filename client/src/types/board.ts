export type Letter = {
  type: 'Letter'
  display: string
  value: number
}

export type Premium = {
  type: 'Premium'
  actions: 'Letter' | 'Word'
  multiplier: number
}

export type None = {
  type: 'None'
}

export type Square = Letter | Premium | None

export type Row<T extends number> = Tuple<Square, T>

export type BoardState = {
  board: Square[][]
  // players: Tuple<Square[], TPlayers>
  // unusedLetters: Square[]
}

export type Move = {
  letter: Letter
  xAxis: number
  yAxis: number
}

type Tuple<T, N extends number> =
    N extends N ? number extends N ? T[] : _TupleOf<T, N, []> : never
type _TupleOf<T, N extends number, R extends unknown[]> =
    R['length'] extends N ? R : _TupleOf<T, N, [T, ...R]>