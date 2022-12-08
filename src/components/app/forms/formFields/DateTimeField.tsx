import React, { useContext } from "react"
import classnames from "classnames"
import Datetime from "react-datetime"
import "moment/locale/ru"
import { FormWrapperContext } from "../formWrapper/formWrapperContext"
import { CalendarIcon } from "@components/app/icons/CalendarIcon"
import "react-datetime/css/react-datetime.css"

interface DateTimeFieldProps {
  name: string
  timeFormat: boolean
}

const DateTimeField: React.FC<DateTimeFieldProps> = ({ name, timeFormat }) => {
  const { form, setFieldValue } = useContext(FormWrapperContext)

  const thisField = form.fields[name]

  if (!thisField) {
    return (
      <div className="form-field">
        {name} - Поле не найдено в списке полей формы
      </div>
    )
  }

  const required = thisField.validations.required || false

  return (
    <div
      className={classnames(
        "form-field",
        "date-time-field",
        { hasValue: thisField.value },
        { invalid: thisField.errorMessage },
        { valid: !thisField.errorMessage && thisField.dirty }
      )}
    >
      <Datetime
        locale={"ru"}
        className="form-field"
        value={thisField.value || ""}
        inputProps={{ value: thisField.value || "" }}
        timeFormat={timeFormat}
        closeOnSelect={true}
        onChange={(value) =>
          setFieldValue({
            field: name,
            value:
              typeof value === "string" ? value : value.format("DD.MM.YYYY"),
          })
        }
      />
      <label>
        {thisField.label}
        {required && <span className="required">*</span>}
      </label>
      <CalendarIcon />
      <small
        className={classnames("error-label", {
          opened: thisField.errorMessage,
        })}
      >
        {thisField.errorMessage}
      </small>
    </div>
  )
}

export default DateTimeField
