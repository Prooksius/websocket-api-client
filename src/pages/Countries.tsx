import React, { useEffect } from "react"
import { CountriesList } from "@components/countries/CountriesList"
import MainLayout from "@layouts/MainLayout"

const PAGE_TITLE = "Страны"

const Countries: React.FC = () => {
  return (
    <MainLayout title={PAGE_TITLE} h1={PAGE_TITLE}>
      <div className="page-contents">
        <CountriesList />
      </div>
    </MainLayout>
  )
}

export default Countries
