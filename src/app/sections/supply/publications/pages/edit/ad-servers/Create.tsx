import axios from 'axios'
import {Form, Formik} from 'formik'
import React, {useEffect, useRef, useState} from 'react'
import Select from 'react-select'
import {KTCard, KTCardBody, QUERIES} from '../../../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../../../_metronic/helpers/components/KTCardHeader'
import FormErrors from '../../../../../../components/forms/FormErrors'
import KrysFormFooter from '../../../../../../components/forms/KrysFormFooter'
import KrysFormLabel from '../../../../../../components/forms/KrysFormLabel'
import KrysInnerTable from '../../../../../../components/tables/KrysInnerTable'
import {AlertMessageGenerator} from '../../../../../../helpers/AlertMessageGenerator'
import {filterData} from '../../../../../../helpers/dataManipulation'
import {
  GenericErrorMessage,
  genericMultiSelectOnChangeHandler,
  genericOnChangeHandler,
} from '../../../../../../helpers/form'
import {extractErrors} from '../../../../../../helpers/requests'
import {Actions, KrysToastType} from '../../../../../../helpers/variables'
import {AdServer} from '../../../../../../models/misc/AdServer'

import {useKrysApp} from '../../../../../../modules/general/KrysApp'
import {
  getPublicationAdServers,
  storePublicationAdServer,
} from '../../../../../../requests/supply/publication/PublicationAdServer'
import {
  defaultPublicationAdServerFormFields,
  PublicationAdServerFormFields,
  publicationAdServerSchema,
} from '../../../core/edit/ad-servers/form'
import {PublicationAdServersColumns} from '../../../core/edit/ad-servers/TableColumns'
import {usePublication} from '../../../core/PublicationContext'
import {usePublicationEdit} from '../../../core/PublicationEditContext'

const PublicationAdServerCreate: React.FC = () => {
  const {options} = usePublication()
  const {publication, setPublication} = usePublicationEdit()
  const krysApp = useKrysApp()

  const [form, setForm] = useState<PublicationAdServerFormFields>(
    defaultPublicationAdServerFormFields
  )
  const [formErrors, setFormErrors] = useState<string[]>([])
  const [refreshTable, setRefreshTable] = useState<boolean>(false)

  const [filteredAdServers, setFilteredAdServers] = useState<AdServer[]>([])

  const adServersSelectRef = useRef<any>(null)

  const {adServers} = options

  useEffect(() => {
    if (publication) {
      const excludedAdServersNames: string[] = publication.adServers
        ? publication.adServers?.map((adServer) => adServer.name)
        : []

      setFilteredAdServers(filterData(adServers, 'name', excludedAdServersNames))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publication])

  const multiSelectChangeHandler = (e: any, key: string) => {
    genericMultiSelectOnChangeHandler(e, form, setForm, key)
  }

  const onChangeHandler = (e: any) => {
    // as long as we are updating the create form, we should set the table refresh to false
    setRefreshTable(false)

    genericOnChangeHandler(e, form, setForm)
  }

  const handleCreate = () => {
    if (publication) {
      // as long as we are updating the create form, we should set the table refresh to false
      setRefreshTable(false)

      // send API request to create the publication ad servers
      storePublicationAdServer(publication, form).then((response) => {
        if (axios.isAxiosError(response)) {
          // we need to show the errors
          setFormErrors(extractErrors(response))
        } else if (response === undefined) {
          // show generic error message
          setFormErrors([GenericErrorMessage])
        } else {
          // we were able to store the publication ad servers
          krysApp.setAlert({
            message: new AlertMessageGenerator(
              'publication ad server',
              Actions.CREATE,
              KrysToastType.SUCCESS
            ).message,
            type: KrysToastType.SUCCESS,
          })

          // set the updated publication with its all ad servers so that the dropdown will be updated and
          // the new added ad servers will be excluded from the dropdown
          setPublication(response)

          // now that we have a new record successfully we need to refresh the table
          setRefreshTable(true)

          // clear the selected values from dropdown
          adServersSelectRef.current?.clearValue()

          // we need to clear the form data
          setForm(defaultPublicationAdServerFormFields)

          // we need to clear the form data
          setFormErrors([])
        }
      })
    }
  }

  return (
    <KTCard className='card-bordered border-1'>
      <KTCardHeader text='Add New Ad Server' />

      <KTCardBody>
        <FormErrors errorMessages={formErrors} />

        <Formik
          initialValues={form}
          validationSchema={publicationAdServerSchema(false)}
          onSubmit={handleCreate}
          enableReinitialize
        >
          {({errors}) => (
            <Form onChange={onChangeHandler}>
              <div className='mb-7'>
                <KrysFormLabel text='Ad servers' isRequired={true} />

                <Select
                  isMulti
                  name='ad_server_ids'
                  options={filteredAdServers}
                  getOptionLabel={(adServer) => adServer.name}
                  getOptionValue={(adServer) => adServer.id.toString()}
                  onChange={(e) => {
                    multiSelectChangeHandler(e, 'ad_server_ids')
                  }}
                  placeholder='Select one or more ad servers'
                  ref={adServersSelectRef}
                />

                <div className='mt-1 text-danger'>
                  {errors?.ad_server_ids ? errors?.ad_server_ids : null}
                </div>
              </div>

              <KrysFormFooter cancelUrl={'/supply/publications'} />
            </Form>
          )}
        </Formik>

        <div className='separator separator-dashed my-10'></div>

        {publication && (
          <KrysInnerTable
            doRefetch={refreshTable}
            slug='publication-ad-servers'
            queryId={QUERIES.PUBLICATION_AD_SERVERS_LIST}
            requestFunction={getPublicationAdServers}
            requestId={publication.id}
            columnsArray={PublicationAdServersColumns}
          ></KrysInnerTable>
        )}
      </KTCardBody>
    </KTCard>
  )
}

export default PublicationAdServerCreate
