import React from 'react'
import { Container } from './ImageGalleryItem.styled'

export class ImageGalleryItem extends React.Component {
  state = {
    largeImageURL: this.props.largeImageURL,
  }

  imageUrlDetector = () => {
    console.log(this.state.largeImageURL)
    this.props.imageClickHandler(this.state.largeImageURL)
  }
  render() {
    return (
      <Container className='gallery-item' onClick={this.imageUrlDetector}>
        <img src={this.props.webformatURL} alt={this.props.tags} />
      </Container>
    )
  }
}
