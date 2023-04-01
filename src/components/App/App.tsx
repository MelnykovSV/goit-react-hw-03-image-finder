import React from 'react'
import { IAppState } from '../../interfaces'
import { IserverResponseData } from '../../interfaces'

import { Searchbar } from '../Searchbar/Searchbar'
import { Button } from '../Button/Button'
import { ImageGallery } from '../ImageGallery/ImageGallery'
import { Modal } from '../Modal/Modal'

import { Container } from './App.styled'

export class App extends React.Component<{}, IAppState> {
  state = {
    searchInput: '',
    modalURL: '',
    isModalOpen: false,
  }
  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<IAppState>, snapshot?: any): void {
    if (this.state.modalURL !== prevState.modalURL && this.state.modalURL !== '') {
      this.setState({ isModalOpen: true })
    }
  }

  handleFormSubmit = (value: string) => {
    this.setState({ searchInput: value })
  }

  handleImageClick = (imageURL: string): void => {
    this.setState({ modalURL: imageURL })
  }
  handleModalClose = (): void => {
    this.setState({ modalURL: '', isModalOpen: false })
  }

  render() {
    console.log('app render')
    return (
      <Container>
        {this.state.isModalOpen && (
          <Modal modalCloseHandler={this.handleModalClose} largeImageUrl={this.state.modalURL}></Modal>
        )}
        <Searchbar submitHandler={this.handleFormSubmit} />
        <ImageGallery searchInput={this.state.searchInput} imageClickHandler={this.handleImageClick}>
          {/* <Button  /> */}
        </ImageGallery>
      </Container>
    )
  }
}
