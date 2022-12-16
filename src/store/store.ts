import { configureStore } from "@reduxjs/toolkit"
import globalsReducer from "@store/slices/globalsSlice"
import customersReducer, {
  CustomersRecord,
  endAuth,
  login as customerLogin,
  setCustomer,
} from "@store/slices/customersSlice"
import countriesReducer, {
  CountriesRecord,
  loadList as loadCountriesList,
} from "@store/slices/countriesSlice"
import cryptocoinsPriceReducer, {
  CryptocoinsPriceRecord,
  loadList as loadCoinsList,
} from "@store/slices/cryptocoinsPriceSlice"
import botsReducer, {
  BotsRecord,
  loadList as loadBotsList,
} from "@store/slices/botsSlice"
import websocketsMiddleware from "@store/middlewares/websocketsMiddleware"
import { toastAlert } from "@config"

export interface ServerRequest {
  entity: string
  method: string
  params: Record<string, any>
  token?: string
}

export interface ServerRequestData {
  serverRequest: ServerRequest
  requestCount: number
}

export interface ServerGetResponse<T> {
  entity: string
  method: string
  status: string
  message?: string
  data: T
}

export interface ListPayload<T> {
  page: number
  limit: number
  count: number
  list: T[]
}

export type SendRequestFunc = (request: ServerRequest) => void

interface DispatcherEntityHandleItem
  extends Record<string, (params: any) => void> {
  list?: (params?: any) => void
  login?: (params: any) => void
  register?: (params: any) => void
  identity?: (params: any) => void
}

interface DispatcherType
  extends Record<string, Record<string, DispatcherEntityHandleItem>> {
  success: Record<string, DispatcherEntityHandleItem>
  error: Record<string, DispatcherEntityHandleItem>
}

export const store = configureStore({
  reducer: {
    globals: globalsReducer,
    customers: customersReducer,
    countries: countriesReducer,
    cryptocoinsPrice: cryptocoinsPriceReducer,
    bots: botsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([websocketsMiddleware])
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

export const storeDispatcher: DispatcherType = {
  success: {
    customer: {
      login: ({ token }: { token: string }) => {
        store.dispatch(customerLogin(token))
      },
      register: ({ message }: { message: string }) => {
        toastAlert(message, "success")
      },
      identity: ({ user }: { user: CustomersRecord }) => {
        store.dispatch(setCustomer(user))
      },
    },
    country: {
      list: (params: ListPayload<CountriesRecord>) => {
        store.dispatch(loadCountriesList(params))
      },
    },
    bot: {
      list: (params: ListPayload<BotsRecord>) => {
        store.dispatch(loadBotsList(params))
      },
    },
    cryptocoin_price: {
      list: (params: ListPayload<CryptocoinsPriceRecord>) => {
        store.dispatch(loadCoinsList(params))
      },
    },
  },
  error: {
    customer: {
      login: (params: any) => {
        store.dispatch(endAuth(false))
      },
      register: (params: any) => {
        //
      },
      identity: (params: any) => {
        //
      },
    },
    country: {
      list: (params: any) => {
        //
      },
    },
    bot: {
      list: (params: any) => {
        //
      },
    },
    cryptocoin_price: {
      list: (params: any) => {
        //
      },
    },
  },
}
