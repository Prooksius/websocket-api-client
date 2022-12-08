export { store } from "@store/store"
export type { RootState } from "@store/store"

export interface ServerGetResponse<T> {
  count: number
  data: T[]
}
