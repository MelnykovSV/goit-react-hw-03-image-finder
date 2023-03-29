export interface IAppState {
  response: IImageData[]
  page: number
  loading: boolean
  totalHits: number
}

export interface IImageData {
  id: string
  largeImageURL: string
  tags: string
  webformatURL: string
}

export interface ISearchbarProps {
  submitHandler: (serverResponse: IserverResponseData) => void
  totalHitsChecker: (serverResponse: IserverResponseData) => void
  // fetchHandler: (e: React.SyntheticEvent) => IserverResponseData
  fetchHandler: (e: React.SyntheticEvent) => Promise<IserverResponseData>
  pagesReseter: () => void
}

export interface IserverResponseData {
  total: number
  totalHits: number
  hits: IImageData[]
}

export interface IButtonProps {
  submitHandler: (serverResponse: IserverResponseData) => void
  fetchHandler: (e: React.SyntheticEvent) => Promise<IserverResponseData>
  pagesIncrementor: () => void
}
