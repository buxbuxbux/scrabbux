import React from 'react'
import { SquareBox } from './components/square-box'
import { Container, Grid, GridItem } from '@chakra-ui/react'
import { PlayableBox } from './components/play-box'
import { useBoardState } from './services/board-state.service'
import { match } from 'ts-pattern'
import { getId } from './services/square-id'

const App = () => {
  const boardState = useBoardState()

  return (
    <Container>
      <Container mt='10'>
        Letters made: {boardState.score?.words?.join(', ')}
      </Container>
      <Container mt='2'>
        Score: {boardState.score?.round}
      </Container>
      <Container mt='20'>
        <Grid templateColumns='repeat(15, 1fr)'
          templateRows='repeat(15, 1fr)' w='100%' h='100%' rowGap='0.5' columnGap='0.5'>
          {boardState.board.map((y) =>
            y.map((x) => <SquareBox key={getId(x)} square={x} />))
          }
        </Grid>
      </Container>
      <Container ml='40' mt='4' w='50%'>
        <Grid templateColumns='repeat(7, 1fr)'
          w='100%' h='100%' rowGap='0.5' columnGap='0.5'>
          {boardState.bench.map((l) => <SquareBox key={getId(l)} square={l} />)}
        </Grid>
      </Container>
    </Container>
  )
}


export default App