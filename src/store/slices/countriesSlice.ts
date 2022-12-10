import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "@store/store"
import { StatusType } from "@components/app/forms/formWrapper/types"
import { ListPayload } from ".."

export interface CountriesRecord {
  id: number
  name: string
  description: string
  iso_code_2: string
  iso_code_3: string
  flag: string
  popularity: number
  status: number
  phonemask: string
  record_open?: boolean
  popup_open?: boolean
}

export interface CountriesShortRecord {
  id: number
  name: string
}

interface CountriesState {
  list: CountriesRecord[]
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

const initialState: CountriesState = {
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

export const CountriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    requestPage: (state) => {
      state.status = "loading"
    },
    loadList: (
      state,
      { payload }: PayloadAction<ListPayload<CountriesRecord>>
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
    toggleItemOpen: (state, { payload }: PayloadAction<number>) => {
      const found = state.list.find((item) => item.id === payload)
      if (found) found.record_open = !found.record_open
    },
    toggleItemPopup: (state, { payload }: PayloadAction<number>) => {
      const found = state.list.find((item) => item.id === payload)
      if (found) found.popup_open = !found.popup_open
    },
    closeItemPopups: (state) => {
      state.list.map((item) => {
        item.popup_open = false
      })
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
  setItemsInPage,
  setSelected,
  toggleItemOpen,
  toggleItemPopup,
  closeItemPopups,
  reloadPage,
} = CountriesSlice.actions

export default CountriesSlice.reducer

export const listItems = (state: RootState) => state.countries.list
export const listStatus = (state: RootState) => state.countries.status
export const listEditStatus = (state: RootState) => state.countries.editStatus
export const listSort = (state: RootState) => state.countries.sort
export const listLoaded = (state: RootState) => state.countries.loaded
export const listPage = (state: RootState) => state.countries.page
export const listSelectedIds = (state: RootState) => state.countries.selectedIds
export const listItemsInPage = (state: RootState) => state.countries.itemsInPage
export const listItemsCount = (state: RootState) => state.countries.itemsCount
export const listFilterChanges = (state: RootState) =>
  state.countries.filterChanges
export const listSearch = (state: RootState) => state.countries.search
export const listError = (state: RootState) => state.countries.error

export const selectEmailById = (state: RootState, id: number) => {
  return state.countries.list.find((item) => item.id === id)
}
