import React from 'react'
import { Card, Pane, Text, majorScale, minorScale } from 'evergreen-ui'
import { Square } from '../types/board'
import { match } from 'ts-pattern'

type LetterBoxProps = Square

export const LetterBox = (props: LetterBoxProps): JSX.Element =>
  <Card
    elevation={1}
    border="1"
    width={majorScale(5)}
    height={majorScale(5)}
    display='flex'
    justifyContent="center"
    alignItems="center"
    background='blue100'
    cursor=''
    margin={minorScale(1)}
  >
    {
      match(props)
        .with({ type: 'Letter' }, (l) => <>
          <Text size={500} >&nbsp;{l.display}</Text>
          <Text size={300} marginTop={10}>{l.value}</Text></>)
        .with({ type: 'Premium' }, (p) =>
          <><Text>{p.multiplier}x {p.actions}</Text></>)
        .with({ type: 'None' }, () => <Text size={500} ></Text>)
        .exhaustive()
    }
  </Card>