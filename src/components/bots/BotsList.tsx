import classNames from "classnames"
import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useSearchParams } from "react-router-dom"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import { toastAlert } from "@config"
import {
  listItems,
  listPage,
  listItemsCount,
  listStatus,
  listItemsInPage,
  listFilterChanges,
  setPage,
  setItemsInPage,
  toggleOpen,
  reloadPage,
} from "@store/slices/botsSlice"
import type { BotsRecord } from "@store/slices/botsSlice"
import { CaretIcon } from "@components/app/icons/CaretIcon"
import PaginationList, { HeaderSlot } from "@components/app/PaginationList"
import Popuper from "@components/app/Popuper"
import { DataGrid } from "@components/app/DataGrid"
import { PaginationDataGrid } from "@components/app/PaginationDataGrid"

export const BotsList: React.FC = () => {
  const [editId, setEditId] = useState(0)
  const [editOpened, setEditOpened] = useState(false)

  const [searchParams, setSearchParams] = useSearchParams()

  const dispatch = useDispatch()

  const itemsList = useSelector(listItems)
  const status = useSelector(listStatus)
  const page = useSelector(listPage)
  const itemsInPage = useSelector(listItemsInPage)
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

  const toggleRecordOpen = (id: number) => {
    dispatch(toggleOpen(id))
  }

  return (
    <>
      <PaginationDataGrid
        status={status}
        getExpanded={() => (
          <div className="pagination-tablelist__row-down with-button-td">
            <div className="pagination-tablelist__info">
              <span className="title">Какой-то заголовок</span>
              <span className="value">Какой-то текст</span>
            </div>
            <div className="pagination-tablelist__info">
              <span className="title">Какой-то заголовок</span>
              <span className="value">Какой-то текст</span>
            </div>
            <div className="pagination-tablelist__info">
              <span className="title">Какой-то заголовок</span>
              <span className="value">
                Какой-то текст
                <br />
                Какой-то текст
                <br />
                Какой-то текст <br />
                Какой-то текст
              </span>
            </div>
            <div className="pagination-tablelist__info">
              <span className="title">Какой-то заголовок</span>
              <span className="value">Какой-то текст</span>
            </div>
          </div>
        )}
        rowHeight={62}
        data={itemsList}
        page={page}
        setPage={changePage}
        setItemsInPage={changeItemsInPage}
        filterChanges={filterChanges}
        reloadPage={() => dispatch(reloadPage())}
        itemsInPage={itemsInPage}
        itemsCount={itemsCount}
        columns={[
          {
            title: "",
            width: "unset",
            getValue: (row) => (
              <button
                type="button"
                className="btn btn-simple"
                onClick={() => toggleRecordOpen(row.id)}
              >
                <CaretIcon open={row.record_open} />
              </button>
            ),
          },
          {
            title: "Флаг",
            width: "0.5 1",
            getValue: (row) => (
              <img
                src={"https://proksi-design.ru" + row.image}
                style={{ maxHeight: "20px" }}
              />
            ),
          },
          {
            title: "Название",
            width: "2 1",
            getValue: (row) => row.name,
          },
          {
            title: "Состояние",
            width: "0.5 1",
            getValue: (row) => row.status,
          },
          {
            title: "Уровень",
            width: "1 1",
            getValue: (row) => row.level,
          },
        ]}
        getFilterComponent={() => ""}
      />
      <Popuper
        opened={editOpened}
        closeHandler={() => setEditOpened(false)}
        unmountHandler={() => setEditId(0)}
        width={"800px"}
        height={undefined}
        contentType={undefined}
      >
        <h3>Изменение</h3>
      </Popuper>
    </>
  )
}
