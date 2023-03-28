export interface IAppState {
  response: Object[] | []
  page: number
  loading: boolean
}

export interface ISearchbarProps {
  submitHandler: (serverResponse: Object[]) => void
}
