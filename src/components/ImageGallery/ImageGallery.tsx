import React from 'react'
import { IImageGalleryProps } from '../../interfaces'
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem'
import { Container } from './ImageGallery.styled'

export class ImageGallery extends React.Component<Readonly<IImageGalleryProps>> {
  render() {
    return (
      <Container className='gallery'>
        {this.props.picsToRender.map((item) => {
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
      </Container>
    )
  }
}
