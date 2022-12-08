import classNames from "classnames"
import React, { ReactNode, CSSProperties } from "react"
import { StatusType } from "@components/app/forms/formWrapper/types"
import { UnmountClosed } from "react-collapse"
import range from "lodash.range"

type ColumnData<T> = {
  title: string
  width: string
  display?: CSSProperties["display"]
  direction?: CSSProperties["flexDirection"]
  align?: CSSProperties["alignItems"]
  justify?: CSSProperties["justifyContent"]
  gap?: CSSProperties["gap"]
  getValue: (row: T) => string | ReactNode
}

interface DataGridProps<T> {
  data: T[]
  status: StatusType
  columns: ColumnData<T>[]
  rowHeight?: number
  getExpanded: (row: T) => string | ReactNode
}

export const DataGrid = <T extends Record<string, any>>(
  props: DataGridProps<T>
) => {
  const emptyItemsCount = range(Math.max(props.data.length, 2))

  return (
    <div className="pagination-tablelist">
      <div className="pagination-tablelist__part pagination-tablelist__thead">
        <div className="pagination-tablelist__row-th">
          {props.columns.map((column, index) => (
            <div
              key={index + "-" + column.title}
              className={classNames("pagination-tablelist__th", {
                "button-td": column.width === "unset",
              })}
              style={{ flex: column.width }}
            >
              {column.title}
            </div>
          ))}
        </div>
      </div>
      <div className="pagination-tablelist__part pagination-tablelist__tbody">
        {props.status === "succeeded" &&
          props.data.length > 0 &&
          props.data.map((item) => (
            <div
              key={item.id}
              className={classNames("pagination-tablelist__row", {
                open: item.record_open,
              })}
            >
              <div className="pagination-tablelist__row-up">
                {props.columns.map((column, index) => (
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
                {props.getExpanded(item)}
              </UnmountClosed>
            </div>
          ))}
        {props.status === "succeeded" && props.data.length === 0 && (
          <div className="pagination-tablelist__row">
            <div className="pagination-tablelist__td">Записей не найдено</div>
          </div>
        )}
        {props.status === "loading" &&
          emptyItemsCount.map((emptyItem) => (
            <div
              key={emptyItem}
              className="pagination-tablelist__row skeleton-box loading"
            >
              <div
                className="pagination-tablelist__row-up"
                style={{ height: `${props.rowHeight || 67}px` }}
              >
                {props.columns.map((column, index) => (
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
  )
}
