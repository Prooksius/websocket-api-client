import React from "react"
import { Navigate } from "react-router-dom"
import MainLayout from "@layouts/MainLayout"

const PAGE_TITLE = "Вход"

const Home: React.FC = () => {
  return (
    <MainLayout title={PAGE_TITLE} h1={PAGE_TITLE}>
      <Navigate to={"/countries"} />
    </MainLayout>
  )
}

export default Home
