import React from 'react'
import { ISearchbarProps } from '../../interfaces'
import { Container } from './Searchbar.styled'

export class Searchbar extends React.Component<ISearchbarProps> {
  formSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      searchInput: { value: string }
    }

    this.props.submitHandler(target.searchInput.value)
  }

  render() {
    console.log('searchbar render')
    return (
      <Container className='searchbar'>
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
      </Container>
    )
  }
}
