import React from 'react'
import { IAppState } from '../../interfaces'
import { IserverResponseData } from '../../interfaces'

import { Searchbar } from '../Searchbar/Searchbar'
import { Button } from '../Button/Button'
import { ImageGallery } from '../ImageGallery/ImageGallery'

export class App extends React.Component<{}, IAppState> {
  state = {
    searchInput: '',
  }

  handleFormSubmit = (value: string) => {
    this.setState({ searchInput: value })
  }

  render() {
    console.log('app render')
    return (
      <div>
        React homework template
        <Searchbar submitHandler={this.handleFormSubmit} />
        <ImageGallery searchInput={this.state.searchInput}>{/* <Button  /> */}</ImageGallery>
      </div>
    )
  }
}
