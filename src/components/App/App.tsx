import React from 'react'
import { IAppState } from '../../interfaces'

import { Searchbar } from '../Searchbar/Searchbar'

export class App extends React.Component<{}, IAppState> {
  state = {
    response: [],
    page: 1,
    loading: false,
    totalHits: 0,
  }

  handleFormSubmit = (serverResponse, hitsFound) => {
    this.setState({ response: serverResponse })
    this.setState({ hits: hitsFound })
  }

  checkTotalHits = (data) => {
    if (data.hits.length !== 0) {
      if (data.totalHits >= 500) {
        /// 500-519 hits

        if (data.total.length < 520) {
          console.log(`We got ${Math.ceil(data.total.length / 40)} pages`)
          console.log(`We got ${data.total.length} hits`)
          this.setState({ totalHits: data.total.length })

          return
        }

        /// 520+ hits

        console.log(`We got ${13} pages`)
        console.log(`We got ${520} hits`)
        this.setState({ totalHits: 520 })

        return
      }

      /// 1-499 hits
      console.log(`We got ${Math.ceil(data.totalHits / 40)} pages`)
      console.log(`We got ${data.totalHits} hits`)
      this.setState({ totalHits: data.totalHits })

      return
    }

    console.log('Sorry, there are no images matching your search query. Please try again.')
    this.setState({ totalHits: 0 })
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
        <Searchbar submitHandler={this.handleFormSubmit} totalHitsChecker={this.checkTotalHits} />
      </div>
    )
  }
}
