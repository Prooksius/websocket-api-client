import { ServerRequest, ServerRequestData } from "@store/index"
import {
  CLEAR_REQUEST,
  RequestActionType,
  SET_REQUEST,
} from "./serverRequestContext"

type ActionServerRequestData = {
  serverRequest: ServerRequest
}

type RequestAction = {
  type: RequestActionType
  payload?: ActionServerRequestData
}

export const serverRequestReducer = (
  state: ServerRequestData,
  action: RequestAction
) => {
  //  console.log('state', state)
  //  console.log('action', action)
  if (action.type === SET_REQUEST) {
    return {
      ...state,
      serverRequest: action.payload.serverRequest,
      requestCount: state.requestCount + 1,
    }
  }
  if (action.type === CLEAR_REQUEST) {
    return { ...state, serverRequest: null }
  }
  return state
}
