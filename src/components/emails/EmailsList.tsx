import classNames from "classnames"
import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { confirmationAlert, formatDateTime, toastAlert } from "@config"
import {
  listEmails,
  archiveEmail,
  deleteEmail,
  listEmailsPage,
  listEmailsItemsCount,
  listEmailsStatus,
  listEmailsSort,
  listEmailsItemsInPage,
  listEmailsFilter,
  listEmailsFilterChanges,
  listEmailsSearch,
  listEmailsSelectedIds,
  setPage,
  setSort,
  setSearch,
  setFilter,
  setItemsInPage,
  setSelected,
  toggleEmailOpen,
  toggleEmailPopup,
  closeEmailPopups,
  reloadPage,
  EmailsRecord,
} from "@store/slices/countriesSlice"
import { DotsIcon } from "@components/app/icons/DotsIcon"
import { PlusIcon } from "@components/app/icons/PlusIcon"
import Popuper, { PopupHeaderSlot } from "@components/app/Popuper"
import { EmailsFilter } from "./EmailsFilter"
import { EmailEditForm } from "./EmailEditForm"
import { SearchEntity } from "@components/app/SearchEntity"
import { EyeIcon } from "@components/app/icons/EyeIcon"
import { PaginationDataGrid } from "@components/app/PaginationDataGrid"
import { MinusIcon } from "@components/app/icons/MinusIcon"

export const EmailsList: React.FC = () => {
  const [editId, setEditId] = useState(0)
  const [editOpened, setEditOpened] = useState(false)

  const dispatch = useDispatch()

  const items = useSelector(listEmails)

  const status = useSelector(listEmailsStatus)
  const page = useSelector(listEmailsPage)
  const sort = useSelector(listEmailsSort)
  const itemsInPage = useSelector(listEmailsItemsInPage)
  const search = useSelector(listEmailsSearch)
  const filter = useSelector(listEmailsFilter)
  const filterChanges = useSelector(listEmailsFilterChanges)
  const itemsCount = useSelector(listEmailsItemsCount)
  const selectedIds = useSelector(listEmailsSelectedIds)

  const deleteHandler = async (id: number) => {
    const answer = await confirmationAlert("Вы уверены?", "Да", "Отмена")
    if (answer.isConfirmed) {
      dispatch(deleteEmail(id))
    }
  }

  /*
  const num = 10
  let str = ""
  for (let i = 0; i < num; i++) {
    str = ""
    for (let j = 0; j < num; j++) {
      if (
        i === 0 ||
        j === 0 ||
        i === num-1 ||
        j === num-1 ||
        i === j ||
        i === num-j-1
      )
        str += "#"
      else str += "-"
    }
    console.log(i + "-" + str)
  }
  */

  const archiveHandler = async (id: number) => {
    dispatch(archiveEmail(id))
  }

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

  const toggleRecordPopup = (id: number) => {
    dispatch(toggleEmailPopup(id))
  }

  const toggleRecordOpen = (id: number) => {
    dispatch(toggleEmailOpen(id))
  }

  useEffect(() => {
    const handleClickOutside = () => {
      dispatch(closeEmailPopups())
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
        data={items}
        page={page}
        sort={sort}
        setPage={changePage}
        setItemsInPage={changeItemsInPage}
        setSort={changeSort}
        selectColumn
        selectedIds={selectedIds}
        setSelected={changeSelected}
        filterChanges={filterChanges}
        reloadPage={() => dispatch(reloadPage())}
        itemsInPage={itemsInPage}
        itemsCount={itemsCount}
        columns={[
          {
            title: "E-mail",
            width: "2 1",
            sort: "email_addr",
            sortTitle: "Email адресу",
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
                      __html: row.email_addr
                        .split(search)
                        .join(`<b>${search}</b>`),
                    }}
                  ></span>
                )}
                {!search && row.email_addr}
              </a>
            ),
          },
          {
            title: "Пароль",
            width: "1 1",
            getValue: (row) => (
              <>
                {row.record_open && row.password}
                {!row.record_open && "**********"}
                &nbsp;
                <button
                  type="button"
                  data-tip={
                    (row.record_open ? "Скрыть" : "Показать") + " пароль"
                  }
                  data-for="for-top"
                  className="btn btn-simple"
                  onClick={() => toggleRecordOpen(row.id)}
                >
                  <EyeIcon open={row.record_open} />
                </button>
              </>
            ),
          },
          {
            title: "Добавлен",
            width: "1 1",
            sort: "date",
            sortTitle: "дате создания",
            getValue: (row) => (
              <>
                {row.created_at &&
                  row.created_at !== "None" &&
                  formatDateTime(row.created_at, "datetime")}
              </>
            ),
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
        getFilterComponent={() => (
          <div className="filter-container filter-container__domains">
            <div className="filter-container__part">
              <SearchEntity
                fetchStatus={status}
                search={search}
                setSearch={(value) => dispatch(setSearch(value))}
              />
              <EmailsFilter />
              {selectedIds.length > 0 && (
                <div className="add-record__container">
                  <button
                    type="button"
                    data-tip="Удалить выбранное"
                    data-for="for-left"
                    className="btn btn-red btn-line"
                    onClick={() => {
                      // удаление выбранного в selectedIds
                    }}
                  >
                    <span>Удалить выбранное</span>
                    <MinusIcon />
                  </button>
                </div>
              )}
              <div className="add-record__container">
                <button
                  type="button"
                  data-tip="Создать новую почту"
                  data-for="for-left"
                  className="btn btn-blue btn-line"
                  onClick={() => {
                    setEditId(null)
                    setEditOpened(true)
                  }}
                >
                  <span>Добавить</span>
                  <PlusIcon />
                </button>
              </div>
            </div>
          </div>
        )}
      />
      <Popuper
        opened={editOpened}
        closeHandler={() => setEditOpened(false)}
        unmountHandler={() => setEditId(0)}
        width={"650px"}
        height={undefined}
        contentType={undefined}
      >
        <PopupHeaderSlot>
          <h3>{editId ? "Изменить" : "Добавить"} почту</h3>
        </PopupHeaderSlot>
        <EmailEditForm
          id={editId}
          onDoneCallback={() => {
            setTimeout(() => {
              setEditOpened(false)
            }, 200)
          }}
        />
      </Popuper>
    </>
  )
}
