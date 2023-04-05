import React from 'react'
import { createPortal } from 'react-dom'

import { IModalProps, IModalState } from '../../interfaces'

import { ThreeCircles } from 'react-loader-spinner'

import { Container } from './Modal.styled'

const modalRoot: Element | DocumentFragment = document.querySelector('#modal-root')!

export class Modal extends React.Component<Readonly<IModalProps>, Readonly<IModalState>> {
  state = {
    showLoader: true,
  }

  componentDidMount(): void {
    document.addEventListener('keydown', this.keyDownHandler)
  }

  componentWillUnmount(): void {
    document.removeEventListener('keydown', this.keyDownHandler)
  }

  keyDownHandler = (e: KeyboardEvent) => {
    if (e.keyCode === 27) {
      this.props.modalCloseHandler()
    }
  }

  clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const nodeName = e.target as HTMLDivElement
    if (nodeName.nodeName === 'DIV') {
      this.props.modalCloseHandler()
    }
  }

  render() {
    return createPortal(
      <Container onClick={this.clickHandler}>
        <div>
          {this.state.showLoader && (
            <ThreeCircles
              height='100'
              width='100'
              color='#4fa94d'
              wrapperStyle={{}}
              wrapperClass=''
              visible={true}
              ariaLabel='three-circles-rotating'
              outerCircleColor='red'
              innerCircleColor='green'
              middleCircleColor='blue'
            />
          )}
          <img
            src={this.props.largeImageUrl}
            alt={this.props.imageTags}
            className='modal-image'
            onLoad={() => {
              this.setState({ showLoader: false })
            }}
          />
        </div>
      </Container>,
      modalRoot,
    )
  }
}
