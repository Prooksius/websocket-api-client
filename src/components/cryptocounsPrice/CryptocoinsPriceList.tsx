import classNames from "classnames"
import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useSearchParams } from "react-router-dom"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import { toastAlert, formatDateTime, confirmationAlert } from "@config"
import {
  listItems,
  listPage,
  listItemsCount,
  listStatus,
  listItemsInPage,
  listFilterChanges,
  setPage,
  setItemsInPage,
  setSearch,
  reloadPage,
  setSort,
  setSelected,
  listSort,
  listSelectedIds,
  listSearch,
} from "@store/slices/cryptocoinsPriceSlice"
import Popuper, { PopupHeaderSlot } from "@components/app/Popuper"
import { SearchEntity } from "@components/app/SearchEntity"
import { PaginationDataGrid } from "@components/app/PaginationDataGrid"
import { PlusIcon } from "@components/app/icons/PlusIcon"
import { DotsIcon } from "@components/app/icons/DotsIcon"
import type { AppDispatch } from "@store/store"

export const CryptocoinsPriceList: React.FC = () => {
  const [editId, setEditId] = useState(0)
  const [editOpened, setEditOpened] = useState(false)

  const [searchParams, setSearchParams] = useSearchParams()

  const dispatch = useDispatch<AppDispatch>()

  const itemsList = useSelector(listItems)
  const status = useSelector(listStatus)
  const page = useSelector(listPage)
  const sort = useSelector(listSort)
  const selectedIds = useSelector(listSelectedIds)
  const itemsInPage = useSelector(listItemsInPage)
  const search = useSelector(listSearch)
  const filterChanges = useSelector(listFilterChanges)
  const itemsCount = useSelector(listItemsCount)

  const changePage = (value: number) => {
    dispatch(setPage(value))
    setEditId(0)
  }

  const changeItemsInPage = (value: number) => {
    dispatch(setItemsInPage(value))
    setEditId(0)
  }

  const changeSort = (value: string) => {
    dispatch(setSort(value))
    setEditId(0)
  }

  const changeSelected = (items: number[]) => {
    dispatch(setSelected(items))
  }

  return (
    <>
      <PaginationDataGrid
        status={status}
        getExpanded={() => ""}
        rowHeight={67}
        data={itemsList}
        page={page}
        sort={sort}
        setPage={changePage}
        setSort={changeSort}
        setItemsInPage={changeItemsInPage}
        filterChanges={filterChanges}
        reloadPage={() => dispatch(reloadPage())}
        itemsInPage={itemsInPage}
        itemsCount={itemsCount}
        columns={[
          {
            title: "Монета",
            width: "2 1",
            sort: "asset",
            sortTitle: "названию",
            getValue: (row) => (
              <>
                {search !== "" && (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: row.asset.split(search).join(`<b>${search}</b>`),
                    }}
                  ></span>
                )}
                {!search && row.asset}
              </>
            ),
          },
          {
            title: "Курс",
            width: "0.5 1",
            sort: "price",
            sortTitle: "курсу",
            getValue: (row) => row.price,
          },
          {
            title: "Дата",
            width: "0.5 1",
            sort: "created_at",
            sortTitle: "дате",
            getValue: (row) => new Date(row.created_at * 1000).toLocaleString(),
          },
        ]}
        getFilterComponent={() => ""}
      />
      <Popuper
        opened={editOpened}
        closeHandler={() => setEditOpened(false)}
        unmountHandler={null}
        width={"800px"}
        height={undefined}
        contentType={undefined}
      >
        <PopupHeaderSlot>
          <h3>{editId ? "Изменить" : "Добавить"} провайдера</h3>
        </PopupHeaderSlot>
        Изменение
      </Popuper>
    </>
  )
}
