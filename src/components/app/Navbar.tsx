import React from "react"
import { NavLink } from "react-router-dom"
import { routes } from "@router/routes"
import { useSelector } from "react-redux"
import { isLogged } from "@store/slices/customersSlice"

export const Navbar: React.FC = () => {
  const logged = useSelector(isLogged)

  return (
    <nav className="app-navbar">
      <ul>
        {logged &&
          routes
            .filter((route) => route.navShown === true && route.auth === true)
            .map(({ path, name, Icon, auth }) => (
              <li key={path} className="app-navbar__link">
                <NavLink to={path}>
                  <span className="app-navbar__link-icon" title={name}>
                    <Icon />
                  </span>
                  <span className="app-navbar__link-title">{name}</span>
                </NavLink>
              </li>
            ))}
        {!logged &&
          routes
            .filter((route) => route.navShown === true && route.auth === false)
            .map(({ path, name, Icon, auth }) => (
              <li key={path} className="app-navbar__link">
                <NavLink to={path}>
                  <span className="app-navbar__link-icon" title={name}>
                    <Icon />
                  </span>
                  <span className="app-navbar__link-title">{name}</span>
                </NavLink>
              </li>
            ))}
      </ul>
    </nav>
  )
}
