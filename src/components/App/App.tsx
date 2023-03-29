import React from 'react'
import { IAppState } from '../../interfaces'
import { IserverResponseData } from '../../interfaces'

import { Searchbar } from '../Searchbar/Searchbar'
import { Button } from '../Button/Button'

export class App extends React.Component<{}, IAppState> {
  state = {
    response: [],
    page: 1,
    loading: false,
    totalHits: 0,
  }

  handleFormSubmit = (serverResponse: IserverResponseData) => {
    this.setState({ response: serverResponse.hits })
  }

  checkTotalHits = (serverResponse: IserverResponseData) => {
    if (serverResponse.hits.length !== 0) {
      if (serverResponse.totalHits >= 500) {
        /// 500-519 hits

        if (serverResponse.total < 520) {
          console.log(`We got ${Math.ceil(serverResponse.total / 40)} pages`)
          console.log(`We got ${serverResponse.total} hits`)
          this.setState({ totalHits: serverResponse.total })

          return
        }

        /// 520+ hits

        console.log(`We got ${13} pages`)
        console.log(`We got ${520} hits`)
        this.setState({ totalHits: 520 })

        return
      }

      /// 1-499 hits
      console.log(`We got ${Math.ceil(serverResponse.totalHits / 40)} pages`)
      console.log(`We got ${serverResponse.totalHits} hits`)
      this.setState({ totalHits: serverResponse.totalHits })

      return
    }

    console.log('Sorry, there are no images matching your search query. Please try again.')
    this.setState({ totalHits: 0 })
  }

  fetchPics = async (e: React.SyntheticEvent) => {
    const urlBase = 'https://pixabay.com/api/?key=33543328-1e01a52b77697b8d064c91a7e'

    const target = e.target as typeof e.target & {
      searchInput: { value: string }
    }
    const response = await fetch(
      `${urlBase}&q=${target.searchInput.value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.state.page}`,
    )

    ///Адаптировать под кнопку, там нет значения value

    const data = await response.json()

    return data
  }

  resetPages = () => {
    this.setState({ page: 1 })
  }

  incrementPages = () => {
    this.setState((prevState) => {
      return { page: prevState.page + 1 }
    })
  }

  render() {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        React homework template
        <Searchbar
          submitHandler={this.handleFormSubmit}
          totalHitsChecker={this.checkTotalHits}
          fetchHandler={this.fetchPics}
          pagesReseter={this.resetPages}
        />
        <Button
          fetchHandler={this.fetchPics}
          pagesIncrementor={this.incrementPages}
          submitHandler={this.handleFormSubmit}
        />
      </div>
    )
  }
}
