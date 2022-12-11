import React, { ReactNode, useReducer } from "react"
import {
  CLEAR_REQUEST,
  ServerRequestContext,
  ServerRequestProps,
  SET_REQUEST,
} from "./serverRequestContext"
import { serverRequestReducer } from "./serverRequestReducer"
import { ServerRequest, ServerRequestData } from "@store/index"

interface ServerRequestStateProps {
  children: ReactNode
  serverRequestData: ServerRequestData
}

export const ServerRequestState: React.FC<ServerRequestStateProps> = ({
  children,
  serverRequestData,
}) => {
  const [requestState, dispatch] = useReducer(serverRequestReducer, serverRequestData)

  const setServerRequest = (serverRequest: ServerRequest) =>
    dispatch({ type: SET_REQUEST, payload: { serverRequest } })

  const clearServerRequest = () =>
    dispatch({ type: CLEAR_REQUEST, payload: null })

  const contextProps: ServerRequestProps = {
    serverRequestData: requestState,
    setServerRequest,
    clearServerRequest,
  }

  return (
    <ServerRequestContext.Provider value={contextProps}>
      {children}
    </ServerRequestContext.Provider>
  )
}
