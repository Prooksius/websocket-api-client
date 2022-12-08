import React from "react"
import { useLocation, useNavigate } from "react-router-dom"

interface queryRets {
  route: string
  query: URLSearchParams
}

function useQuery(): queryRets {
  // Use the URLSearchParams API to extract the query parameters
  // useLocation().search will have the query parameters eg: ?foo=bar&a=b
  const loc = useLocation()
  return { route: loc.pathname, query: new URLSearchParams(loc.search) }
}

const About: React.FC = () => {
  const navigate = useNavigate()
  const { route, query } = useQuery()

  const clickHandler = () => {
    navigate("/about?user=345")
  }
  return (
    <div className="page-contents">
      Путь: {route}
      <br></br>
      Параметр user: {query.get("user")}
      <h1>About Page</h1>
      <button type="button" onClick={clickHandler}>
        Go to user 345
      </button>
    </div>
  )
}

export default About
