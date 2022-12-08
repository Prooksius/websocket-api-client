import React from "react"
import MainLayout from "@layouts/MainLayout"

const PAGE_TITLE = "Пользователь"

const Customer: React.FC = () => {
  return (
    <MainLayout title={PAGE_TITLE} h1={PAGE_TITLE}>
      <div className="page-contents">Тут буду я</div>
    </MainLayout>
  )
}

export default Customer
