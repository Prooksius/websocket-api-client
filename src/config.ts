import Swal from "sweetalert2"
import { toast } from "react-toastify"
import withReactContent from "sweetalert2-react-content"
import { ErrorPayloadData } from "@components/app/forms/formWrapper/types"

// test text

const MySwal = withReactContent(Swal)

export const APP_TITLE = "APP"
export const REACT_APP_API_URL = "ws://proksi-design.ru:2380"

let lastId = 0

export const getNewID = (prefix = "element-id") => {
  lastId++
  return `${prefix}${lastId}`
}

export function formatDateTime(
  value: string | number | Date,
  format = "date",
  lang = "ru-RU"
) {
  const options: Intl.DateTimeFormatOptions = {}

  if (format === "year") {
    options.year = "numeric"
  } else {
    if (format.includes("date")) {
      options.day = "2-digit"
      options.month = "2-digit"
      options.year = "numeric"
    }

    if (format.includes("time")) {
      options.hour = "2-digit"
      options.minute = "2-digit"
    }
  }
  return new Intl.DateTimeFormat(lang, options).format(new Date(value))
}

export function pluralType(n: number, lang = "ru-RU"): number {
  if (lang === "ru-RU") {
    return n % 10 == 1 && n % 100 != 11
      ? 0
      : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
      ? 1
      : 2
  } else {
    return n === 1 ? 0 : 1
  }
}
export function pluralName(n: number, lang = "ru-RU"): number {
  if (lang === "ru-RU") {
    return n % 10 == 1 && n % 100 != 11 ? 0 : 1
  } else {
    return 0
  }
}

export function toastAlert(title: string, type = "info") {
  if (type === "info") {
    toast[type](title)
  } else if (type === "warning") {
    toast[type](title)
  } else if (type === "error") {
    toast.error(title)
  } else if (type === "success") {
    toast.success(title)
  }

  /*
  MySwal.fire({
    toast: true,
    position: "top-right",
    iconColor: "white",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    icon: type,
    title: title,
  });
  */
}
export function confirmationAlert(
  title: string,
  confirmButtonText: string,
  cancelButtonText: string
) {
  return MySwal.fire({
    title,
    icon: "warning",
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText,
    cancelButtonText,
  })
}
