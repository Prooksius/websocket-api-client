import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "@store/index"
import { ServerRequest } from "@store/store"

interface GlobalState {
  showTootip: boolean
  connecting: boolean
  connected: boolean
  serverRequest: ServerRequest
}

const initialState: GlobalState = {
  showTootip: false,
  connecting: false,
  connected: false,
  serverRequest: null,
}

export const globalsSlice = createSlice({
  name: "globals",
  initialState,
  reducers: {
    setTootipShow: (state, { payload }: PayloadAction<boolean>) => {
      state.showTootip = payload
    },
    startConnecting: (state) => {
      state.connecting = true
    },
    setConnected: (state, { payload }: PayloadAction<boolean>) => {
      state.connected = payload
    },
    sendRequest: (state, { payload }: PayloadAction<ServerRequest>) => {
      state.serverRequest = payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTootipShow, setConnected, startConnecting, sendRequest } =
  globalsSlice.actions

export default globalsSlice.reducer

export const listTooltipShow = (state: RootState) => state.globals.showTootip
export const listConnected = (state: RootState) => state.globals.connected
