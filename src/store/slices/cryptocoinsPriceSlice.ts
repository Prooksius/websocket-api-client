import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { StatusType } from "@components/app/forms/formWrapper/types"
import type { RootState } from "@store/index"
import { ListPayload } from "@store/store"

export interface CryptocoinsPriceRecord {
  id: number
  created_at: number
  stock: number
  market: number
  asset: string
  price: number
}

interface CryptocoinsPriceState {
  list: CryptocoinsPriceRecord[]
  page: number
  itemsInPage: number
  itemsCount: number
  sort: string
  status: StatusType
  editStatus: StatusType
  loaded: boolean
  error: string
  search: string
  filterChanges: number
  selectedIds: number[]
}

const initialState: CryptocoinsPriceState = {
  list: [],
  page: 1,
  itemsInPage: 7,
  itemsCount: 0,
  sort: "",
  status: "idle",
  editStatus: "idle",
  loaded: false,
  error: "",
  search: "",
  filterChanges: 0,
  selectedIds: [],
}

export const cryptocoinsPriceSlice = createSlice({
  name: "cryptocoinsPrice",
  initialState,
  reducers: {
    requestPage: (state) => {
      state.status = "loading"
    },
    loadList: (
      state,
      { payload }: PayloadAction<ListPayload<CryptocoinsPriceRecord>>
    ) => {
      state.list = payload.list
      state.itemsCount = payload.count
      state.status = "succeeded"
    },
    setPage: (state, { payload }: PayloadAction<number>) => {
      if (state.page !== payload) {
        state.filterChanges++
      }
      state.page = payload
    },
    setSelected: (state, { payload }: PayloadAction<number[]>) => {
      state.selectedIds = payload
    },
    setSort: (state, { payload }: PayloadAction<string>) => {
      if (state.sort !== payload) {
        state.page = initialState.page
        state.filterChanges++
      }
      state.sort = payload
    },
    setItemsInPage: (state, { payload }: PayloadAction<number>) => {
      if (state.itemsInPage !== payload) {
        state.filterChanges++
      }
      state.itemsInPage = payload
    },
    setSearch: (state, { payload }: PayloadAction<string>) => {
      if (state.search !== payload) {
        state.filterChanges++
      }
      state.search = payload
    },
    reloadPage: (state) => {
      state.filterChanges++
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  requestPage,
  loadList,
  setSearch,
  setPage,
  setSort,
  setSelected,
  setItemsInPage,
  reloadPage,
} = cryptocoinsPriceSlice.actions

export default cryptocoinsPriceSlice.reducer

export const listState = (state: RootState) => state.cryptocoinsPrice
export const listItems = (state: RootState) => state.cryptocoinsPrice.list
export const listStatus = (state: RootState) => state.cryptocoinsPrice.status
export const listLoaded = (state: RootState) => state.cryptocoinsPrice.loaded
export const listPage = (state: RootState) => state.cryptocoinsPrice.page
export const listError = (state: RootState) => state.cryptocoinsPrice.error
export const listSort = (state: RootState) => state.cryptocoinsPrice.sort
export const listSearch = (state: RootState) => state.cryptocoinsPrice.search
export const listSelectedIds = (state: RootState) => state.cryptocoinsPrice.selectedIds
export const listItemsInPage = (state: RootState) => state.cryptocoinsPrice.itemsInPage
export const listItemsCount = (state: RootState) => state.cryptocoinsPrice.itemsCount
export const listFilterChanges = (state: RootState) => state.cryptocoinsPrice.filterChanges
