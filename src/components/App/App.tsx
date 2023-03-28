import React from 'react'
import { IAppState } from '../../interfaces'

import { Searchbar } from '../Searchbar/Searchbar'

export class App extends React.Component<{}, IAppState> {
  state = {
    response: [],
    page: 0,
    loading: false,
  }

  handleFormSubmit = (serverResponce) => {
    this.setState({ response: serverResponce })
  }

  render() {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        React homework template
        <Searchbar submitHandler={this.handleFormSubmit} />
      </div>
    )
  }
}
