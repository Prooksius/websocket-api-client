import classNames from "classnames"
import React, {
  MouseEventHandler,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import { toastAlert } from "@config"
import {
  setFilter,
  listEmailsFilter,
  loadEmailOptionsName,
} from "@store/slices/countriesSlice"
import TextField from "@components/app/forms/formFields/TextField"
import DateTimeField from "@components/app/forms/formFields/DateTimeField"
import FormWrapper from "@components/app/forms/formWrapper/FormWrapper"
import { FormWrapperState } from "@components/app/forms/formWrapper/FormWrapperState"
import { FilterIcon } from "@components/app/icons/FilterIcon"
import { emailsFilterFormData } from "./emailsFilterFormData"
import {
  MyFormData,
  SelectValue,
} from "@components/app/forms/formWrapper/types"
import { FormWrapperContext } from "@components/app/forms/formWrapper/formWrapperContext"
import { DeleteIconSmall } from "@components/app/icons/DeleteIconSmall"
import { setTootipShow } from "@store/slices/globalsSlice"
import SelectAsyncField from "@components/app/forms/formFields/SelectAsyncField"

type SelectedValue = {
  key: string
  field: string
  value: string
}

const useQuery = () => {
  // Use the URLSearchParams API to extract the query parameters
  // useLocation().search will have the query parameters eg: ?foo=bar&a=b
  const loc = useLocation()
  return { route: loc.pathname, query: new URLSearchParams(loc.search) }
}

const EmailsFilterInner: React.FC = () => {
  const dispatch = useDispatch()
  const ref = useRef(null)
  const btnRef = useRef(null)
  const { route, query } = useQuery()
  const navigate = useNavigate()

  const { form, setFieldValue } = useContext(FormWrapperContext)

  const [filterOpen, setFilterOpen] = useState(false)

  const filter = useSelector(listEmailsFilter)

  const filledFormData = Object.assign({}, emailsFilterFormData)

  const filledValies: SelectedValue[] = Object.keys(emailsFilterFormData.fields)
    .filter((key) => {
      if (
        (emailsFilterFormData.fields[key].type === "text" ||
          emailsFilterFormData.fields[key].type === "radio") &&
        filter[key]
      ) {
        return true
      } else if (
        emailsFilterFormData.fields[key].type === "checkbox" &&
        filter[key]
      ) {
        return true
      } else if (
        emailsFilterFormData.fields[key].type === "select" &&
        filter[key] &&
        (filter[key] as SelectValue).value
      ) {
        return true
      }
      return false
    })
    .map((key) => {
      const fieldData = {
        key,
        field: emailsFilterFormData.fields[key].label,
        value: "",
      }
      if (
        emailsFilterFormData.fields[key].type === "text" ||
        emailsFilterFormData.fields[key].type === "radio"
      ) {
        fieldData.value = String(filter[key])
      } else if (emailsFilterFormData.fields[key].type === "checkbox") {
        fieldData.value = String(filter[key]) === "1" ? "Да" : "Нет"
      } else if (emailsFilterFormData.fields[key].type === "select") {
        fieldData.value = (filter[key] as SelectValue).label
      }
      return fieldData
    })

  const submitHandler = (token: string, formData: MyFormData) => {
    console.log("submitHandler")
    dispatch(setFilter(formData.fields))
    query.delete("page")
    navigate(`${route}?${query.toString()}`)
    setTimeout(() => {
      setFilterOpen(false)
    }, 500)
  }

  const _clearFilterField = (fieldName: string) => {
    const field = emailsFilterFormData.fields[fieldName]
    if (field.type === "text") {
      setFieldValue({ field: fieldName, value: "" })
    } else if (field.type === "select") {
      setFieldValue({
        field: fieldName,
        value: { value: "", label: "Не выбрано" },
      })
    } else if (field.type === "checkbox") {
      setFieldValue({ field: fieldName, value: "0" })
    }
  }

  const clearFilterField = (fieldName: string) => {
    _clearFilterField(fieldName)
    dispatch(setTootipShow(false))
    setTimeout(() => {
      dispatch(setFilter(form.fields))
      query.delete("page")
      navigate(`${route}?${query.toString()}`)
    }, 250)
  }

  const clearFilterForm = () => {
    filledValies.map((item) => {
      _clearFilterField(item.key)
    })
    dispatch(setTootipShow(false))
    setTimeout(() => {
      dispatch(setFilter(form.fields))
      query.delete("page")
      navigate(`${route}?${query.toString()}`)
    }, 300)
  }

  const goFurther = () => {
    // дальнейшие действия после успешной отправки формы
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (
        ref.current &&
        //        event.target !== btnRef.current &&
        //        target.closest("button") !== btnRef.current &&
        !ref.current.contains(event.target)
      ) {
        setFilterOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside, true)
    return () => {
      document.removeEventListener("click", handleClickOutside, true)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className="entity-filer__container domains-filter">
      <button
        ref={btnRef}
        data-tip={"Открыть фильтр"}
        data-for="for-top"
        type="button"
        className="btn btn-simple btn-simple-big btn-simple-border btn-line"
        onClick={() => setFilterOpen((state) => !state)}
      >
        <FilterIcon />
      </button>
      {filledValies.length > 0 && (
        <>
          <div className="entity-filter__values">
            {filledValies.map((item) => (
              <div className="entity-filter__value" key={item.value}>
                <span
                  data-tip={item.field}
                  data-for="for-top"
                  onMouseMove={() => dispatch(setTootipShow(true))}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: item.value,
                    }}
                  ></span>
                  <button
                    type="button"
                    className="btn btn-simple btn-transparent"
                    onClick={() => clearFilterField(item.key)}
                  >
                    <DeleteIconSmall />
                  </button>
                </span>
              </div>
            ))}
          </div>
          <button
            type="button"
            data-tip="Очистить фильтр"
            data-for="for-top"
            onMouseMove={() => dispatch(setTootipShow(true))}
            className="btn btn-white btn-border btn-line"
            onClick={() => clearFilterForm()}
          >
            Сброс
            <DeleteIconSmall />
          </button>
        </>
      )}
      <div
        ref={ref}
        className={classNames([
          "emails-filter entity-filter",
          { active: filterOpen },
        ])}
      >
        <FormWrapper
          title=""
          formCallback={submitHandler}
          formBtnText="Применить"
          formData={filledFormData}
          goFurther={goFurther}
        >
          <SelectAsyncField
            name={"email_addr"}
            searchCallback={loadEmailOptionsName}
          />
          <DateTimeField name={"created_at"} timeFormat={true} />
        </FormWrapper>
      </div>
    </div>
  )
}

export const EmailsFilter: React.FC = () => {
  return (
    <FormWrapperState formData={emailsFilterFormData}>
      <EmailsFilterInner />
    </FormWrapperState>
  )
}
