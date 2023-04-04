import React from 'react'

import { PICS_PER_PAGE, URL_BASE } from '../../constants'
import { IAppState, IServerResponseData } from '../../interfaces'

import { Searchbar } from '../Searchbar/Searchbar'
import { Button } from '../Button/Button'
import { ImageGallery } from '../ImageGallery/ImageGallery'
import { Modal } from '../Modal/Modal'
import { Footer } from '../Footer/Footer'
import { Dna } from 'react-loader-spinner'

import { Container } from './App.styled'

export class App extends React.Component<Readonly<{}>, Readonly<IAppState>> {
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

  myref = React.createRef()

  componentDidUpdate(prevProps: Readonly<IAppState>, prevState: Readonly<IAppState>): void {
    if (this.state.searchInput !== prevState.searchInput) {
      this.fetchPics().then((data) => {
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
    if (this.state.picsToRender !== prevState.picsToRender) {
      this.scrollToBottom()
    }
  }

  fetchPics = async (): Promise<Readonly<IServerResponseData>> => {
    this.setState({ status: 'loading' })
    try {
      const response = await fetch(
        `${URL_BASE}&q=${this.state.searchInput}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PICS_PER_PAGE}&page=${this.state.page}`,
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

  checkTotalHits = (serverResponse: Readonly<IServerResponseData>) => {
    if (serverResponse.hits.length !== 0) {
      if (serverResponse.totalHits >= 500) {
        if (serverResponse.total < PICS_PER_PAGE * Math.ceil(500 / PICS_PER_PAGE)) {
          this.setState({ totalHits: serverResponse.total })

          return
        }

        this.setState({ totalHits: PICS_PER_PAGE * Math.ceil(500 / PICS_PER_PAGE) })

        return
      }

      this.setState({ totalHits: serverResponse.totalHits })

      return
    }

    console.log('Sorry, there are no images matching your search query. Please try again.')
    this.setState({ totalHits: 0 })
  }

  incrementPages = () => {
    this.setState((prevState) => {
      return { page: prevState.page + 1 }
    })
  }

  handleFormSubmit = (value: Readonly<string>) => {
    this.setState({ searchInput: value, page: 1 })
  }

  handleImageClick = (imageURL: Readonly<string>, tags: Readonly<string>): void => {
    this.setState({ modalURL: imageURL, modalTags: tags })
  }
  handleModalClose = (): void => {
    this.setState({ modalURL: '', isModalOpen: false })
  }

  scrollToBottom = () => {
    this.myref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    })
  }

  render() {
    if (this.state.status === 'idle') {
      return (
        <Container>
          {this.state.isModalOpen && (
            <Modal modalCloseHandler={this.handleModalClose} largeImageUrl={this.state.modalURL}></Modal>
          )}
          <Searchbar submitHandler={this.handleFormSubmit} />
          <div ref={this.myref}></div>
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
          <div ref={this.myref}></div>
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
            {this.state.page !== Math.ceil(this.state.totalHits / PICS_PER_PAGE) &&
              this.state.totalHits >= PICS_PER_PAGE && <Button pageIncrementor={this.incrementPages} />}

            {this.state.totalHits <= PICS_PER_PAGE && (
              <div>
                <p>Sorry, there are no images matching your search query. Please try again.</p>
                {/* <img src='https://i.kym-cdn.com/photos/images/original/001/042/619/4ea.jpg'></img> */}
                <img src='https://i.kym-cdn.com/photos/images/original/000/336/370/361.jpg'></img>
              </div>
            )}
          </Footer>

          <div ref={this.myref}></div>
        </Container>
      )
    } else {
    }
    return (
      <Container>
        {this.state.isModalOpen && (
          <Modal
            modalCloseHandler={this.handleModalClose}
            largeImageUrl={this.state.modalURL}
            imageTags={this.state.modalTags}
          ></Modal>
        )}
        <Searchbar submitHandler={this.handleFormSubmit} />
        <ImageGallery imageClickHandler={this.handleImageClick} picsToRender={this.state.picsToRender}></ImageGallery>
        <Footer>
          {this.state.page !== Math.ceil(this.state.totalHits / PICS_PER_PAGE) && (
            <Button pageIncrementor={this.incrementPages} />
          )}

          <Dna />
        </Footer>
        <div ref={this.myref}></div>
      </Container>
    )
  }
}
