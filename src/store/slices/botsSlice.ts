import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { StatusType } from "@components/app/forms/formWrapper/types"
import type { ListPayload, RootState } from "@store/index"

export interface BotsRecord {
  id: number
  created_at: number
  updated_at: number
  name: string
  level: number
  image: string
  color: string
  price: number
  sort_order: number
  status: number
  record_open?: boolean
}

interface ErrorsState {
  list: BotsRecord[]
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

const initialState: ErrorsState = {
  list: [],
  page: 1,
  itemsInPage: 10,
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

export const errorsSlice = createSlice({
  name: "bots",
  initialState,
  reducers: {
    requestPage: (state) => {
      state.status = "loading"
    },
    loadList: (state, { payload }: PayloadAction<ListPayload<BotsRecord>>) => {
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
    toggleOpen: (state, { payload }: PayloadAction<number>) => {
      const found = state.list.find((item) => item.id === payload)
      if (found) {
        found.record_open = !found.record_open
      }
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
  toggleOpen,
  reloadPage,
} = errorsSlice.actions

export default errorsSlice.reducer

export const listItems = (state: RootState) => state.bots.list
export const listStatus = (state: RootState) => state.bots.status
export const listLoaded = (state: RootState) => state.bots.loaded
export const listPage = (state: RootState) => state.bots.page
export const listError = (state: RootState) => state.bots.error
export const listSort = (state: RootState) => state.bots.sort
export const listSelectedIds = (state: RootState) => state.bots.selectedIds
export const listItemsInPage = (state: RootState) => state.bots.itemsInPage
export const listItemsCount = (state: RootState) => state.bots.itemsCount
export const listFilterChanges = (state: RootState) => state.bots.filterChanges

export const selectItemById = (state: RootState, id: number) => {
  return state.bots.list.find((error: BotsRecord) => error.id === id)
}
