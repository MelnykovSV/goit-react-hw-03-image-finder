import React from 'react'
import { IAppState } from '../../interfaces'
import { IserverResponseData } from '../../interfaces'

import { Searchbar } from '../Searchbar/Searchbar'
import { Button } from '../Button/Button'
import { ImageGallery } from '../ImageGallery/ImageGallery'

export class App extends React.Component<{}, IAppState> {
  state = {
    searchInput: '123',
  }

  handleFormSubmit = (value: string) => {
    this.setState({ searchInput: value })
  }

  render() {
    console.log('searchbar render')
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
        <Searchbar submitHandler={this.handleFormSubmit} />
        <ImageGallery searchInput={this.state.searchInput}>{/* <Button  /> */}</ImageGallery>
      </div>
    )
  }
}
