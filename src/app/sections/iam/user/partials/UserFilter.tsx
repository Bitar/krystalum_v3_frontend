import {useQueryRequest} from '../../../../modules/table/QueryRequestProvider'
import React, {useState} from 'react'
import {initialQueryState, KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {Field, Form, Formik} from 'formik'
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader'

type UserFilterObj = {
  name: string
  email: string
}

const initUserFilterObj = {
  name: '',
  email: '',
}

export const UserFilter = () => {
  const {updateState} = useQueryRequest()

  const [userFilters, setUserFilters] = useState<UserFilterObj>(initUserFilterObj)

  const handleOnChange = (e: any) => {
    setUserFilters({
      ...userFilters,
      ...{[e.target.name]: e.target.value},
    })
  }

  const filterData = () => {
    updateState({
      filter: userFilters,
      ...initialQueryState,
    })
  }

  return (
    <KTCard id='filter-container' className='bg-transparent mb-10' shadow={false} border={true}>
      <KTCardHeader text={'Filters'} bg={'info'} text_color={'white'} />
      <Formik initialValues={userFilters} onSubmit={filterData} enableReinitialize>
        <Form onChange={handleOnChange} className='form'>
          <KTCardBody>
            <div className='row'>
              <div className='col-lg-4'>
                <Field
                  type='text'
                  name='name'
                  placeholder='Name'
                  className={'form-control mb-3 mb-lg-0'}
                  autoComplete='off'
                />
              </div>

              <div className='col-lg-4'>
                <Field
                  type='text'
                  name='email'
                  placeholder='Email'
                  className={'form-control mb-3 mb-lg-0'}
                  autoComplete='off'
                />
              </div>
            </div>
          </KTCardBody>
          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button type='submit' className='btn btn-secondary btn-active-secondary btn-sm'>
              <span className='indicator-label'>Filter</span>
            </button>
          </div>
        </Form>
      </Formik>
    </KTCard>
  )
}
