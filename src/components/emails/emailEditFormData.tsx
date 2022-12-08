import type { MyFormData } from "@components/app/forms/formWrapper/types"
import type { EmailsRecord } from "@store/slices/countriesSlice"

export const emailEditFormData: MyFormData = {
  fields: {
    email_addr: {
      label: "Логин",
      type: "text",
      value: "",
      valueObj: { value: "", label: "Не выбрано" },
      valueArr: [],
      dropdown: "default",
      options: [{ value: "", label: "Не выбрано" }],
      validations: {
        required: true,
        email: true,
      },
      errorMessage: "",
      dirty: false,
    },
    password: {
      label: "Пароль",
      type: "text",
      value: "",
      valueObj: { value: "", label: "Не выбрано" },
      valueArr: [],
      dropdown: "default",
      options: [{ value: "", label: "Не выбрано" }],
      validations: {
        required: true,
        minLength: 7,
        maxLength: 255,
      },
      errorMessage: "",
      dirty: false,
    },
    secret_word: {
      label: "Кодовое слово",
      type: "text",
      value: "",
      valueObj: { value: "", label: "Не выбрано" },
      valueArr: [],
      dropdown: "default",
      options: [{ value: "", label: "Не выбрано" }],
      validations: {},
      errorMessage: "",
      dirty: false,
    },
    phone: {
      label: "Телефон",
      type: "text",
      value: "",
      valueObj: { value: "", label: "Не выбрано" },
      valueArr: [],
      dropdown: "default",
      options: [{ value: "", label: "Не выбрано" }],
      validations: {},
      errorMessage: "",
      dirty: false,
    },
  },
}

export const clearEmailForm = (filledFormData: MyFormData) => {
  Object.keys(filledFormData.fields).map((key) => {
    filledFormData.fields[key].dirty = false
    filledFormData.fields[key].errorMessage = ""
  })
  filledFormData.fields.email_addr.value = ""
  filledFormData.fields.password.value = ""
  filledFormData.fields.secret_word.value = ""
  filledFormData.fields.phone.value = ""
}

export const fillEmailForm = (
  filledFormData: MyFormData,
  email: EmailsRecord
) => {
  if (email) {
    Object.keys(filledFormData.fields).map((key) => {
      filledFormData.fields[key].dirty = false
      filledFormData.fields[key].errorMessage = ""
    })
    filledFormData.fields.email_addr.value = email.email_addr
    filledFormData.fields.password.value = email.password
    filledFormData.fields.secret_word.value = email.secret_word
    filledFormData.fields.phone.value = email.phone
  } else {
    clearEmailForm(filledFormData)
  }
}
