import classNames from "classnames"
import React, { CSSProperties, ReactNode, useEffect, useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import PaginationList, { HeaderSlot } from "@components/app/PaginationList"
import range from "lodash.range"
import { StatusType } from "./forms/formWrapper/types"
import { UnmountClosed } from "react-collapse"
import { SortIcon } from "./icons/SortIcon"
import ReactTooltip from "react-tooltip"
import { listTooltipShow, setTootipShow } from "@store/slices/globalsSlice"
import { useSelector, useDispatch } from "react-redux"

type ColumnData<T> = {
  title: string
  width: string
  sort?: string
  sortTitle?: string
  display?: CSSProperties["display"]
  direction?: CSSProperties["flexDirection"]
  align?: CSSProperties["alignItems"]
  justify?: CSSProperties["justifyContent"]
  gap?: CSSProperties["gap"]
  getValue: (row: T) => string | ReactNode
}

interface PaginationDataGridProps<T> {
  data: T[]
  status: StatusType
  filterChanges: number
  page: number
  setPage: (page: number) => void
  setItemsInPage: (pitemsInPageage: number) => void
  itemsInPage: number
  itemsCount: number
  sort?: string
  setSort?: (sort: string) => void
  selectColumn?: boolean
  selectedIds?: number[]
  setSelected?: (ids: number[]) => void
  columns: ColumnData<T>[]
  rowHeight?: number
  reloadPage: () => void
  getFilterComponent: () => string | ReactNode
  getExpanded: (row: T) => string | ReactNode
}

const useQuery = () => {
  // Use the URLSearchParams API to extract the query parameters
  // useLocation().search will have the query parameters eg: ?foo=bar&a=b
  const loc = useLocation()
  return { route: loc.pathname, query: new URLSearchParams(loc.search) }
}

export const PaginationDataGrid = <T extends Record<string, any>>({
  data,
  status,
  filterChanges,
  page = 1,
  setPage,
  setItemsInPage,
  itemsInPage,
  itemsCount,
  sort = "default",
  setSort,
  selectColumn = false,
  selectedIds = [],
  setSelected = null,
  columns,
  rowHeight,
  reloadPage,
  getFilterComponent,
  getExpanded,
}: PaginationDataGridProps<T>) => {
  const emptyItemsCount = range(Math.max(data.length, 2))

  const { route, query } = useQuery()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const tooltipShow = useSelector(listTooltipShow)

  const [sorting, setSorting] = useState<boolean>(false)

  const setSortHandler = (value: string) => {
    setSorting(true)
    dispatch(setTootipShow(false))
    if (value) query.set("sort", value)
    else query.delete("sort")
    navigate(`${route}?${query.toString()}`)
    setSort(value)
    setSelected && setSelected([])
  }

  const setPageHandler = (value: number) => {
    setPage(value)
    setSelected && setSelected([])
  }

  const setItemsInPageHandler = (value: number) => {
    setItemsInPage(value)
    setSelected && setSelected([])
  }

  const tooltipOn = () => {
    if (!tooltipShow) {
      dispatch(setTootipShow(true))
    }
  }

  useEffect(() => {
    tooltipOn()
    ReactTooltip.rebuild()
  })

  useEffect(() => {
    setTimeout(() => {
      setSorting(false)
    }, 100)
  }, [sort])

  useEffect(() => {
    if (query.get("page") && +query.get("page") !== page) {
      setPage(+query.get("page"))
    } else if (!query.get("page")) {
      setPage(1)
    }
    if (setSort) {
      if (query.get("sort") && query.get("sort") !== sort) {
        setSortHandler(query.get("sort"))
      } else if (!query.get("sort")) {
        setSortHandler("")
      }
    }

    tooltipOn()
    setSorting(false)

    if (status === "idle" && !filterChanges) reloadPage()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <PaginationList
        title={"Список провайдеров"}
        loadedPage={+page}
        listStatus={status}
        pushState={true}
        containerClass={"notes-container"}
        listClass={"notes-list"}
        itemsCount={itemsCount}
        itemsInPage={itemsInPage}
        pageChangedCallback={(value: number) => setPageHandler(value)}
        itemsInPageChangedCallback={(value: number) =>
          setItemsInPageHandler(value)
        }
      >
        <HeaderSlot>{getFilterComponent()}</HeaderSlot>
        <div className="pagination-tablelist">
          <div className="pagination-tablelist__part pagination-tablelist__thead">
            <div className="pagination-tablelist__row-th">
              {selectColumn && (
                <div className="pagination-tablelist__th select-all-td">
                  <div
                    className="checkbox"
                    style={{ marginBottom: 0, marginLeft: "1px" }}
                  >
                    <div className="checkbox-inner">
                      <input
                        type="checkbox"
                        data-tip="Выбрать записи"
                        data-for="for-sort"
                        ref={(input) => {
                          if (input) {
                            input.indeterminate =
                              selectedIds.length > 0 &&
                              data.length > selectedIds.length
                          }
                        }}
                        checked={data.length === selectedIds.length}
                        onChange={(e) =>
                          setSelected(
                            e.target.checked
                              ? data.map((dataItem) => dataItem.id)
                              : []
                          )
                        }
                      />
                      <i></i>
                    </div>
                  </div>
                </div>
              )}
              {columns.map((column, index) => {
                const direction =
                  sort && sort.replace("-", "") === column.sort
                    ? Array.from(sort)[0] === "-"
                      ? ""
                      : "(убыв)"
                    : "(возр)"
                return (
                  <div
                    key={index + "-" + column.title}
                    className={classNames(
                      "pagination-tablelist__th",
                      { "button-td": column.width === "unset" },
                      { "sort-column": column.sort }
                    )}
                    style={{ flex: column.width }}
                  >
                    <span
                      style={{ pointerEvents: sorting ? "none" : "all" }}
                      data-tip={
                        column.sort &&
                        (direction
                          ? "Сортировать по "
                          : "Отменить сортировку по ") +
                          column.sortTitle +
                          " " +
                          direction
                      }
                      data-for="for-sort"
                      onClick={
                        column.sort &&
                        setSort &&
                        (() =>
                          setSortHandler(
                            (sort === "" ||
                            Array.from(sort)[0] === "-" ||
                            sort.replace("-", "") !== column.sort
                              ? ""
                              : "-") +
                              (Array.from(sort)[0] === "-" &&
                              sort.replace("-", "") === column.sort
                                ? ""
                                : column.sort)
                          ))
                      }
                    >
                      {column.title}
                      {column.sort && sort.replace("-", "") === column.sort && (
                        <SortIcon
                          order={Array.from(sort)[0] === "-" ? "DESC" : "ASC"}
                        />
                      )}
                      {column.sort && sort.replace("-", "") !== column.sort && (
                        <SortIcon />
                      )}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="pagination-tablelist__part pagination-tablelist__tbody">
            {status === "succeeded" &&
              data.length > 0 &&
              data.map((item) => (
                <div
                  key={item.id}
                  className={classNames(
                    "pagination-tablelist__row",
                    { open: item.record_open },
                    { edited: item.popup_open }
                  )}
                >
                  <div className="pagination-tablelist__row-up">
                    {selectColumn && (
                      <div className="pagination-tablelist__td select-all-td">
                        <div className="checkbox" style={{ marginBottom: 0 }}>
                          <div className="checkbox-inner">
                            <input
                              type="checkbox"
                              checked={selectedIds.indexOf(item.id) > -1}
                              onChange={(e) =>
                                setSelected(
                                  e.target.checked
                                    ? [
                                        ...selectedIds.filter(
                                          (selectedItem) =>
                                            selectedItem !== item.id
                                        ),
                                        item.id,
                                      ]
                                    : selectedIds.filter(
                                        (selectedItem) =>
                                          selectedItem !== item.id
                                      )
                                )
                              }
                            />
                            <i></i>
                          </div>
                        </div>
                      </div>
                    )}
                    {columns.map((column, index) => (
                      <div
                        key={index + "-" + column.title + "row" + item.id}
                        className={classNames("pagination-tablelist__td", {
                          "button-td": column.width === "unset",
                        })}
                        style={{
                          flex: column.width,
                          display: column.display ? column.display : "flex",
                          flexDirection: column.direction
                            ? column.direction
                            : "row",
                          alignItems: column.align ? column.align : "center",
                          justifyContent: column.justify
                            ? column.justify
                            : "flex-start",
                          gap: column.gap ? column.gap : 0,
                        }}
                      >
                        {column.getValue(item)}
                      </div>
                    ))}
                  </div>
                  <UnmountClosed isOpened={item.record_open}>
                    {getExpanded(item)}
                  </UnmountClosed>
                </div>
              ))}
            {status === "succeeded" && data.length === 0 && (
              <div className="pagination-tablelist__row">
                <div className="pagination-tablelist__td">
                  Записей не найдено
                </div>
              </div>
            )}
            {status === "loading" &&
              emptyItemsCount.map((emptyItem) => (
                <div
                  key={emptyItem}
                  className="pagination-tablelist__row skeleton-box loading"
                >
                  <div
                    className="pagination-tablelist__row-up"
                    style={{ height: `${rowHeight || 67}px` }}
                  >
                    {columns.map((column, index) => (
                      <div
                        key={emptyItem + "-" + index}
                        className={classNames("pagination-tablelist__td", {
                          "button-td": column.width === "unset",
                        })}
                        style={{ flex: column.width }}
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </PaginationList>
      {tooltipShow && (
        <>
          <ReactTooltip id="for-bottom" effect="solid" place="bottom" />
          <ReactTooltip id="for-top" effect="solid" place="top" />
          <ReactTooltip id="for-left" effect="solid" place="left" />
          <ReactTooltip id="for-sort" effect="solid" place="top" />
        </>
      )}
    </>
  )
}
