import { HubConnection, HubConnectionState } from '@microsoft/signalr'
import { useState, useEffect } from 'react'

export function useHub(hubConnection?: HubConnection) {
  const [connectionState, setConnectionState] = useState<HubConnectionState>(
    hubConnection?.state ?? HubConnectionState.Disconnected)
  const [error, setError] = useState()

  useEffect(() => {
    setError(undefined)

    if (!hubConnection) {
      setConnectionState(HubConnectionState.Disconnected)
      return
    }

    if (hubConnection.state !== connectionState) {
      setConnectionState(hubConnection.state)
    }

    let isMounted = true
    const onStateUpdatedCallback = () => {
      if (isMounted) {
        setConnectionState(hubConnection?.state)
      }
    }
    hubConnection.onclose(onStateUpdatedCallback)
    hubConnection.onreconnected(onStateUpdatedCallback)
    hubConnection.onreconnecting(onStateUpdatedCallback)

    if (hubConnection.state === HubConnectionState.Disconnected) {
      const startPromise = hubConnection
        .start()
        .then(onStateUpdatedCallback)
        .catch(reason => setError(reason))
      onStateUpdatedCallback()

      return () => {
        startPromise.then(() => {
          hubConnection.stop()
        })
        isMounted = false
      }
    }

    return () => {
      hubConnection.stop()
    }
  }, [hubConnection])

  return { connectionState, error }
}