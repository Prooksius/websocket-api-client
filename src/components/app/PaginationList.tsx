import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { createSlot } from "react-slotify"
import classNames from "classnames"
import { Loader } from "@components/app/Loader"
import ReactPaginate from "react-paginate"
import Select from "react-select"
import { useNavigate, useLocation } from "react-router-dom"
import { CaretLeftIcon } from "./icons/CaretLeftIcon"
import { CaretRightIcon } from "./icons/CaretRightIcon"

export const HeaderSlot = createSlot()
export const SortSlot = createSlot()
export const FooterSlot = createSlot()

const useQuery = () => {
  // Use the URLSearchParams API to extract the query parameters
  // useLocation().search will have the query parameters eg: ?foo=bar&a=b
  const loc = useLocation()
  return { route: loc.pathname, query: new URLSearchParams(loc.search) }
}

interface PaginationListProps {
  title: string | null
  listStatus: string | null
  itemsInPage: number
  itemsInPageList?: number[]
  loadedPage: number
  pushState: boolean
  containerClass: string
  listClass: string
  itemsCount: number
  pageChangedCallback(page: number): void
  itemsInPageChangedCallback(itemsInPage: number): void
}

interface PayloadProps {
  selected: number
}

const PaginationList: React.FC<PaginationListProps> = ({
  itemsInPageList = [10, 25, 50],
  ...props
}) => {
  const { route, query } = useQuery()
  const totalPages = Math.ceil(props.itemsCount / props.itemsInPage)

  const navigate = useNavigate()

  // Invoke when user click to request another page.
  const handlePageClick = (payload: PayloadProps) => {
    const newPage = payload.selected + 1
    if (props.loadedPage !== newPage) {
      //      console.log(`User requested page number ${newPage}`)
      if (props.pushState) {
        if (newPage !== 1) query.set("page", String(newPage))
        else query.delete("page")
        navigate(`${route}?${query.toString()}`)
      }
      if (props.pageChangedCallback) props.pageChangedCallback(+newPage)
    }
  }

  return (
    <>
      <div className={classNames(props.containerClass, "items-container")}>
        <HeaderSlot.Renderer childs={props.children}>
          {props.title !== "" && <h3>{props.title}</h3>}
        </HeaderSlot.Renderer>
        <SortSlot.Renderer childs={props.children} />
        {props.children}
        {totalPages > 1 && (
          <div className="pagination-container">
            <ReactPaginate
              breakLabel="…"
              nextLabel={<CaretRightIcon />}
              forcePage={props.loadedPage - 1}
              disableInitialCallback={true}
              onPageChange={handlePageClick}
              pageRangeDisplayed={7}
              marginPagesDisplayed={5}
              pageCount={totalPages}
              previousLabel={<CaretLeftIcon />}
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item previous"
              previousLinkClassName="page-link"
              nextClassName="page-item next"
              nextLinkClassName="page-link"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
            <div
              className="records-count-select"
              data-tip="Записей на странице"
              data-for="for-left"
            >
              <Select
                value={{ label: props.itemsInPage, value: props.itemsInPage }}
                className="multiselect"
                classNamePrefix="inner"
                menuPlacement="top"
                components={{
                  IndicatorSeparator: () => null,
                }}
                onChange={(selectedOption) =>
                  props.itemsInPageChangedCallback(selectedOption.value)
                }
                options={itemsInPageList.map((i) => ({ label: i, value: i }))}
              />
            </div>
          </div>
        )}
        <FooterSlot.Renderer childs={props.children} />
      </div>
    </>
  )
}

export default PaginationList
