import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "@store/index"

interface GlobalState {
  showTootip: boolean
}

const initialState: GlobalState = {
  showTootip: false,
}

export const globalsSlice = createSlice({
  name: "globals",
  initialState,
  reducers: {
    setTootipShow: (state, { payload }: PayloadAction<boolean>) => {
      state.showTootip = payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTootipShow } = globalsSlice.actions

export default globalsSlice.reducer

export const listTooltipShow = (state: RootState) => state.globals.showTootip
