import React, { useState, useContext, useEffect } from "react"
import classnames from "classnames"
import { FormWrapperContext } from "../formWrapper/formWrapperContext"
import { DeleteIcon } from "@components/app/icons/DeleteIcon"
import {
  FieldData,
  SelectValue,
  Subdomain,
  SubdomainType,
} from "../formWrapper/types"
import { getNewID } from "@config"
import { AsyncPaginate } from "react-select-async-paginate"
import { getServerIPs, loadServerOptions } from "@store/slices/serversSlice"
import Select from "react-select"

interface SubdomainItemProps {
  name: string
  subdomain: Subdomain
  index: number
  domainName: string
}

const typesArr: SubdomainType[] = ["A", "CNAME"]

const SubdomainItem: React.FC<SubdomainItemProps> = ({
  name,
  subdomain,
  index,
  domainName,
}) => {
  const { form, setFieldValue } = useContext(FormWrapperContext)

  const [serverError, setServerError] = useState<string>("")
  const [serverDirty, setServerDirty] = useState<boolean>(false)
  const [serverInputValue, setServerInputValue] = useState("")

  const [IPList, setIPList] = useState<SelectValue[]>([
    { value: "", label: "Не выбрано" },
  ])
  const [IPError, setIPError] = useState<string>("")
  const [IPDirty, setIPDirty] = useState<boolean>(false)

  const newID = getNewID("subdomain-field")

  const domain = form.fields[domainName].value

  useEffect(() => {
    const getIPs = async (param: any) => {
      const ips = await getServerIPs(param)
      setIPList(ips)
    }
    if (!subdomain.server_id) {
      setServerError("Выберите сервер")
    } else {
      setServerError("")
    }
    getIPs(subdomain.server_id)
  }, [subdomain.server_id])

  useEffect(() => {
    if (!subdomain.ip_addr_id) {
      setIPError("Выберите IP")
    } else {
      setIPError("")
    }
  }, [subdomain.ip_addr_id])

  return (
    <div className="form-fild-subdomain-item">
      <div
        className={classnames(
          "form-field",
          "form-fild-array-item",
          { "subdomain-array-item": !subdomain.id },
          { "subdomain-edit-array-item": subdomain.id },
          { invalid: subdomain.title === "" },
          { valid: subdomain.title !== "" }
        )}
      >
        <input
          type="text"
          autoComplete="off"
          value={subdomain.title || ""}
          placeholder="Не выбрано"
          onChange={(e) =>
            setFieldValue({
              field: name,
              value: {
                id: subdomain.id,
                monitoring_id: subdomain.monitoring_id,
                title: e.target.value,
                server_id: subdomain.server_id,
                server_name: subdomain.server_name,
                ip_addr_id: subdomain.ip_addr_id,
                ip_addr: subdomain.ip_addr,
                type: subdomain.type || "",
                available_check: subdomain.available_check,
              },
              index,
            })
          }
        />
        <button
          type="button"
          className="btn btn-simple btn-simple-big btn-group-right btn-red"
          onClick={() => setFieldValue({ field: name, index })}
        >
          <DeleteIcon />
        </button>
        {domain && !subdomain.id && (
          <span className="domain-name">.{domain}</span>
        )}
      </div>
      <div className="radio-field" style={{ display: "none" }}>
        {typesArr.map((typeItem) => (
          <div key={newID + "-" + typeItem} className="radio inline">
            <div className="radio-inner">
              <input
                id={newID + "-" + typeItem}
                type="radio"
                checked={subdomain.type === typeItem}
                onChange={() =>
                  setFieldValue({
                    field: name,
                    value: {
                      id: subdomain.id,
                      monitoring_id: subdomain.monitoring_id,
                      title: subdomain.title,
                      server_id: subdomain.server_id,
                      server_name: subdomain.server_name,
                      ip_addr_id: subdomain.ip_addr_id,
                      ip_addr: subdomain.ip_addr,
                      type: typeItem,
                      available_check: subdomain.available_check,
                    },
                    index,
                  })
                }
              />
              <i></i>
            </div>
            <label htmlFor={newID + "-" + typeItem}>{typeItem}</label>
          </div>
        ))}
      </div>

      <div className="form__row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div
            className={classnames("form-field", {
              hasValue: subdomain.server_id,
            })}
          >
            <AsyncPaginate
              defaultOptions={[]}
              debounceTimeout={500}
              value={
                {
                  value: String(subdomain.server_id),
                  label: subdomain.server_name
                    ? subdomain.server_name
                    : "Не выбрано",
                } as SelectValue
              }
              className="multiselect"
              classNamePrefix="inner"
              components={{
                IndicatorSeparator: () => null,
              }}
              onChange={(selectedOption) => {
                setFieldValue({
                  field: name,
                  value: {
                    id: subdomain.id,
                    monitoring_id: subdomain.monitoring_id,
                    title: subdomain.title,
                    server_id: Number(selectedOption.value),
                    server_name: selectedOption.label,
                    ip_addr_id: subdomain.ip_addr_id,
                    ip_addr: subdomain.ip_addr,
                    type: subdomain.type || "",
                    available_check: subdomain.available_check,
                  },
                  index,
                })
                setServerDirty(true)
              }}
              getOptionLabel={(e) => e.label}
              formatOptionLabel={(option, { context }) => {
                return (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: option.label,
                    }}
                  ></span>
                )
              }}
              getOptionValue={(e) => e.value}
              loadOptions={loadServerOptions}
              inputValue={serverInputValue}
              onInputChange={(value: string) => setServerInputValue(value)}
              additional={{
                page: 1,
              }}
            />
            <label>Сервер</label>
            <small
              className={classnames("error-label", {
                opened: serverError,
              })}
            >
              {serverError}
            </small>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div
            className={classnames(
              "form-field",
              { hasValue: subdomain.ip_addr_id },
              { invalid: IPError },
              { valid: !IPError && IPDirty }
            )}
          >
            <Select
              value={
                {
                  value: String(subdomain.ip_addr_id),
                  label: subdomain.ip_addr ? subdomain.ip_addr : "Не выбрано",
                } as SelectValue
              }
              placeholder="Не выбрано"
              className="multiselect"
              classNamePrefix="inner"
              components={{
                IndicatorSeparator: () => null,
              }}
              onChange={(selectedOption) => {
                setFieldValue({
                  field: name,
                  value: {
                    id: subdomain.id,
                    monitoring_id: subdomain.monitoring_id,
                    title: subdomain.title,
                    ip_addr_id: Number(selectedOption.value),
                    ip_addr: selectedOption.label,
                    server_id: subdomain.server_id,
                    server_name: subdomain.server_name,
                    type: subdomain.type || "",
                    available_check: subdomain.available_check,
                  },
                  index,
                })
                setIPDirty(true)
              }}
              options={IPList}
            />
            <label>
              IP
              <span className="required">*</span>
            </label>
            <small
              className={classnames("error-label", {
                opened: IPError,
              })}
            >
              {IPError}
            </small>
          </div>
        </div>
      </div>
      <div className="checkbox">
        <div className="checkbox-inner">
          <input
            id={newID + "-" + index}
            type="checkbox"
            checked={subdomain.available_check}
            onChange={(e) =>
              setFieldValue({
                field: name,
                value: {
                  id: subdomain.id,
                  monitoring_id: subdomain.monitoring_id,
                  title: subdomain.title,
                  ip_addr_id: subdomain.ip_addr_id,
                  ip_addr: subdomain.ip_addr,
                  server_id: subdomain.server_id,
                  server_name: subdomain.server_name,
                  type: subdomain.type || "",
                  available_check: e.target.checked,
                },
                index,
              })
            }
          />
          <i></i>
        </div>
        <label htmlFor={newID + "-" + index}>Проверка доступности</label>
      </div>
    </div>
  )
}

export default SubdomainItem
