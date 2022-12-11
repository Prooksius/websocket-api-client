import { ServerRequest, ServerRequestData } from "@store/index"
import { createContext } from "react"

export const SET_REQUEST = "SET_REQUEST"
export const CLEAR_REQUEST = "CLEAR_REQUEST"

export type RequestActionType = typeof SET_REQUEST | typeof CLEAR_REQUEST

export type SetRequestFunc = (request: ServerRequest) => void
export type ClearRequestFunc = () => void

export interface ServerRequestProps {
  serverRequestData: ServerRequestData
  setServerRequest: SetRequestFunc
  clearServerRequest: ClearRequestFunc
}

const initialState: ServerRequestProps = {
  serverRequestData: {
    serverRequest: null,
    requestCount: 0,
  },
  setServerRequest: null,
  clearServerRequest: null,
}

export const ServerRequestContext = createContext<ServerRequestProps>(initialState)
