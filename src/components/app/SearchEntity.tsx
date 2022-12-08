import React, { useEffect, useState, useCallback, useRef } from "react"
import debounce from "lodash.debounce"
import classNames from "classnames"

interface SearchProps {
  fetchStatus: string
  search: string
  setSearch: (value: string) => void
}
export const SearchEntity: React.FC<SearchProps> = ({
  fetchStatus,
  search,
  setSearch,
}) => {

  const [localSearch, setLocalSearch] = useState(search)

  // eslint-disable-next-line
  const debouncedSearch = useCallback(
    debounce((value: string) => setSearch(value), 500),
    [localSearch]
  )

  useEffect(() => {
    debouncedSearch(localSearch)
    return debouncedSearch.cancel
    // eslint-disable-next-line
  }, [localSearch, debouncedSearch])

  return (
    <div
      className="search__entity"
      data-tip={"Начните вбивать название"}
      data-for="for-top"
    >
      <div className="search__entity-form form-field">
        <input
          type="text"
          size={25}
          value={localSearch}
          //          onFocus={doSearch}
          onChange={(event) => setLocalSearch(event.target.value)}
          placeholder="Поиск"
        />
      </div>
    </div>
  )
}
