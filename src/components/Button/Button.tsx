import React from 'react'
import { IButtonProps } from '../../interfaces'

export class Button extends React.Component<IButtonProps> {
  // buttonClickHandler = async (e: React.SyntheticEvent) => {
  //   console.log(this.props)
  //   this.props.pagesIncrementor()
  //   const data = await this.props.fetchHandler(e)
  //   console.log(data)

  //   // this.props.submitHandler(data)
  // }

  render() {
    return (
      <button type='button' onClick={this.props.pageIncrementor}>
        Get more
      </button>
    )
  }
}
