import React from 'react'
import { IButtonProps } from '../../interfaces'
import { Container } from './Button.styled'

export class Button extends React.Component<Readonly<IButtonProps>> {
  render() {
    return (
      <Container type='button' onClick={this.props.pageIncrementor}>
        Get more
      </Container>
    )
  }
}
