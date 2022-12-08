import React from "react"
import { BotsList } from "@components/bots/BotsList"

const PAGE_TITLE = "Почты"

const Bots: React.FC = () => {
  return <div className="subpage-contents">
    <BotsList />
  </div>
}

export default Bots
