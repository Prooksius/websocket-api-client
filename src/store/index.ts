export { store } from "@store/store"
export type { RootState } from "@store/store"

export interface ServerRequest {
  entity: string
  method: string
  params: Record<string, any>
  token?: string
}

export interface ServerRequestData {
  serverRequest: ServerRequest,
  requestCount: number
}

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

export type SendRequestFunc = (request: ServerRequest) => void
