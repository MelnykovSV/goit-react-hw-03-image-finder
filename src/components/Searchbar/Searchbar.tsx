import React from 'react'
import { ISearchbarProps } from '../../interfaces'
import { Formik, Form, Field } from 'formik'
import { Container } from './Searchbar.styled'

import { BiSearchAlt2 } from 'react-icons/bi'

export class Searchbar extends React.Component<ISearchbarProps> {
  formSubmit = async (values: { searchInput: string }) => {
    this.props.submitHandler(values.searchInput)
  }

  render() {
    return (
      <Container className='searchbar'>
        <Formik initialValues={{ searchInput: '' }} onSubmit={this.formSubmit}>
          <Form className='form'>
            <button type='submit' className='button'>
              <span className='button-label'>Search</span>
              <BiSearchAlt2 />
            </button>

            <Field
              className='input'
              type='text'
              autoComplete='off'
              name='searchInput'
              autoFocus
              placeholder='Search images and photos'
            />
          </Form>
        </Formik>
      </Container>
    )
  }
}
