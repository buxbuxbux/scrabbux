import { match } from 'ts-pattern'
import { Letter, Playable } from '../../types/board'

export class Scored {
  public word: string
  private score: number
  private multiple: number
  
  constructor(square?: Playable | Letter) {
    this.multiple = 1

    if (square?.type === 'Letter') {
      this.word = square.display
      this.score = square.value
    }
    else if (square?.type === 'Playable') {
      this.word = square.faceValue.display
      this.score = square.faceValue.value
      // eslint-disable-next-line no-debugger
      
      match(square.previous)
        .with({ type: 'Premium', actions: 'Letter'}, (p) => this.score *= p.multiplier)
        .with({ type: 'Premium', actions: 'Word'}, (p) => this.multiple *= p.multiplier)
        .otherwise(() => { console.log(square) })
    }
    else {
      this.word = ''
      this.score = 0
    }
  }
  
  public add = (other: Scored, direction: -1 | 1) => {
    this.score += other.score
    this.word = match(direction)
      .with(-1, () => `${other.word}${this.word}`)
      .otherwise(() => `${this.word}${other.word}`)
    this.multiple *= other.multiple
    return this
  }
  
  public getScore = () => this.score * this.multiple
  
}