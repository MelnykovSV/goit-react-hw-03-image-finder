import React from 'react'
import { IFooter } from '../../interfaces'

import { Container } from './Footer.styled'

export class Footer extends React.Component<Readonly<IFooter>> {
  render() {
    return <Container>{this.props.children}</Container>
  }
}
