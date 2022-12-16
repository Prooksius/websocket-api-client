import React, { useEffect } from "react"
import { CryptocoinsPriceList } from "@components/cryptocounsPrice/CryptocoinsPriceList"
import MainLayout from "@layouts/MainLayout"

const PAGE_TITLE = "Монеты"

const CryptocoinsPrice: React.FC = () => {
  return (
    <MainLayout title={PAGE_TITLE} h1={PAGE_TITLE}>
      <div className="page-contents">
        <CryptocoinsPriceList />
      </div>
    </MainLayout>
  )
}

export default CryptocoinsPrice
