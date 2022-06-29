import React from 'react'
import { Center, None, Premium, Square } from '../types/board'
import { match } from 'ts-pattern'
import { Box, useColorModeValue } from '@chakra-ui/react'
import { GridBase } from './grid-base'
import { LetterBox } from './letter-box'
import { FaCrosshairs } from 'react-icons/fa'
import { PlayableBox } from './play-box'

export type SquareBoxProps = {
  square: Square
}

export const SquareBox = (props: SquareBoxProps): JSX.Element => 
  match(props.square)
    .with({ type: 'Letter' }, (b) => <LetterBox {...b} />)
    .with({ type: 'Premium' }, (b) => <PremiumBox {...b} />)
    .with({ type: 'Center' }, (b) => <CenterBox {...b} />)
    .with({ type: 'None' }, (b) => <NoneBox {...b} />)
    .with({ type: 'Playable' }, (b) => <PlayableBox {...b} />)
    .exhaustive()

const PremiumBox = (props: Premium) => {
  const light = match(props.actions)
    .with('Letter', () => 'red')
    .with('Word', () => 'blue')
    .exhaustive()

  const bg = useColorModeValue(
    `${light}.${props.multiplier}00`,
    'red.200')

  const color = useColorModeValue('black', 'black')

  return (
    <GridBase gridItemProps={{bg, color}} square={props} >
      <Box fontWeight='light' fontSize='s'>
        {`${props.multiplier}x${props.actions[0]}`}
      </Box>
    </GridBase>
  )
}

const CenterBox = (props: Center) => {
  const bg = useColorModeValue('gray.200', 'gray.200')
  const color = useColorModeValue('black', 'black')

  return (
    <GridBase gridItemProps={{bg, color}} square={props}>
      <FaCrosshairs />
    </GridBase>
  )
}

const NoneBox = (props: None) => {
  const bg = useColorModeValue('gray.200', 'gray.200')
  const color = useColorModeValue('black', 'black')

  return (
    <GridBase gridItemProps={{bg, color}} square={props}>
    </GridBase>
  )
}

// const WhiteSpace = () => {
//   <GridBase bg='white' color='white' >
//   </GridBase>
// }