import React from "react"
import MainLayout from "@layouts/MainLayout"
import CustomerDetails from "@components/customer/CustomerDetails"

const PAGE_TITLE = "Пользователь"

const Customer: React.FC = () => {
  return (
    <MainLayout title={PAGE_TITLE} h1={PAGE_TITLE}>
      <div className="page-contents">
        <CustomerDetails />
      </div>
    </MainLayout>
  )
}

export default Customer
