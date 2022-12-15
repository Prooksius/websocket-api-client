import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { listCustomer } from "@store/slices/customersSlice"
import { AppDispatch } from "@store/store"
import { sendRequest } from "@store/slices/globalsSlice"

const CustomerDetails: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  const customer = useSelector(listCustomer)

  useEffect(() => {
    if (!customer) {
      dispatch(
        sendRequest({
          entity: "customer",
          method: "identity",
          params: {},
          token: localStorage.getItem("token"),
        })
      )
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
