import { REACT_APP_API_URL, toastAlert } from "@config"
import type { Middleware } from "redux"
import { ServerGetResponse } from "@store/store"
import {
  sendRequest,
  setConnected,
  startConnecting,
} from "../slices/globalsSlice"
import { AppStore, storeDispatcher } from "../store"

const websocketsMiddleware: Middleware = (store: AppStore) => {
  let socket: WebSocket

  return (next) => (action) => {
    const state = socket && store.getState()

    if (startConnecting.match(action)) {
      socket = new WebSocket(REACT_APP_API_URL)

      socket.onopen = () => {
        console.log("Websocket API connection opened")
        store.dispatch(setConnected(true))
      }

      socket.onmessage = (event: MessageEvent) => {
        const data: ServerGetResponse<any> = JSON.parse(event.data)
        console.log("data", data)
        if (data.status) {
          storeDispatcher[data.status][data.entity][data.method](data.data)
        }
        if (data.status === "error") {
          toastAlert(data.message, "error")
        }
      }

      socket.onclose = (event: CloseEvent) => {
        store.dispatch(setConnected(false))
        console.log("Websocket API connection closed")
      }
    }

    if (sendRequest.match(action) && state.globals.connected) {
      socket.send(JSON.stringify(action.payload))
    }

    next(action)
  }
}

export default websocketsMiddleware
