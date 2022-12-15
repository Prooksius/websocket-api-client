import { REACT_APP_API_URL, toastAlert } from "@config"
import type { Middleware } from "redux"
import { ListPayload, RootState, ServerGetResponse } from "."
import { sendRequest, setConnected, startConnecting } from "./slices/globalsSlice"
import type { CountriesRecord } from "./slices/countriesSlice"
import type { BotsRecord } from "./slices/botsSlice"
import {
  CustomersRecord,
  endAuth,
  login as customerLogin,
  setCustomer,
} from "./slices/customersSlice"
import { loadList as loadCountriesList } from "@store/slices/countriesSlice"
import { loadList as loadBotsList } from "@store/slices/botsSlice"
import type { AppDispatch } from "./store"

interface DispatcherEntityHandleItem
  extends Record<string, (params: any) => void> {
  list?: (params: any) => void
  login?: (params: any) => void
  register?: (params: any) => void
  identity?: (params: any) => void
}

interface DispatcherEntityHandle
  extends Record<string, DispatcherEntityHandleItem> {
  customer: DispatcherEntityHandleItem
  country: DispatcherEntityHandleItem
  bot: DispatcherEntityHandleItem
}

interface DispatcherType extends Record<string, DispatcherEntityHandle> {
  success: DispatcherEntityHandle
  error: DispatcherEntityHandle
}

const websocketsMiddleware: Middleware = (store) => {
  let socket: WebSocket

  return (next) => (action) => {
    const state = socket && store.getState()

    const dispatcher: DispatcherType = {
      success: {
        customer: {
          login: ({ token }: { token: string }) => {
            store.dispatch(customerLogin(token))
          },
          register: ({ message }: { message: string }) => {
            toastAlert(message, "success")
          },
          identity: ({ user }: { user: CustomersRecord }) => {
            store.dispatch(setCustomer(user))
          },
        },
        country: {
          list: (params: ListPayload<CountriesRecord>) => {
            store.dispatch(loadCountriesList(params))
          },
        },
        bot: {
          list: (params: ListPayload<BotsRecord>) => {
            store.dispatch(loadBotsList(params))
          },
        },
      },
      error: {
        customer: {
          login: (params: any) => {
            store.dispatch(endAuth(false))
          },
          register: (params: any) => {
            //
          },
          identity: (params: any) => {
            //
          },
        },
        country: {
          list: (params: any) => {
            //
          },
        },
        bot: {
          list: (params: any) => {
            //
          },
        },
      },
    }

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
          dispatcher[data.status][data.entity][data.method](data.data)
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
