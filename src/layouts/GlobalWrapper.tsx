import React, { useEffect, useState } from "react"
import { useSearchParams, useNavigate, Navigate } from "react-router-dom"
import MainLayout from "@layouts/MainLayout"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch } from "@store/store"
import { listState as listCountriesState } from "@store/slices/countriesSlice"
import { listState as listBotsState } from "@store/slices/botsSlice"
import { listState as listCoinsState } from "@store/slices/cryptocoinsPriceSlice"
import {
  isLogged,
  listAuthStatus,
  startAuth,
  login as customerLogin,
} from "@store/slices/customersSlice"
import classNames from "classnames"
import {
  listConnected,
  sendRequest,
  startConnecting,
} from "@store/slices/globalsSlice"

type EnitiyParamsDetails = {
  page: number
  sort: string
  itemsInPage: number
  filterChanges: number
}

const PAGE_TITLE = "Вход"

interface EnitiyParamsData extends Record<string, EnitiyParamsDetails> {
  [key: string]: EnitiyParamsDetails
}

const GlobalWrapper: React.FC = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")

  const countries = useSelector(listCountriesState)
  const bots = useSelector(listBotsState)
  const cryptocoinsPrice = useSelector(listCoinsState)
  const connected = useSelector(listConnected)

  const logged = useSelector(isLogged)
  const loggedStatus = useSelector(listAuthStatus)

  const enitiyParams: EnitiyParamsData = {
    country: {
      page: countries.page,
      sort: countries.sort,
      itemsInPage: countries.itemsInPage,
      filterChanges: countries.filterChanges,
    },
    bot: {
      page: bots.page,
      sort: bots.sort,
      itemsInPage: bots.itemsInPage,
      filterChanges: bots.filterChanges,
    },
    cryptocoin_price: {
      page: cryptocoinsPrice.page,
      sort: cryptocoinsPrice.sort,
      itemsInPage: cryptocoinsPrice.itemsInPage,
      filterChanges: cryptocoinsPrice.filterChanges,
    },
  }

  const requestEntityList = (entity: string, method: string) => {
    if (connected) {
      dispatch(
        sendRequest({
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

  const goToLogin = () => {
    dispatch(startAuth())
    dispatch(
      sendRequest({
        entity: "customer",
        method: "login",
        params: { login, password },
      })
    )
  }
  useEffect(() => {
    dispatch(startConnecting())
    const token = localStorage.getItem("token")
    if (token) dispatch(customerLogin(token))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (logged) {
      setLogin("")
      setPassword("")
    }
    // eslint-disable-next-line
  }, [logged])

  useEffect(() => {
    if (enitiyParams.country.filterChanges) requestEntityList("country", "list")
    // eslint-disable-next-line
  }, [enitiyParams.country.filterChanges])

  useEffect(() => {
    if (enitiyParams.bot.filterChanges) requestEntityList("bot", "list")
    // eslint-disable-next-line
  }, [enitiyParams.bot.filterChanges])

  useEffect(() => {
    if (enitiyParams.cryptocoin_price.filterChanges)
      requestEntityList("cryptocoin_price", "list")
    // eslint-disable-next-line
  }, [enitiyParams.cryptocoin_price.filterChanges])

  return (
    <>
      {logged && connected && children}
      {(!logged || (logged && !connected)) && (
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
