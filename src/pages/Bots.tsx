import React from "react"
import { BotsList } from "@components/bots/BotsList"
import MainLayout from "@layouts/MainLayout"

const PAGE_TITLE = "Почты"

const Bots: React.FC = () => {
  return (
    <MainLayout title={PAGE_TITLE} h1={PAGE_TITLE}>
      <div className="page-contents">
        <BotsList />
      </div>
    </MainLayout>
  )
}

export default Bots
