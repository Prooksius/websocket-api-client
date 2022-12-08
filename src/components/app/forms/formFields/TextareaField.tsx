import React, { useContext } from "react"
import classnames from "classnames"
import { FormWrapperContext } from "../formWrapper/formWrapperContext"

interface TextareaFieldProps {
  name: string
  rows?: number
}

const TextareaField: React.FC<TextareaFieldProps> = ({ name, rows = 5 }) => {
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
        { hasValue: thisField.value },
        { invalid: thisField.errorMessage },
        { valid: !thisField.errorMessage && thisField.dirty }
      )}
    >
      <textarea
        autoComplete="off"
        rows={rows}
        value={thisField.value || ""}
        onChange={(e) => setFieldValue({ field: name, value: e.target.value })}
      />
      <label>
        {thisField.label}
        {required && <span className="required">*</span>}
      </label>
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

export default TextareaField
