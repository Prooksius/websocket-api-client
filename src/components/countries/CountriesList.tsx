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
  listSearch,
  listFilterChanges,
  setPage,
  setItemsInPage,
  setSearch,
  reloadPage,
  toggleItemPopup,
  setSort,
  setSelected,
  toggleItemOpen,
  closeItemPopups,
  listSort,
  listSelectedIds,
} from "@store/slices/countriesSlice"
import Popuper, { PopupHeaderSlot } from "@components/app/Popuper"
import { SearchEntity } from "@components/app/SearchEntity"
import { PaginationDataGrid } from "@components/app/PaginationDataGrid"
import { PlusIcon } from "@components/app/icons/PlusIcon"
import { DotsIcon } from "@components/app/icons/DotsIcon"

export const CountriesList: React.FC = () => {
  const [editId, setEditId] = useState(0)
  const [editOpened, setEditOpened] = useState(false)

  const [searchParams, setSearchParams] = useSearchParams()

  const dispatch = useDispatch()

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

  const deleteHandler = async (id: number) => {
    const answer = await confirmationAlert("Вы уверены?", "Да", "Отмена")
    if (answer.isConfirmed) {
      //dispatch(deleteProvider(id))
    }
  }

  const archiveHandler = async (id: number) => {
    //dispatch(archiveProvider(id))
  }

  const changeSort = (value: string) => {
    dispatch(setSort(value))
    setEditId(0)
  }

  const changeSelected = (items: number[]) => {
    dispatch(setSelected(items))
  }

  const toggleRecordPopup = (id: number) => {
    dispatch(toggleItemPopup(id))
  }

  const toggleRecordOpen = (id: number) => {
    dispatch(toggleItemOpen(id))
  }
  useEffect(() => {
    const handleClickOutside = () => {
      dispatch(closeItemPopups())
    }

    document.addEventListener("click", handleClickOutside, true)
    return () => {
      document.removeEventListener("click", handleClickOutside, true)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <PaginationDataGrid
        status={status}
        getExpanded={() => ""}
        rowHeight={62}
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
            title: "Флаг",
            width: "1 1",
            getValue: (row) => (
              <img src={"https://proksi-design.ru/" + row.flag} />
            ),
          },
          {
            title: "Название",
            width: "1 1",
            sort: "name",
            sortTitle: "названию",
            getValue: (row) => (
              <a
                className="edit-record-link"
                onClick={() => {
                  setEditId(row.id)
                  setEditOpened(true)
                }}
              >
                {search !== "" && (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: row.name.split(search).join(`<b>${search}</b>`),
                    }}
                  ></span>
                )}
                {!search && row.name}
              </a>
            ),
          },
          {
            title: "Популярность",
            width: "1 1",
            getValue: (row) => row.popularity,
          },
          {
            title: "",
            width: "unset",
            getValue: (row) => (
              <>
                <button
                  type="button"
                  data-tip="Меню редактирования"
                  data-for="for-left"
                  className="btn btn-simple"
                  style={{ height: "30px" }}
                  onClick={() => toggleRecordPopup(row.id)}
                >
                  <DotsIcon />
                </button>
                <div
                  className={classNames([
                    "pagination-tablelist__buttons",
                    { active: row.popup_open },
                  ])}
                >
                  <button
                    type="button"
                    className="btn btn-white"
                    onClick={() => {
                      setEditId(row.id)
                      setEditOpened(true)
                    }}
                  >
                    Редактировать
                  </button>
                  <button
                    type="button"
                    className="btn btn-white"
                    onClick={() => archiveHandler(row.id)}
                  >
                    В архив
                  </button>
                  <button
                    type="button"
                    className="btn btn-white"
                    onClick={() => deleteHandler(row.id)}
                  >
                    Удалить
                  </button>
                </div>
              </>
            ),
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
        <PopupHeaderSlot>
          <h3>{editId ? "Изменить" : "Добавить"} провайдера</h3>
        </PopupHeaderSlot>
        Изменение
      </Popuper>
    </>
  )
}
