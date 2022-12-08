import React, { useContext } from "react"
import classnames from "classnames"
import { FormWrapperContext } from "../formWrapper/formWrapperContext"
import { PlusIcon } from "@components/app/icons/PlusIcon"
import { Subdomain } from "../formWrapper/types"
import SubdomainItem from "./SubdomainItem"

interface SubdomainsFieldProps {
  name: string
  domainName: string
}

const SubdomainsField: React.FC<SubdomainsFieldProps> = ({
  name,
  domainName,
}) => {
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
        { hasValue: thisField.valueArr.length },
        { invalid: thisField.errorMessage },
        { valid: !thisField.errorMessage && thisField.dirty }
      )}
    >
      <div className="form-field form-fild-subdomain-container">
        {thisField.valueArr.map((value: Subdomain, index) => (
          <SubdomainItem
            key={name + "-" + index}
            subdomain={value}
            index={index}
            name={name}
            domainName={domainName}
          />
        ))}
      </div>
      <button
        type="button"
        className="btn btn-simple btn-simple-big btn-simple-border"
        onClick={() =>
          setFieldValue({
            field: name,
            value: {
              title: "",
              value: "",
              type: "A",
              available_check: false,
            },
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

export default SubdomainsField
