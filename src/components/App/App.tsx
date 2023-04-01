import React from 'react'
import { IAppState } from '../../interfaces'
import { IserverResponseData } from '../../interfaces'
import { PICS_PER_PAGE } from '../../constants'

import { Searchbar } from '../Searchbar/Searchbar'
import { Button } from '../Button/Button'
import { ImageGallery } from '../ImageGallery/ImageGallery'
import { Modal } from '../Modal/Modal'

import { Footer } from '../Footer/Footer'
import { Dna } from 'react-loader-spinner'

import { Container } from './App.styled'

export class App extends React.Component<{}, IAppState> {
  state = {
    status: 'idle',

    searchInput: '',

    page: 1,
    picsToRender: [],
    totalHits: 0,
    error: '',

    modalURL: '',
    isModalOpen: false,
    modalTags: '',
  }

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
    if (this.state.searchInput !== prevState.searchInput) {
      this.fetchPics().then((data) => {
        console.log(data)
        this.setState({ picsToRender: data.hits })
      })

      return
    }
    if (this.state.page !== prevState.page && this.state.page !== 1) {
      this.fetchPics().then((data) => {
        this.setState((prevState) => ({ picsToRender: [...prevState.picsToRender, ...data.hits] }))
      })
    }
    if (this.state.modalURL !== prevState.modalURL && this.state.modalURL !== '') {
      this.setState({ isModalOpen: true })
    }
  }

  fetchPics = async (): Promise<IServerResponseData> => {
    const urlBase = 'https://pixabay.com/api/?key=33543328-1e01a52b77697b8d064c91a7e'

    this.setState({ status: 'loading' })
    try {
      const response = await fetch(
        `${urlBase}&q=${this.state.searchInput}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PICS_PER_PAGE}&page=${this.state.page}`,
      )
      const data = await response.json()
      this.checkTotalHits(data)
      return data
    } catch (error) {
      this.setState({ status: 'error' })
      throw error
    } finally {
      this.setState({ status: 'loaded' })
    }
  }

  checkTotalHits = (serverResponse: IServerResponseData) => {
    if (serverResponse.hits.length !== 0) {
      if (serverResponse.totalHits >= 500) {
        /// 500-519 hits

        if (serverResponse.total < PICS_PER_PAGE * Math.ceil(500 / PICS_PER_PAGE)) {
          console.log(`We got ${Math.ceil(serverResponse.total / PICS_PER_PAGE)} pages`)
          console.log(`We got ${serverResponse.total} hits`)
          this.setState({ totalHits: serverResponse.total })

          return
        }

        /// 520+ hits
        // console.log(serverResponse)

        console.log(`We got ${Math.ceil(500 / PICS_PER_PAGE)} pages`)
        console.log(`We got ${PICS_PER_PAGE * Math.ceil(500 / PICS_PER_PAGE)} hits`)
        this.setState({ totalHits: PICS_PER_PAGE * Math.ceil(500 / PICS_PER_PAGE) })

        return
      }

      /// 1-499            hits
      console.log(`We got ${Math.ceil(serverResponse.totalHits / PICS_PER_PAGE)} pages`)
      console.log(`We got ${serverResponse.totalHits} hits`)
      this.setState({ totalHits: serverResponse.totalHits })

      return
    }

    console.log('Sorry, there are no images matching your search query. Please try again.')
    this.setState({ totalHits: 0 })
  }

  incrementPages = (e) => {
    this.setState((prevState) => {
      if (Math.ceil(this.totalHits / PICS_PER_PAGE) === prevState.page + 1) {
        e.target.disabled = true
      }

      return { page: prevState.page + 1 }
    })
  }

  handleFormSubmit = (value: string) => {
    this.setState({ searchInput: value, page: 1 })
  }

  handleImageClick = (imageURL: string, tags: string): void => {
    this.setState({ modalURL: imageURL, modalTags: tags })
  }
  handleModalClose = (): void => {
    this.setState({ modalURL: '', isModalOpen: false })
  }

  render() {
    if (this.state.status === 'idle') {
      return (
        <Container>
          {this.state.isModalOpen && (
            <Modal modalCloseHandler={this.handleModalClose} largeImageUrl={this.state.modalURL}></Modal>
          )}
          <Searchbar submitHandler={this.handleFormSubmit} />
        </Container>
      )
    } else if (this.state.status === 'loading') {
      return (
        <Container>
          {this.state.isModalOpen && (
            <Modal modalCloseHandler={this.handleModalClose} largeImageUrl={this.state.modalURL}></Modal>
          )}
          <Searchbar submitHandler={this.handleFormSubmit} />
          <ImageGallery imageClickHandler={this.handleImageClick} picsToRender={this.state.picsToRender}></ImageGallery>
          <Footer>
            <Dna />
          </Footer>
        </Container>
      )
    } else if (this.state.status === 'loaded') {
      return (
        <Container>
          {this.state.isModalOpen && (
            <Modal modalCloseHandler={this.handleModalClose} largeImageUrl={this.state.modalURL}></Modal>
          )}
          <Searchbar submitHandler={this.handleFormSubmit} />
          <ImageGallery imageClickHandler={this.handleImageClick} picsToRender={this.state.picsToRender}></ImageGallery>
          <Footer>
            {this.state.page !== Math.ceil(this.state.totalHits / PICS_PER_PAGE) && (
              <Button pageIncrementor={this.incrementPages} />
            )}
          </Footer>
        </Container>
      )
    } else {
    }
    return (
      <Container>
        {this.state.isModalOpen && (
          <Modal modalCloseHandler={this.handleModalClose} largeImageUrl={this.state.modalURL}></Modal>
        )}
        <Searchbar submitHandler={this.handleFormSubmit} />
        <ImageGallery imageClickHandler={this.handleImageClick} picsToRender={this.state.picsToRender}></ImageGallery>
        <Footer>
          {this.state.page !== Math.ceil(this.state.totalHits / PICS_PER_PAGE) && (
            <Button pageIncrementor={this.incrementPages} />
          )}

          <Dna />
        </Footer>
      </Container>
    )
  }
}
