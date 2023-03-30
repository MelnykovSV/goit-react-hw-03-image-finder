import React from 'react'

export class ImageGalleryItem extends React.Component {
  render() {
    return (
      <li className='gallery-item'>
        <img src={this.props.webformatURL} alt={this.props.tegs} />
      </li>
    )
  }
}
