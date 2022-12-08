import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import MainLayout from "@layouts/MainLayout"
import { NavLink, Outlet } from "react-router-dom"

const PAGE_TITLE = "Аккаунты"

const AccountsPage: React.FC = () => {
  return (
    <MainLayout title={PAGE_TITLE} h1={PAGE_TITLE}>
      <div className="page-contents">
        <div className="filter-container">
          <div className="filter-container__part type-select">
            <NavLink to={"accounts"} className="btn btn-radio">
              Аккаунты
            </NavLink>
            <NavLink to={"emails"} className="btn btn-radio">
              Почты
            </NavLink>
            <NavLink to={"providers"} className="btn btn-radio">
              Провайдеры
            </NavLink>
          </div>
        </div>
        <Outlet />
      </div>
    </MainLayout>
  )
}

export default AccountsPage
