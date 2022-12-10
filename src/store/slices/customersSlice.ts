import { createSlice } from "@reduxjs/toolkit"
import { StatusType } from "@components/app/forms/formWrapper/types"
import type { RootState } from "@store/index"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface CustomersRecord {
  id: number
  created_at: number
  updated_at: number
  name: string
  email: string
  status: number
  record_open?: boolean
  popup_open?: boolean
}

interface CustomerState {
  logged: boolean
  status: StatusType
  error: string | null
  me: CustomersRecord
}

const initialState: CustomerState = {
  logged: false,
  status: "idle",
  error: null,
  me: null,
}

export const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    startAuth: (state) => {
      state.status = "loading"
    },
    endAuth: (state, { payload }: { payload: boolean }) => {
      state.status = payload ? "succeeded" : "failed"
    },
    login: (state, { payload }: PayloadAction<string>) => {
      state.status = "succeeded"
      state.logged = true
      localStorage.setItem("token", payload)
    },
    setCustomer: (state, { payload }: PayloadAction<CustomersRecord>) => {
      state.status = "succeeded"
      state.logged = true
      state.me = payload
    },
    logout: (state) => {
      state.status = "failed"
      state.logged = false
      state.me = null
      localStorage.removeItem("token")
    },
  },
})

// Action creators are generated for each case reducer function
export const { startAuth, endAuth, login, logout, setCustomer } = customersSlice.actions

export default customersSlice.reducer

export const isLogged = (state: RootState) => state.customers.logged
export const listAuthStatus = (state: RootState) => state.customers.status
export const listCustomer = (state: RootState) => state.customers.me
