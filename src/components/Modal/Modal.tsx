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
  componentDidMount(): void {}

  componentWillUnmount(): void {}

  render() {
    return createPortal(
      <Container>
        <div>
          <button type='button' onClick={this.props.modalCloseHandler}>
            Close
          </button>

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
            alt=''
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
