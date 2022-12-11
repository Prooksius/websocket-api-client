import { ServerRequestContext } from "@components/app/hooks/serverRequestContext"
import React, { useContext, useEffect } from "react"
import { useSelector } from "react-redux"
import { listCustomer } from "@store/slices/customersSlice"

const CustomerDetails: React.FC = () => {
  const { serverRequestData, setServerRequest, clearServerRequest } =
    useContext(ServerRequestContext)

  const customer = useSelector(listCustomer)

  useEffect(() => {
    if (!customer) {
      setServerRequest({
        entity: "customer",
        method: "identity",
        params: {},
        token: localStorage.getItem("token"),
      })
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      {customer && (
        <>
          <p>
            Логин: <b>{customer.login}</b>
          </p>
          <p>
            Имя: <b>{customer.name}</b>
          </p>
          <p>
            Email: <b>{customer.email}</b>
          </p>
        </>
      )}
    </div>
  )
}

export default CustomerDetails
