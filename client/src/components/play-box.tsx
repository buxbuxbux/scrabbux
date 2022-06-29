import React from 'react'
import { Box, GridItemProps, useColorModeValue } from '@chakra-ui/react'
import { Letter, Playable, Square } from '../types/board'
import { GridBase } from './grid-base'
import { useAppSelector } from '../state/hooks'
import { getId } from '../services/square-id'

export const PlayableBox = (props: Playable) => {
  const selected = useAppSelector(state => state.boardSlice.selectedPlayBox)
  
  const gridItemProps: GridItemProps = {
    bg: useColorModeValue('gray.300', 'blue.200'),
    color: useColorModeValue('black', 'black'),
    ...selected && getId(selected) === getId(props) ? {
      border: '3px',
      borderStyle: 'outset',
      borderColor: 'green.500'
    } : {}
  }

  gridItemProps

  return (
    <GridBase
      gridItemProps={gridItemProps}
      draggable={true}
      square={props}
    >
      <Box fontWeight='semibold' fontSize='xl'>{props.faceValue.display}</Box>
      <Box mt='3' fontSize='xs'>{props.faceValue.value}</Box>
    </GridBase>
  )
}