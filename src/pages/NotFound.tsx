import React from "react"
import MainLayout from "@layouts/MainLayout"

const PAGE_TITLE = "Страница не найдена"

const NotFound: React.FC = () => {
  return (
    <MainLayout title={PAGE_TITLE} h1={PAGE_TITLE}>
      <div className="page-contents">Такой страницы нет на сайте</div>
    </MainLayout>
  )
}

export default NotFound
