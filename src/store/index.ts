export { store } from "@store/store"
export type { RootState } from "@store/store"

export interface ServerGetResponse<T> {
  entity: string
  method: string
  status: string
  message?: string
  data: T
}

export interface ListPayload<T> {
  page: number
  limit: number
  count: number
  list: T[]
}