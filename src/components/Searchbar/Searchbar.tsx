import { ISearchbarProps } from '../../interfaces'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import { Container } from './Searchbar.styled'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { BiSearchAlt2 } from 'react-icons/bi'

export const Searchbar = (props: ISearchbarProps) => {
  const formSubmit = async (values: { searchInput: string }) => {
    const isValid = await schema.isValid(values)

    if (isValid) {
      props.submitHandler(values.searchInput)
    }
  }

  const schema = yup.object().shape({
    searchInput: yup
      .string()
      .min(3, () => {
        notify('Search query must be at least 3 characters long')
      })
      .required(() => {
        notify('This field is required')
      })
      .trim(),
  })

  const notify = (message: string) => toast.error(message)

  return (
    <Container className='searchbar'>
      <Formik initialValues={{ searchInput: '' }} onSubmit={formSubmit}>
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
      <ToastContainer />
    </Container>
  )
}
