export interface IAppState {
  searchInput: string
}
// export interface IAppState {
//   response: IImageData[]
//   page: number
//   loading: boolean
//   totalHits: number
// }

export interface IImageData {
  id: string
  largeImageURL: string
  tags: string
  webformatURL: string
}

export interface ISearchbarProps {
  submitHandler: (value: string) => void
}

export interface IServerResponseData {
  total: number
  totalHits: number
  hits: IImageData[]
}

export interface IButtonProps {
  // submitHandler: (serverResponse: IserverResponseData) => void
  fetchHandler: (e: React.SyntheticEvent) => Promise<IserverResponseData>
  pagesIncrementor: () => void
}
