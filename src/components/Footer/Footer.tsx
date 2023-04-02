import React from 'react'
import { IFooter } from '../../interfaces'

export class Footer extends React.Component<Readonly<IFooter>> {
  render() {
    return <footer>{this.props.children}</footer>
  }
}
