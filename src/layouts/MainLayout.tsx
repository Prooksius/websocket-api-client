import React, { useEffect, useState } from "react"
import { Navbar } from "@components/app/Navbar"
import { APP_TITLE } from "@config"
import { Helmet } from "react-helmet-async"
import classNames from "classnames"
import { SignOut } from "@components/app/icons/SignOut"
import { useDispatch, useSelector } from "react-redux"
import { isLogged, logout } from "@store/slices/customersSlice"

interface MainLayoutProps {
  title: string
  h1: string
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title, h1 }) => {
  const dispatch = useDispatch()
  const [sidebarWidth, setSidebarWidth] = useState(true)

  const logged = useSelector(isLogged)

  const toggleSidebar = () => {
    const wide = !sidebarWidth

    setSidebarWidth(wide)
  }

  const doLogout = () => {
    localStorage.removeItem("token")
    dispatch(logout())
  }

  return (
    <>
      <Helmet>
        <title>
          {title} | {APP_TITLE}
        </title>
      </Helmet>
      <div className="app-container">
        <div
          className={classNames(["app-sidebar", { collapsed: !sidebarWidth }])}
        >
          <div className="app-sidebar__container">
            <div className="app-title">
              <span className="app-title__title">{APP_TITLE}</span>
              <span
                className="app-title__sidebar-toggle"
                onClick={toggleSidebar}
              >
                <svg
                  width="11"
                  height="19"
                  viewBox="0 0 11 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.625 17.3125L1.8125 9.5L9.625 1.6875"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
            <Navbar />
          </div>
        </div>
        <div className="page-container">
          <div className="page-title">
            <h1 className="page-title__h1">{h1}</h1>
            {logged && (
              <button
                type="button"
                className="header-out-btn"
                onClick={() => doLogout()}
              >
                <span>Выход</span>
                <SignOut />
              </button>
            )}
          </div>
          {children}
        </div>
      </div>
    </>
  )
}

export default MainLayout
