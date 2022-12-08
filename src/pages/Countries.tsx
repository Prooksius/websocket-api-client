import React, { useEffect } from "react"
import { CountriesList } from "@components/countries/CountriesList"

const PAGE_TITLE = "Страны"

const Countries: React.FC = () => {
  return (
    <div className="subpage-contents">
      <CountriesList />
    </div>
  )
}

export default Countries
