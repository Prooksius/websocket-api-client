import React, { ReactElement, useEffect, useState } from "react"
import FormWrapper from "@components/app/forms/formWrapper/FormWrapper"
import { toastAlert } from "@config"
import TextField from "@components/app/forms/formFields/TextField"
import SelectField from "@components/app/forms/formFields/SelectField"
import TextArrayField from "@components/app/forms/formFields/TextArrayField"
import CheckboxField from "@components/app/forms/formFields/CheckboxField"
import RadioField from "@components/app/forms/formFields/RadioField"
import {
  selectEmailById,
  addEmail,
  editEmail,
  listEmailsEditStatus,
  listEmailsError,
  listEmailsErrorData,
} from "@store/slices/countriesSlice"
import { useSelector, useDispatch } from "react-redux"
import { FormWrapperState } from "@components/app/forms/formWrapper/FormWrapperState"
import type { RootState } from "@store/store"
import {
  clearEmailForm,
  emailEditFormData,
  fillEmailForm,
} from "./emailEditFormData"
import { MyFormData } from "@components/app/forms/formWrapper/types"

interface EmailEditFormProps {
  id?: number
  onDoneCallback(): void
}

export const EmailEditForm: React.FC<EmailEditFormProps> = ({
  id,
  onDoneCallback,
}): ReactElement => {
  const dispatch = useDispatch()

  const [formFilled, setFormFilled] = useState<boolean>(false)

  const filledFormData = Object.assign({}, emailEditFormData)

  const email = useSelector((state: RootState) => selectEmailById(state, id))
  const editState = useSelector(listEmailsEditStatus)
  const editError = useSelector(listEmailsError)
  const editErrorData = useSelector(listEmailsErrorData)

  const submitHandler = (token: string, formData: MyFormData) => {
    if (id) {
      dispatch(editEmail({ form: formData, record: email }))
    } else {
      dispatch(addEmail(formData))
    }
  }

  const goFurther = () => {
    // дальнейшие действия после успешной отправки формы
    if (onDoneCallback) onDoneCallback()
  }

  useEffect(() => {
    fillEmailForm(filledFormData, email)
    setFormFilled(true)
    // eslint-disable-next-line
  }, [])

  return (
    <FormWrapperState formData={emailEditFormData}>
      <FormWrapper
        title=""
        formCallback={submitHandler}
        editStatus={editState}
        editError={editError}
        editErrorData={editErrorData}
        formBtnText="Сохранить"
        formData={filledFormData}
        goFurther={goFurther}
      >
        {formFilled && (
          <div className="form__row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <h4>Основное</h4>
              <TextField name="email_addr" />
              <TextField name="password" />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <h4>Дополнительно</h4>
              <TextField name="secret_word" />
              <TextField name="phone" />
            </div>
          </div>
        )}
      </FormWrapper>
    </FormWrapperState>
  )
}
