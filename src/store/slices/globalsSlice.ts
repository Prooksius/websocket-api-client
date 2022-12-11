import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { RootState, ServerRequest } from "@store/index"

interface GlobalState {
  showTootip: boolean
  connected: boolean
}

const initialState: GlobalState = {
  showTootip: false,
  connected: false,
}

export const globalsSlice = createSlice({
  name: "globals",
  initialState,
  reducers: {
    setTootipShow: (state, { payload }: PayloadAction<boolean>) => {
      state.showTootip = payload
    },
    setConnected: (state, { payload }: PayloadAction<boolean>) => {
      state.connected = payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTootipShow, setConnected } =
  globalsSlice.actions

export default globalsSlice.reducer

export const listTooltipShow = (state: RootState) => state.globals.showTootip
export const listConnected = (state: RootState) => state.globals.connected
