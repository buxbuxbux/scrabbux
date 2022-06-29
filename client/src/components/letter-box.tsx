import React from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'
import { Letter } from '../types/board'
import { GridBase } from './grid-base'

export const LetterBox = (props: Letter) => {
  const bg = useColorModeValue('gray.300', 'blue.200')
  const color = useColorModeValue('black', 'black')
  
  return (
    <GridBase  gridItemProps={{bg, color}} square={props}>
      <Box fontWeight='semibold' fontSize='xl'>{props.display}</Box>
      <Box mt='3' fontSize='xs'>{props.value}</Box>
    </GridBase>
  )
}