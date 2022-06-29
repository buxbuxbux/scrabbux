import { Board } from '../../types/board'
import { Scored } from './scored'
import { Axis, BoardPlayable, Direction, getPiece } from './scoring'

export const evaluate = (state: Board) => {
  const boardPlayables = state.board.flatMap(
    x => x.filter<BoardPlayable>(
      (y): y is BoardPlayable => y.type === 'Playable' && y.position.type === 'Board')
  )
  
  const results = new Map<Axis, Map<string, number>>()
  
  for (const playable of boardPlayables) {
    const position = playable.position
  
    const x = (i: number) => getPiece(state, { ...position, x: position.x + i })
    const y = (i: number) => getPiece(state, { ...position, y: position.y + i })
  
    const addUpLetters = (axis: typeof x | typeof y, dir: Direction = 1): Scored => {
      const result: Scored = dir === 1
        ? new Scored(playable)
        : new Scored()
      for (
        let i = <number>dir, square = axis(i);
        square && (square.type === 'Letter' || square.type === 'Playable');
        i = i + dir, square = axis(i)) {
        const scored = new Scored(square)
          
        result.add(scored, dir)
      }
  
      return dir === 1 ? result.add(addUpLetters(axis, -1), -1) : result
    }
  
    const scoreLetters = (scored: Scored, axis: Axis) => {
      if (scored.word.length <= 1) return
      results.has(axis)
        ? results.get(axis)?.set(scored.word, scored.getScore())
        : results.set(axis, new Map<string, number>().set(scored.word, scored.getScore()))
    }
      
    scoreLetters(addUpLetters(x), 'x')
    scoreLetters(addUpLetters(y), 'y')
  }
  
  const a = [...results.values()].flatMap(a => [...a.entries()])

  state.score.words = a.map(x => x[0])
  state.score.round = a.reduce((l, r) => l + r[1],0)
}