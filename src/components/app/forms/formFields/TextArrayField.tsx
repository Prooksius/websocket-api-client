import React, { useState, useContext } from "react"
import classnames from "classnames"
import { FormWrapperContext } from "../formWrapper/formWrapperContext"
import { PlusIcon } from "@components/app/icons/PlusIcon"
import { DeleteIcon } from "@components/app/icons/DeleteIcon"
import { NS } from "../formWrapper/types"

interface TextArrayFieldProps {
  name: string
}

const TextArrayField: React.FC<TextArrayFieldProps> = ({ name }) => {
  const [fieldFocused, setFieldFocused] = useState(false)
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
        "form-group",
        "form-array-field",
        { noLabel: thisField.label === "" },
        { focused: fieldFocused },
        { hasValue: thisField.valueArr.length },
        { invalid: thisField.errorMessage },
        { valid: !thisField.errorMessage && thisField.dirty }
      )}
    >
      {thisField.valueArr.length > 0 && (
        <div className="form-field">
          {thisField.valueArr.map((value: NS, index) => (
            <div
              className="form-field form-fild-array-item"
              key={name + "-" + index}
            >
              <input
                type={thisField.type}
                autoComplete="off"
                value={value.value || ""}
                onFocus={() => setFieldFocused(true)}
                onBlur={() => setFieldFocused(false)}
                onChange={(e) =>
                  setFieldValue({
                    field: name,
                    value: {
                      value: e.target.value,
                      checked: true,
                    },
                    index,
                  })
                }
              />
              <span className="form-fild-array__counter">{index + 1}</span>
              <button
                type="button"
                className="btn btn-simple btn-simple-big btn-group-right btn-red"
                onClick={() => setFieldValue({ field: name, index })}
              >
                <DeleteIcon />
              </button>
            </div>
          ))}
        </div>
      )}
      <button
        type="button"
        className="btn btn-simple btn-simple-big btn-simple-border"
        onClick={() =>
          setFieldValue({
            field: name,
            value: { value: "" },
            index: thisField.valueArr.length,
          })
        }
      >
        <PlusIcon />
      </button>
      <small
        className={classnames("error-label", {
          opened: thisField.errorMessage,
        })}
      >
        {thisField.errorMessage}
      </small>
      {thisField.label && (
        <label>
          {thisField.label}
          {required && <span className="required">*</span>}
        </label>
      )}
    </div>
  )
}

export default TextArrayField
