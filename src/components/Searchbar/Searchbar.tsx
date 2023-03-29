import React from 'react'
import { ISearchbarProps } from '../../interfaces'

export class Searchbar extends React.Component<ISearchbarProps> {
  formSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const data = await this.props.fetchHandler(e)
    console.log(data)
    this.props.pagesReseter()

    this.props.submitHandler(data)
    this.props.totalHitsChecker(data)
  }

  render() {
    return (
      <header className='searchbar'>
        <form className='form' onSubmit={this.formSubmit}>
          <button type='submit' className='button'>
            <span className='button-label'>Search</span>
          </button>

          <input
            className='input'
            type='text'
            autoComplete='off'
            name='searchInput'
            autoFocus
            placeholder='Search images and photos'
          />
        </form>
      </header>
    )
  }
}
