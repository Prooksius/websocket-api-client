import React, { useContext, useEffect, useState } from "react"
import { useSearchParams, useNavigate, Navigate } from "react-router-dom"
import MainLayout from "@layouts/MainLayout"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch } from "@store/store"
import {
  isLogged,
  listAuthStatus,
  startAuth,
} from "@store/slices/customersSlice"
import { REACT_APP_API_URL, toastAlert } from "@config"
import classNames from "classnames"
import useWebsocketsHandler from "@components/app/hooks/useWebsocketHandler"
import { listConnected } from "@store/slices/globalsSlice"
import { ServerRequestContext } from "@components/app/hooks/serverRequestContext"

const PAGE_TITLE = "Вход"

const GlobalWrapper: React.FC = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const { serverRequestData, setServerRequest, clearServerRequest } =
    useContext(ServerRequestContext)

  useWebsocketsHandler(REACT_APP_API_URL)

  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")

  const connected = useSelector(listConnected)

  const logged = useSelector(isLogged)
  const loggedStatus = useSelector(listAuthStatus)

  const goToLogin = () => {
    dispatch(startAuth())
    setServerRequest({
      entity: "customer",
      method: "login",
      params: { login, password },
    })
  }
  useEffect(() => {
    if (logged) {
      setLogin("")
      setPassword("")
    }
    // eslint-disable-next-line
  }, [logged])

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
