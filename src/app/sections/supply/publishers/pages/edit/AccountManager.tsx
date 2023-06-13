import {Form, Formik} from 'formik'
import React, {useEffect, useRef, useState} from 'react'
import Select from 'react-select'
import {KTCard, KTCardBody, QUERIES} from '../../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../../_metronic/helpers/components/KTCardHeader'

import FormErrors from '../../../../../components/forms/FormErrors'
import KrysFormFooter from '../../../../../components/forms/KrysFormFooter'
import KrysFormLabel from '../../../../../components/forms/KrysFormLabel'
import KrysInnerTable from '../../../../../components/tables/KrysInnerTable'
import {RoleEnum} from '../../../../../enums/RoleEnum'
import {AlertMessageGenerator} from '../../../../../helpers/AlertMessageGenerator'
import {
  genericOnChangeHandler,
  genericSingleSelectOnChangeHandler,
} from '../../../../../helpers/form'
import {submitRequest} from '../../../../../helpers/requests'
import {Actions, KrysToastType} from '../../../../../helpers/variables'
import {User} from '../../../../../models/iam/User'
import {useAuth} from '../../../../../modules/auth'
import {useKrysApp} from '../../../../../modules/general/KrysApp'
import {getAllUsers} from '../../../../../requests/iam/User'
import {
  getPublisherAccountManagers,
  storePublisherAccountManager,
} from '../../../../../requests/supply/publisher/PublisherAccountManager'
import {useSupply} from '../../../shared/SupplyContext'
import {
  defaultPublisherAccountManagerFormFields,
  PublisherAccountManagerFormFields,
  PublisherAccountManagerSchema,
} from '../../core/edit/account-managers/form'
import {PublisherAccountManagersColumns} from '../../core/edit/account-managers/TableColumns'

const PublisherAccountManager: React.FC = () => {
  const {currentUser, hasAnyRoles} = useAuth()
  const {publisher} = useSupply()
  const krysApp = useKrysApp()

  const [form, setForm] = useState<PublisherAccountManagerFormFields>(
    defaultPublisherAccountManagerFormFields
  )
  const [formErrors, setFormErrors] = useState<string[]>([])

  const [refreshTable, setRefreshTable] = useState<boolean>(false)

  const [allAccountManagers, setAllAccountManagers] = useState<User[]>([])
  const [accountManagers, setAccountManagers] = useState<User[]>([])

  const accountManagersSelectRef = useRef<any>(null)

  useEffect(() => {
    if (publisher && !hasAnyRoles(currentUser, [RoleEnum.PUBLISHER])) {
      // get all the account manager users
      submitRequest(
        getAllUsers,
        ['filter[roles][]=12&filter[roles][]=5'],
        (response) => {
          setAllAccountManagers(response)
          setAccountManagers(
            response.filter((user: User) => user.id !== publisher.accountManager?.id)
          )
        },
        setFormErrors
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publisher])

  const selectChangeHandler = (e: any, key: string) => {
    genericSingleSelectOnChangeHandler(e, form, setForm, key)
  }

  const onChangeHandler = (e: any) => {
    // as long as we are updating the create form, we should set the table refresh to false
    setRefreshTable(false)

    genericOnChangeHandler(e, form, setForm)
  }

  const handleCreate = (e: any, fns: any) => {
    if (publisher) {
      // send API request to create the publisher account manager
      submitRequest(
        storePublisherAccountManager,
        [publisher, form],
        (response) => {
          // we were able to store the publisher account manager
          krysApp.setAlert({
            message: new AlertMessageGenerator(
              'publisher account manager',
              Actions.CREATE,
              KrysToastType.SUCCESS
            ).message,
            type: KrysToastType.SUCCESS,
          })

          // now that we have a new record successfully we need to refresh the table
          setRefreshTable(true)

          // refresh the dropdown options to remove the added user
          setAccountManagers(allAccountManagers.filter((user) => user.id !== response.id))

          // clear the selected values from dropdown
          accountManagersSelectRef.current?.clearValue()

          // we need to clear the form data
          setForm(defaultPublisherAccountManagerFormFields)

          // we need to clear the form data
          setFormErrors([])
        },
        setFormErrors,
        fns
      )
    }
  }

  return (
    <KTCard className='card-bordered border-1'>
      <KTCardHeader text='Add New Account Manager' />

      <KTCardBody>
        <FormErrors errorMessages={formErrors} />

        <Formik
          initialValues={form}
          validationSchema={PublisherAccountManagerSchema}
          onSubmit={handleCreate}
          enableReinitialize
        >
          {({errors}) => (
            <Form onChange={onChangeHandler}>
              <div className='mb-7'>
                <KrysFormLabel text='Account manager' isRequired={true} />

                <Select
                  name='user_id'
                  options={accountManagers}
                  getOptionLabel={(instance) => instance.name}
                  getOptionValue={(instance) => instance.id.toString()}
                  placeholder='Select an account manager'
                  onChange={(e) => {
                    genericSingleSelectOnChangeHandler(e, form, setForm, 'user_id')
                  }}
                />

                <div className='mt-1 text-danger'>{errors?.user_id ? errors?.user_id : null}</div>
              </div>

              <KrysFormFooter cancelUrl='/supply/publishers' />
            </Form>
          )}
        </Formik>

        <div className='separator separator-dashed my-10'></div>

        {!hasAnyRoles(currentUser, [RoleEnum.PUBLISHER]) && publisher && (
          <KrysInnerTable
            doRefetch={refreshTable}
            slug='publisher-account-managers'
            queryId={QUERIES.PUBLISHER_ACCOUNT_MANAGERS_LIST}
            requestFunction={getPublisherAccountManagers}
            requestId={publisher.id}
            columnsArray={PublisherAccountManagersColumns}
            showSearchFilter={false}
          ></KrysInnerTable>
        )}
      </KTCardBody>
    </KTCard>
  )
}

export default PublisherAccountManager
