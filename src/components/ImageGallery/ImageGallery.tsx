import React from 'react'

export class ImageGallery extends React.Component {
  fetchPics = async () => {
    const urlBase = 'https://pixabay.com/api/?key=33543328-1e01a52b77697b8d064c91a7e'

    const response = await fetch(
      `${urlBase}&q=${this.state.valueToSearch}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.state.page}`,
    )

    ///Адаптировать под кнопку, там нет значения value

    const data = await response.json()

    this.setState({ picsToRender: data.hits })
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
}
