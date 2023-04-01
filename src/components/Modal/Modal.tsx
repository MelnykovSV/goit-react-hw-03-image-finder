import React from 'react'
import { Container } from './Modal.styled'
import { createPortal } from 'react-dom'
import { ThreeCircles } from 'react-loader-spinner'

const modalRoot = document.querySelector('#modal-root')

export class Modal extends React.Component {
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
