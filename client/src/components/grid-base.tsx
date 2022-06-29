import React, { MouseEventHandler, ReactNode } from 'react'
import { GridItem, GridItemProps } from '@chakra-ui/react'
import { useDrag } from 'react-dnd'
import { getId } from '../services/square-id'
import { clickSquare } from '../state/board-slice'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import { Square } from '../types/board'

type GridBaseProps = {
  gridItemProps?: GridItemProps
  children: ReactNode
  square: Square
  draggable?: boolean
  onClick?: MouseEventHandler<HTMLDivElement>
}

export const GridBase = (props: GridBaseProps) =>  {
  const dispatch = useAppDispatch()
  const boardState = useAppSelector(state => state.boardSlice)

  const onClick: MouseEventHandler<HTMLDivElement> = (e) => {
    dispatch(clickSquare(props.square))
  }

  return (
    <GridItem
      id={getId(props.square)}
      onClick={onClick}
      {...props.gridItemProps}
      w='10'
      h='10'
      display='flex'
      justifyContent="center"
      alignItems="center"
      cursor={props.draggable || !!boardState.selectedPlayBox ? 'pointer' : 'default'}>
      {props.children}
    </GridItem>)
}
//   ConditionalDragable(props.draggable || false, 
//     <GridItem
//       id={(props.draggable || false) ? 'drag' : 'grid'}
//       onMouseUp={onMouseUp}
//       w='10'
//       h='10'
//       bg={props.bg}
//       color={props.color}
//       display='flex'
//       justifyContent="center"
//       alignItems="center">
//       {props.children}
//     </GridItem>)