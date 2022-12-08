import React, { ReactNode, useReducer } from "react"
import {
  CHECK_FORM,
  SET_FIELD,
  SET_FORM,
  CLEAR_FORM,
  FieldData,
  MyFormData,
  FormContextSetFormFunc,
  FormContextSetFieldFunc,
  FormContextCheckFormFunc,
  FormContextProps,
  CHECK_FIELD,
  FormContextCheckFieldFunc,
  ErrorPayloadData,
  ERROR_FIELD,
  FormContextErrorFieldFunc,
} from "./types"
import { FormWrapperContext } from "./formWrapperContext"
import { formWrapperReducer } from "./formWrapperReducer"

interface FormWrapperStateProps {
  children: ReactNode
  formData: MyFormData
}

export const FormWrapperState: React.FC<FormWrapperStateProps> = ({
  children,
  formData,
}) => {
  const [formState, dispatch] = useReducer(formWrapperReducer, formData)

  const setForm: FormContextSetFormFunc = (form) =>
    dispatch({ type: SET_FORM, payload: form })

  const checkForm: FormContextCheckFormFunc = () =>
    dispatch({ type: CHECK_FORM })

  const checkField: FormContextCheckFieldFunc = (field_id: string) =>
    dispatch({ type: CHECK_FIELD, payload: { field: field_id } })

  const errorField: FormContextErrorFieldFunc = (
    field_errors: ErrorPayloadData
  ) => dispatch({ type: ERROR_FIELD, payload: { errorData: field_errors } })

  const clearForm: FormContextCheckFormFunc = () =>
    dispatch({ type: CLEAR_FORM })

  const setFieldValue: FormContextSetFieldFunc = (field) =>
    dispatch({ type: SET_FIELD, payload: field })
  
  const contextProps: FormContextProps = {
    form: formState,
    checkForm,
    checkField,
    errorField,
    setForm,
    clearForm,
    setFieldValue,
  }

  return (
    <FormWrapperContext.Provider value={contextProps}>
      {children}
    </FormWrapperContext.Provider>
  )
}
