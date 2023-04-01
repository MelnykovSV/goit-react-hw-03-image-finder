import React from 'react'

import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem'
import { Button } from '../Button/Button'
import { IServerResponseData } from '../../interfaces'
import { Modal } from '../Modal/Modal'
import { Container } from './ImageGallery.styled'
import { Dna } from 'react-loader-spinner'

export class ImageGallery extends React.Component {
  state = {
    status: 'idle',
    page: 1,
    totalHits: 0,
    picsToRender: [],
    searchInput: '',

    error: null,
    showModal: false,
  }

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
    if (this.props.searchInput !== prevProps.searchInput) {
      this.setState({ searchInput: this.props.searchInput, page: 1 }, async () => {
        const data = await this.fetchPics()
        this.setState({ picsToRender: data.hits })
      })
      return
    }
    if (this.state.page !== prevState.page && this.state.page !== 1) {
      this.fetchPics().then((data) => {
        this.setState((prevState) => ({ picsToRender: [...prevState.picsToRender, ...data.hits] }))
      })
    }
  }

  fetchPics = async (): Promise<IServerResponseData> => {
    const urlBase = 'https://pixabay.com/api/?key=33543328-1e01a52b77697b8d064c91a7e'

    this.setState({ status: 'loading' })
    try {
      const response = await fetch(
        `${urlBase}&q=${this.state.searchInput}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.state.page}`,
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

        if (serverResponse.total < 520) {
          console.log(`We got ${Math.ceil(serverResponse.total / 40)} pages`)
          console.log(`We got ${serverResponse.total} hits`)
          this.setState({ totalHits: serverResponse.total })

          return
        }

        /// 520+ hits
        console.log(serverResponse)

        console.log(`We got ${13} pages`)
        console.log(`We got ${520} hits`)
        this.setState({ totalHits: 520 })

        return
      }

      /// 1-499            hits
      console.log(`We got ${Math.ceil(serverResponse.totalHits / 40)} pages`)
      console.log(`We got ${serverResponse.totalHits} hits`)
      this.setState({ totalHits: serverResponse.totalHits })

      return
    }

    console.log('Sorry, there are no images matching your search query. Please try again.')
    this.setState({ totalHits: 0 })
  }

  ///new comment

  incrementPages = (e) => {
    console.log('increment')
    this.setState((prevState) => {
      if (Math.ceil(this.totalHits / 40) === prevState.page + 1) {
        e.target.disabled = true
      }

      return { page: prevState.page + 1 }
    })
  }

  render() {
    console.log('gallery render')

    return (
      <Container className='gallery'>
        {!(this.state.page === Math.ceil(this.state.totalHits / 40)) && (
          <Button pageIncrementor={this.incrementPages} />
        )}

        {this.state.picsToRender.map((item) => {
          return (
            <ImageGalleryItem
              webformatURL={item.webformatURL}
              tags={item.tags}
              largeImageURL={item.largeImageURL}
              imageClickHandler={this.props.imageClickHandler}
              key={item.id}
            />
          )
        })}
        {this.state.status === 'loading' && (
          <Dna
            visible={true}
            height='80'
            width='80'
            ariaLabel='dna-loading'
            wrapperStyle={{}}
            wrapperClass='dna-wrapper'
          />
        )}
      </Container>
    )
  }
}
