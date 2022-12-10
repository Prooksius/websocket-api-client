import Home from "@pages/Home"
import About from "@pages/About"
import NotFound from "@pages/NotFound"
import { UsersIcon } from "@components/app/icons/UsersIcon"
import { ServersIcon } from "@components/app/icons/ServersIcon"
import { DomainsIcon } from "@components/app/icons/DomainsIcon"
import { OfferLinksIcon } from "@components/app/icons/OfferLinksIcon"
import { ErrorsIcon } from "@components/app/icons/ErrorsIcon"
import { FC } from "react"
import Bots from "@pages/Bots"
import Countries from "@pages/Countries"
import Customer from "@pages/Customer"

interface RouteItem {
  path: string
  name: string
  Icon: FC | null
  Component: FC
  navShown: boolean
  auth: boolean
  subRoutes: RouteItem[]
}

export const routes: RouteItem[] = [
  {
    path: "/",
    name: "Вход",
    Icon: UsersIcon,
    Component: Home,
    navShown: true,
    auth: false,
    subRoutes: [],
  },
  {
    path: "/bots",
    name: "Лицензии",
    Icon: UsersIcon,
    Component: Bots,
    navShown: true,
    auth: true,
    subRoutes: [],
  },
  {
    path: "/countries",
    name: "Страны",
    Icon: ServersIcon,
    Component: Countries,
    navShown: true,
    auth: true,
    subRoutes: [],
  },
  {
    path: "/customer",
    name: "Кабинет",
    Icon: DomainsIcon,
    Component: Customer,
    navShown: true,
    auth: true,
    subRoutes: [],
  },
  {
    path: "*",
    name: "404",
    Icon: null,
    Component: NotFound,
    navShown: false,
    auth: false,
    subRoutes: [],
  },
]
