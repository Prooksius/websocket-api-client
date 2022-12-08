import React, { useContext } from "react"
import classnames from "classnames"
import { FormWrapperContext } from "../formWrapper/formWrapperContext"
import { getNewID } from "@config"

interface CheckboxFieldProps {
  name: string
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ name }) => {
  const { form, setFieldValue } = useContext(FormWrapperContext)

  const newID = getNewID("checkbox-field")

  const thisField = form.fields[name]

  if (!thisField) {
    return (
      <div className="form-field">
        {name} - Поле не найдено в списке полей формы
      </div>
    )
  }

  return (
    <div
      className={classnames(
        "form-field",
        { invalid: thisField.errorMessage },
        { valid: !thisField.errorMessage && thisField.dirty }
      )}
    >
      <div
        className={classnames(
          "checkbox",
          { invalid: thisField.errorMessage },
          { valid: !thisField.errorMessage && thisField.dirty }
        )}
      >
        <div className="checkbox-inner">
          <input
            id={newID}
            type="checkbox"
            checked={thisField.value === "1"}
            onChange={(e) =>
              setFieldValue({
                field: name,
                value: e.target.checked ? "1" : "0",
              })
            }
          />
          <i></i>
        </div>
        <label htmlFor={newID}>{thisField.label}</label>
      </div>
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

export default CheckboxField
