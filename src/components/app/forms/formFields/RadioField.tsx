import React, { useContext } from "react"
import classnames from "classnames"
import { FormWrapperContext } from "../formWrapper/formWrapperContext"
import { getNewID } from "@config"

interface RadioFieldProps {
  name: string
  optionWidth?: "default" | "full"
}

const RadioField: React.FC<RadioFieldProps> = ({
  name,
  optionWidth = "default",
}) => {
  const { form, setFieldValue } = useContext(FormWrapperContext)

  const newID = getNewID("radio-field")

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
        "form-field radio-field",
        { invalid: thisField.errorMessage },
        { valid: !thisField.errorMessage && thisField.dirty }
      )}
    >
      {thisField.options.map((option) => (
        <div
          key={option.value}
          className={classnames(
            "radio",
            { inline: optionWidth === "default" },
            { invalid: thisField.errorMessage },
            { valid: !thisField.errorMessage && thisField.dirty }
          )}
        >
          <div className="radio-inner">
            <input
              id={newID + "-" + option.value}
              type="radio"
              checked={thisField.value === option.value}
              onChange={() =>
                setFieldValue({
                  field: name,
                  value: option.value,
                })
              }
            />
            <i></i>
          </div>
          <label htmlFor={newID + "-" + option.value}>
            {option.image && (
              <img
                src={option.image}
                alt={option.label}
                style={{ width: "30px" }}
              />
            )}
            {option.label}
          </label>
        </div>
      ))}
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

export default RadioField
