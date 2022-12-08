export const SET_FIELD = "SET_FIELD"
export const SET_FORM = "SET_FORM"
export const CLEAR_FORM = "CLEAR_FORM"
export const CHECK_FORM = "CHECK_FORM"
export const CHECK_FIELD = "CHECK_FIELD"
export const ERROR_FIELD = "ERROR_FIELD"

export type StatusType = "idle" | "loading" | "succeeded" | "failed"

export type ActionType =
  | typeof SET_FIELD
  | typeof SET_FORM
  | typeof CLEAR_FORM
  | typeof CHECK_FORM
  | typeof CHECK_FIELD
  | typeof ERROR_FIELD

type DropdownType = "default" | "images"
type FieldType =
  | "text"
  | "email"
  | "select"
  | "checkbox"
  | "radio"
  | "array"
  | "checklist"

export type SubdomainType = "A" | "CNAME" | ""

export type ServerStatus = "up" | "down"

export type DefaultSelectValue = {
  value: string
  label?: string
  image?: string
}
type EmptySelectValue = { value: ""; label: "Не выбрано"; image?: "" }
export type SelectValue = DefaultSelectValue | EmptySelectValue

export type FieldsDependency = {
  field: string
  type: string
}

export interface ValidationErrors {
  errorMessage: string
  field_errors: Record<string, string>
}

type ErrorData = {
  loc: string[]
  msg: string
  type: string
}
export type ErrorDetailsData = ErrorData[]

export interface ErrorPayloadData {
  detail: ErrorDetailsData | string
}

export type ValidationsData = {
  required?: boolean
  minLength?: number
  maxLength?: number
  minValue?: number
  maxValue?: number
  email?: boolean
  sameAs?: string
  isIP?: boolean
  subdomains?: boolean
}

export type OptionsObject = {
  value: string
  label: string
}

export type Additional = {
  page: number
}

export type NS = {
  value: string
  checked: boolean
}
export type IPAddr = {
  ip_addr: string
  server_status: ServerStatus
  monitoring_id: number
}

export type Subdomain = {
  id: number
  title: string
  value?: string
  type: SubdomainType
  ip_addr_id: number
  ip_addr: string
  server_id: number
  server_name: string
  available_check: boolean
  monitoring_id: number
  checked?: boolean
}
export type ArrayValue = NS | Subdomain
export type FieldValueArray = ArrayValue[]

export interface FieldData extends Record<string, any> {
  label: string
  type: FieldType
  value: string
  valueObj: SelectValue
  valueArr: FieldValueArray
  options?: SelectValue[]
  dropdown?: DropdownType
  validations: ValidationsData
  dependency?: FieldsDependency
  errorMessage: string
  dirty: boolean
}

export type FormFieldData = {
  field: string
  value?: string | ArrayValue | SelectValue
  index?: number
}
export type FormField = [key: string, value: FieldData]

export type FieldsData = {
  [key: string]: FieldData
}

export type MyFormData = {
  id?: number
  fields?: FieldsData
}

export type FormContextSetFormFunc = (form: MyFormData) => void
export type FormContextSetFieldFunc = (field: FormFieldData) => void
export type FormContextCheckFormFunc = () => void
export type FormContextCheckFieldFunc = (field_id: string) => void
export type FormContextErrorFieldFunc = (field_errors: ErrorPayloadData) => void

export interface FormContextProps {
  form: MyFormData
  setForm: FormContextSetFormFunc
  checkForm: FormContextCheckFormFunc
  checkField: FormContextCheckFieldFunc
  errorField: FormContextErrorFieldFunc
  clearForm: FormContextCheckFormFunc
  setFieldValue: FormContextSetFieldFunc
}
