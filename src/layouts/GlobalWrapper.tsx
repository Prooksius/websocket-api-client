import React, {
  ReactChildren,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react"
import { useSearchParams, useNavigate, Navigate } from "react-router-dom"
import MainLayout from "@layouts/MainLayout"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch } from "@store/store"
import {
  isLogged,
  listAuthStatus,
  setCustomer,
  startAuth,
  endAuth,
  login as customerLogin,
} from "@store/slices/customersSlice"
import {
  listFilterChanges as listCountriesFilterChanges,
  loadList as loadCountriesList,
  requestPage as requestCountriesPage,
  listPage as listCountriesPage,
  listSort as listCountriesSort,
  listItemsInPage as listCountriesItemsInPage,
  reloadPage as reloadCountriesPage,
} from "@store/slices/countriesSlice"
import {
  listFilterChanges as listBotsFilterChanges,
  loadList as loadBotsList,
  requestPage as requestBotsPage,
  listPage as listBotsPage,
  listSort as listBotsSort,
  listItemsInPage as listBotsItemsInPage,
  reloadPage as reloadBotsPage,
} from "@store/slices/botsSlice"
import type { ServerGetResponse } from "@store/index"
import { REACT_APP_API_URL, toastAlert } from "@config"
import classNames from "classnames"

const PAGE_TITLE = "Вход"

const GlobalWrapper: React.FC = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [wsApi, setWsApi] = useState<WebSocket>(null)
  const [connected, setConnected] = useState(false)
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")

  const countriesFilterChanges = useSelector(listCountriesFilterChanges)
  const botsFilterChanges = useSelector(listBotsFilterChanges)

  const countriesPage = useSelector(listCountriesPage)
  const countriesSort = useSelector(listCountriesSort)
  const countriesItemsInPage = useSelector(listCountriesItemsInPage)

  const botsPage = useSelector(listBotsPage)
  const botsSort = useSelector(listBotsSort)
  const botsItemsInPage = useSelector(listBotsItemsInPage)

  const logged = useSelector(isLogged)
  const loggedStatus = useSelector(listAuthStatus)

  const goToLogin = () => {
    dispatch(startAuth())
    wsApi.send(
      JSON.stringify({
        entity: "customer",
        method: "login",
        params: { login, password },
      })
    )
  }
  useEffect(() => {
    if (logged) {
      setLogin("")
      setPassword("")
    }
    // eslint-disable-next-line
  }, [logged])

  useEffect(() => {
    const startWsApi = new WebSocket(REACT_APP_API_URL)
    setWsApi(startWsApi)

    const token = localStorage.getItem("token")
    if (token) {
      dispatch(customerLogin(token))
    }
    startWsApi.onopen = (event: Event) => {
      console.log("Websocket API connection opened")
      setConnected(true)
    }

    startWsApi.onmessage = (event: MessageEvent) => {
      const data: ServerGetResponse<any> = JSON.parse(event.data)
      console.log("data", data)
      if (data.status === "success") {
        if (data.entity === "customer") {
          if (data.method === "login") {
            dispatch(customerLogin(data.data.token))
          } else if (data.method === "register") {
            toastAlert(data.data?.message, "success")
          } else if (data.method === "identity") {
            dispatch(setCustomer(data.data))
          }
        } else if (data.entity === "country") {
          if (data.method === "list") {
            dispatch(loadCountriesList(data.data))
          }
        } else if (data.entity === "bot") {
          if (data.method === "list") {
            dispatch(loadBotsList(data.data))
          }
        }
      } else {
        toastAlert(data.message, "error")
        if (data.entity === "customer") {
          dispatch(endAuth(false))
        }
      }
    }

    startWsApi.onclose = (event: CloseEvent) => {
      setConnected(false)
      console.log("Websocket API connection closed")
      console.log("Close connection reason", event.reason)
      //wsApi = new WebSocket("ws://proksi-design.ru:2380")
    }

    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    //dispatch(requestCountriesPage())
    if (connected) {
      console.log("sending countries request")
      wsApi.send(
        JSON.stringify({
          entity: "country",
          method: "list",
          params: {
            sort: countriesSort ? countriesSort.replace("-", "") : "",
            order: countriesSort.charAt(0) === "-" ? "DESC" : "ASC",
            page: countriesPage,
            limit: countriesItemsInPage,
            language_id: "ru-RU",
          },
        })
      )
    }
    // eslint-disable-next-line
  }, [countriesFilterChanges])

  useEffect(() => {
    if (botsFilterChanges) {
      //dispatch(requestBotsPage())
      if (connected) {
        console.log("sending bots request")
        wsApi.send(
          JSON.stringify({
            entity: "bot",
            method: "list",
            params: {
              sort: botsSort ? botsSort.replace("-", "") : "",
              order: botsSort.charAt(0) === "-" ? "DESC" : "ASC",
              page: botsPage,
              limit: botsItemsInPage,
              language_id: "ru-RU",
            },
          })
        )
      }
    }
    // eslint-disable-next-line
  }, [botsFilterChanges])

  return (
    <>
      {logged && connected && children}
      {!logged && (
        <MainLayout title={PAGE_TITLE} h1={PAGE_TITLE}>
          <div className="page-contents">
            {!connected && <h3>Соединение с сервером</h3>}
            {connected && loggedStatus === "loading" && <h3>Авторизация...</h3>}
            {connected && loggedStatus !== "loading" && (
              <>
                <h3>Вы не авторизованы</h3>
                <br />
                <div className="form__row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div
                      className={classNames("form-field", {
                        hasValue: login != "",
                      })}
                    >
                      <input
                        type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                      />
                      <label>Логин</label>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div
                      className={classNames("form-field", {
                        hasValue: password != "",
                      })}
                    >
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label>Пароль</label>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-blue"
                  onClick={() => goToLogin()}
                >
                  Войти
                </button>
              </>
            )}
          </div>
        </MainLayout>
      )}
    </>
  )
}

export default GlobalWrapper
