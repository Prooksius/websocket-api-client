import validator from "validator"
import { FieldsData, SelectValue, Subdomain } from "./types"
import { pluralName } from "@config"

const characterNames = ["символа", "символов", "символов"]

export interface ValidatorProps {
  value: string | number
  param?: boolean | number | string
  fields?: FieldsData
}

export interface SameValidatorProps {
  value: string | number
  param: string
  fields: FieldsData
}

export const required = ({ value }: ValidatorProps): string | boolean => {
  if (
    !value.toString().trim().length ||
    !validator.toBoolean(value.toString().trim())
  ) {
    return "Поле обязательно"
  } else return false
}
export const minLength = ({
  param,
  value,
}: ValidatorProps): string | boolean => {
  if (value.toString().trim().length < +param) {
    return `Значение должно быть больше ${param} ${
      characterNames[pluralName(+param)]
    }`
  } else return false
}
export const maxLength = ({
  param,
  value,
}: ValidatorProps): string | boolean => {
  if (value.toString().trim().length > +param) {
    return `Значение должно быть меньше ${param} ${
      characterNames[pluralName(+param)]
    }`
  } else return false
}
export const minValue = ({
  param,
  value,
}: ValidatorProps): string | boolean => {
  if (parseFloat(String(value)) <= parseFloat(String(param))) {
    return `Значение должно быть больше ${param}`
  } else return false
}
export const maxValue = ({
  param,
  value,
}: ValidatorProps): string | boolean => {
  if (value.toString().trim().length >= +param) {
    return `Значение должно быть меньше ${param}`
  } else return false
}

export const email = ({ value }: ValidatorProps): string | boolean => {
  if (String(value) && !validator.isEmail(String(value))) {
    return `Значение должно быть E-mail`
  } else return false
}

export const isNumeric = ({ value }: ValidatorProps): string | boolean => {
  if (!validator.isNumeric(String(value))) {
    return `Значение должно быть числом`
  } else return false
}

export const isAlpha = ({ value }: ValidatorProps): string | boolean => {
  if (!validator.isAlpha(String(value))) {
    return `Значение должно содержать только буквы`
  } else return false
}

export const isIP = ({ value }: ValidatorProps): string | boolean => {
  if (!validator.isIP(String(value), 4)) {
    return `Значение должно быть IP-адресом`
  } else return false
}

export const isAlphanumeric = ({ value }: ValidatorProps): string | boolean => {
  if (!validator.isAlphanumeric(String(value))) {
    return `Значение должно содержать только буквы и цифры`
  } else return false
}

export const sameAs = ({
  param,
  value,
  fields,
}: SameValidatorProps): string | boolean => {
  if (!fields || !fields[param]) return false
  let val = ""
  if (fields[param].type === "select") {
    val = fields[param].valueObj.value
  } else {
    val = fields[param].value
  }
  if (!validator.equals(String(value), val)) {
    return `Значение должно быть равно полю ${fields[param].label}`
  } else return false
}

export const subdomainsIPCheck = (
  subdomains: Subdomain[]
): string | boolean => {
  const foundEmptyIp = subdomains.filter((item) => !item.ip_addr_id).length
  const foundEmptyTitle = subdomains.filter((item) => item.title === "").length
  if (foundEmptyTitle > 0) {
    return "Поддомен обязателен"
  }
  if (foundEmptyIp > 0) {
    return "IP адрес обязателен"
  }
  return false
}
