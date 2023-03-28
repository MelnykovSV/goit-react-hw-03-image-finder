import React from 'react'
import { ISearchbarProps } from '../../interfaces'

export class Searchbar extends React.Component<ISearchbarProps> {
  formSubmit = (e) => {
    e.preventDefault()
    this.fetchPics(e).then((data) => {
      console.log(data)
      this.props.submitHandler(data)
      this.props.totalHitsChecker(data)
    })
  }

  fetchPics = async (e) => {
    const urlBase = 'https://pixabay.com/api/?key=33543328-1e01a52b77697b8d064c91a7e'
    const response = await fetch(
      `${urlBase}&q=${
        e.target.elements.searchInput.value
      }&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${1}`,
    )

    const data = await response.json()

    return data
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
