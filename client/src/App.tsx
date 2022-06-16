import React, { useEffect, useState } from 'react'
import { Pane, Menu } from 'evergreen-ui'
import './App.css'
import { LetterBox } from './components/letter-box'
import Box from 'ui-box'
import { BoardState } from './types/board'
import { useRealTimeUpdates } from './state/realtime-updater'
import { useAppDispatch, useAppSelector } from './state/hooks'
import { setBoard } from './state/board-slice'

const App = () => {
  const dispatch = useAppDispatch()
  const boardState = useAppSelector(state => state.boardSlice)

  useEffect(() => {
    fetch(
      'api/board-state',
      {
        method: 'GET',
      }
    )
      .then(res => res.json())
      .then(response => {
        // console.log(response)
        dispatch(setBoard(response))
      })
      .catch(error => console.log(error))
  }, [dispatch])

  useRealTimeUpdates()

  console.log(boardState)

  return (
    <Pane>
      <Menu>
      </Menu>
      <br />
      <Box whiteSpace='nowrap'>
        {
          boardState && boardState.board.map(row =>
            <><Box display='inline-block'>
              {row.map((item, index) =>
                <LetterBox {...item} key={'row' + index}></LetterBox>)}
            </Box></>)
        }
      </Box>
    </Pane>
  )
}


export default App