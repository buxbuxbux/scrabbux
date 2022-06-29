import { useCallback, useEffect } from 'react'
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@microsoft/signalr'
import { updateBoard } from './board-slice'
import { useAppDispatch } from './hooks'
import { MoveModel } from '../types/model'

const connection = new HubConnectionBuilder()
  .withUrl('live/boardhub')
  .withAutomaticReconnect()
  .build()

// TODO: supercharge this
// https://github.com/pguilbert/react-use-signalr/blob/main/src/useHub.ts
export const useRealTimeUpdates = () => {

  //   const [connection, setConnection] = useState<HubConnection>()
  const dispatch = useAppDispatch()
  const onMessageReceived = useCallback((move: MoveModel) => {
    // todo fix dispatch(updateBoard(move))
  }, [])

  useEffect(() => {
    connection.on('ReceiveMessage', onMessageReceived)
    // setConnection(_connection)

    if (connection.state != HubConnectionState.Disconnected) {
      console.log({state: connection.state})
      return
    }

    connection
      .start()
    //   .then(() => setConnection(_connection))
      .catch((err) => {
        console.error(err)
      })
  }, [onMessageReceived, connection])
}
