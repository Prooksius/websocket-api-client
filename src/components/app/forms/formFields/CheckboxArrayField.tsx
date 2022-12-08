import React, { useState, useContext, useEffect } from "react"
import classnames from "classnames"
import { FormWrapperContext } from "../formWrapper/formWrapperContext"
import { FieldData, NS, SelectValue } from "../formWrapper/types"
import { getNewID } from "@config"

interface CheckboxArrayFieldProps {
  name: string
  initialLoad: boolean
  loadCallback?: (param: string) => Promise<NS[]>
}

const CheckboxArrayField: React.FC<CheckboxArrayFieldProps> = ({
  name,
  initialLoad,
  loadCallback = null,
}) => {
  const { form, setFieldValue, checkField } = useContext(FormWrapperContext)

  const newID = getNewID("checkbox-field")

  const thisField = form.fields[name]

  const dependField = form.fields[thisField.dependency?.field]

  const getDepFieldValue = (thisField: FieldData): string => {
    if (thisField.dependency) {
      if (["text", "checkbox", "radio"].includes(dependField.type)) {
        return dependField.value
      } else if (dependField.type === "select") {
        return dependField.valueObj.value === ""
          ? "-1"
          : dependField.valueObj.value
      }
    }
    return ""
  }
  const [valueArr, setValueArr] = useState(thisField.valueArr)
  const [depValue, setDepValue] = useState("")

  useEffect(() => {
    const setDeps = async () => {
      const val = getDepFieldValue(thisField)
      if (dependField && depValue != val) {
        if (thisField.dependency?.type === "loadOptions") {
          setDepValue(val)
          if (
            loadCallback &&
            (depValue != "" || (depValue === "" && initialLoad))
          ) {
            const arr = await loadCallback(val)
            thisField.valueArr = arr
            setValueArr(arr)
            setTimeout(() => {
              checkField(name)
            }, 100)
          }
        }
      }
    }
    setDeps()
  })

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
        { noLabel: thisField.label === "" },
        { hasValue: valueArr.length },
        { invalid: thisField.errorMessage },
        { valid: !thisField.errorMessage && thisField.dirty }
      )}
    >
      {valueArr.length >= 0 && (
        <div className="checkbox-array">
          {valueArr.map((value: NS, index) => (
            <div className="checkbox" key={name + "-" + index}>
              <div className="checkbox-inner">
                <input
                  id={newID + "-" + index}
                  type="checkbox"
                  checked={value.checked === true}
                  onChange={(e) =>
                    setFieldValue({
                      field: name,
                      value: {
                        value: value.value,
                        checked: e.target.checked,
                      },
                      index,
                    })
                  }
                />
                <i></i>
              </div>
              <label htmlFor={newID + "-" + index}>{value.value}</label>
            </div>
          ))}
        </div>
      )}
      {thisField.label && (
        <label>
          {thisField.label}
          {required && <span className="required">*</span>}
        </label>
      )}
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

export default CheckboxArrayField
