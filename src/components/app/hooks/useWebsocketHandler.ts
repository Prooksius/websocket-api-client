import type { AppDispatch } from "@store/store"
import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  isLogged,
  listAuthStatus,
  setCustomer,
  startAuth,
  endAuth,
  login as customerLogin,
  CustomersRecord,
} from "@store/slices/customersSlice"
import {
  listFilterChanges as listCountriesFilterChanges,
  loadList as loadCountriesList,
  listPage as listCountriesPage,
  listSort as listCountriesSort,
  listItemsInPage as listCountriesItemsInPage,
  CountriesRecord,
} from "@store/slices/countriesSlice"
import {
  listFilterChanges as listBotsFilterChanges,
  loadList as loadBotsList,
  listPage as listBotsPage,
  listSort as listBotsSort,
  listItemsInPage as listBotsItemsInPage,
  BotsRecord,
} from "@store/slices/botsSlice"
import type {
  ListPayload,
  SendRequestFunc,
  ServerGetResponse,
  ServerRequest,
} from "@store/index"
import { toastAlert } from "@config"
import {
  listConnected,
  setConnected,
} from "@store/slices/globalsSlice"
import { ServerRequestContext } from "./serverRequestContext"

type EnitiyParamsDetails = {
  page: number
  sort: string
  itemsInPage: number
  filterChanges: number
}

interface EnitiyParamsData extends Record<string, EnitiyParamsDetails> {
  [key: string]: EnitiyParamsDetails
}

interface DispatcherEntityHandleItem
  extends Record<string, (params: any) => void> {
  list?: (params: any) => void
  login?: (params: any) => void
  register?: (params: any) => void
  identity?: (params: any) => void
}

interface DispatcherEntityHandle
  extends Record<string, DispatcherEntityHandleItem> {
  customer: DispatcherEntityHandleItem
  country: DispatcherEntityHandleItem
  bot: DispatcherEntityHandleItem
}

interface DispatcherType extends Record<string, DispatcherEntityHandle> {
  success: DispatcherEntityHandle
  error: DispatcherEntityHandle
}

const useWebsocketsHandler = (url: string): void => {
  const dispatch = useDispatch<AppDispatch>()

  const [wsApi, setWsApi] = useState<WebSocket>(null)

  const { serverRequestData, setServerRequest, clearServerRequest } =
    useContext(ServerRequestContext)
  
  const connected = useSelector(listConnected)

  const enitiyParams: EnitiyParamsData = {
    country: {
      page: useSelector(listCountriesPage),
      sort: useSelector(listCountriesSort),
      itemsInPage: useSelector(listCountriesItemsInPage),
      filterChanges: useSelector(listCountriesFilterChanges),
    },
    bot: {
      page: useSelector(listBotsPage),
      sort: useSelector(listBotsSort),
      itemsInPage: useSelector(listBotsItemsInPage),
      filterChanges: useSelector(listBotsFilterChanges),
    },
  }

  const dispatcher: DispatcherType = {
    success: {
      customer: {
        login: ({ token }: { token: string }) => {
          dispatch(customerLogin(token))
        },
        register: ({ message }: { message: string }) => {
          toastAlert(message, "success")
        },
        identity: ({ user }: { user: CustomersRecord }) => {
          dispatch(setCustomer(user))
        },
      },
      country: {
        list: (params: ListPayload<CountriesRecord>) => {
          dispatch(loadCountriesList(params))
        },
      },
      bot: {
        list: (params: ListPayload<BotsRecord>) => {
          dispatch(loadBotsList(params))
        },
      },
    },
    error: {
      customer: {
        login: (params: any) => {
          dispatch(endAuth(false))
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
    },
  }

  const requestEntityList = (entity: string, method: string) => {
    if (connected) {
      wsApi.send(
        JSON.stringify({
          entity,
          method,
          params: {
            sort: enitiyParams[entity].sort
              ? enitiyParams[entity].sort.replace("-", "")
              : "",
            order: enitiyParams[entity].sort.charAt(0) === "-" ? "DESC" : "ASC",
            page: enitiyParams[entity].page,
            limit: enitiyParams[entity].itemsInPage,
            language_id: "ru-RU",
          },
        })
      )
    }
  }

  const sendRequest: SendRequestFunc = (request: ServerRequest) => {
    wsApi.send(JSON.stringify(request))
  }

  useEffect(() => {
    const startWsApi = new WebSocket(url)
    setWsApi(startWsApi)

    const token = localStorage.getItem("token")
    if (token) {
      dispatch(customerLogin(token))
    }
    startWsApi.onopen = (event: Event) => {
      console.log("Websocket API connection opened")
      dispatch(setConnected(true))
    }

    startWsApi.onmessage = (event: MessageEvent) => {
      const data: ServerGetResponse<any> = JSON.parse(event.data)
      console.log("data", data)
      if (data.status) {
        dispatcher[data.status][data.entity][data.method](data.data)
      }
      if (data.status === "error") {
        toastAlert(data.message, "error")
      }
    }

    startWsApi.onclose = (event: CloseEvent) => {
      dispatch(setConnected(false))
      console.log("Websocket API connection closed")
      //wsApi = new WebSocket("ws://proksi-design.ru:2380")
    }

    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (enitiyParams.country.filterChanges) {
      //dispatch(requestCountriesPage())
      requestEntityList("country", "list")
    }
    // eslint-disable-next-line
  }, [enitiyParams.country.filterChanges])

  useEffect(() => {
    if (enitiyParams.bot.filterChanges) {
      //dispatch(requestBotsPage())
      requestEntityList("bot", "list")
    }
    // eslint-disable-next-line
  }, [enitiyParams.bot.filterChanges])

  useEffect(() => {
    if (connected) {
      wsApi.send(JSON.stringify(serverRequestData.serverRequest))
    }
    clearServerRequest()
    // eslint-disable-next-line
  }, [serverRequestData.requestCount])
}

export default useWebsocketsHandler
