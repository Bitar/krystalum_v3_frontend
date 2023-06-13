import {Form, Formik} from 'formik'
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Select from 'react-select'
import {KTCard, KTCardBody} from '../../../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../../../_metronic/helpers/components/KTCardHeader'
import FormErrors from '../../../../../../components/forms/FormErrors'
import KrysFormFooter from '../../../../../../components/forms/KrysFormFooter'
import KrysFormLabel from '../../../../../../components/forms/KrysFormLabel'
import {AlertMessageGenerator} from '../../../../../../helpers/AlertMessageGenerator'
import {filterData} from '../../../../../../helpers/dataManipulation'
import {
  genericOnChangeHandler,
  genericSingleSelectOnChangeHandler,
} from '../../../../../../helpers/form'
import {generatePageTitle} from '../../../../../../helpers/pageTitleGenerator'
import {submitRequest} from '../../../../../../helpers/requests'
import {Sections} from '../../../../../../helpers/sections'
import {Actions, KrysToastType, PageTypes} from '../../../../../../helpers/variables'
import {AdServer} from '../../../../../../models/misc/AdServer'
import {useKrysApp} from '../../../../../../modules/general/KrysApp'
import {
  getPublicationAdServer,
  updatePublicationAdServer,
} from '../../../../../../requests/supply/publication/PublicationAdServer'
import {
  defaultPublicationAdServerEditFormFields,
  PublicationAdServerEditFormFields,
  publicationAdServerSchema,
} from '../../../core/edit/ad-servers/form'
import {usePublication} from '../../../core/PublicationContext'
import {usePublicationEdit} from '../../../core/PublicationEditContext'

const PublicationAdServerEdit: React.FC = () => {
  const {cid} = useParams()

  const {options} = usePublication()
  const {publication} = usePublicationEdit()
  const krysApp = useKrysApp()

  const [form, setForm] = useState<PublicationAdServerEditFormFields>(
    defaultPublicationAdServerEditFormFields
  )
  const [formErrors, setFormErrors] = useState<string[]>([])

  const [publicationAdServer, setPublicationAdServer] = useState<AdServer | null>(null)
  const [filteredAdServers, setFilteredAdServers] = useState<AdServer[]>([])

  const {adServers} = options

  useEffect(() => {
    if (publication && cid) {
      // get the publication ad server we need to edit from the database
      submitRequest(
        getPublicationAdServer,
        [publication, parseInt(cid)],
        (response) => {
          // we were able to fetch current publication ad server to edit
          setPublicationAdServer(response)

          // we are getting the response as ad sever and not publication ad server
          // response is: {id, name}
          setForm({ad_server_id: response.id})
        },
        setFormErrors
      )

      const excludedAdServersNames: string[] = publication.adServers
        ? publication.adServers?.map((adServer) => adServer.name)
        : []

      setFilteredAdServers(filterData(adServers, 'name', excludedAdServersNames))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publication, cid])

  useEffect(() => {
    if (publicationAdServer) {
      krysApp.setPageTitle(
        generatePageTitle(
          Sections.SUPPLY_PUBLICATION_AD_SERVERS,
          PageTypes.EDIT,
          `${publication?.name} - ${publicationAdServer.name}`
        )
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicationAdServer])

  const onChangeHandler = (e: any) => {
    genericOnChangeHandler(e, form, setForm)
  }

  const handleEdit = (e: any, fns: any) => {
    if (publication && publicationAdServer) {
      // we need to update the publication ad server's data by doing API call with form
      submitRequest(
        updatePublicationAdServer,
        [publication, publicationAdServer.id, form],
        (response) => {
          // we got the updated publication ad server so we're good
          krysApp.setAlert({
            message: new AlertMessageGenerator(
              'publication ad server',
              Actions.EDIT,
              KrysToastType.SUCCESS
            ).message,
            type: KrysToastType.SUCCESS,
          })
        },
        setFormErrors,
        fns
      )
    }
  }

  return (
    <KTCard>
      <KTCardHeader text='Edit Publication Ad Server' />

      <KTCardBody>
        <FormErrors errorMessages={formErrors} />

        <Formik
          initialValues={form}
          validationSchema={publicationAdServerSchema(true)}
          onSubmit={handleEdit}
          enableReinitialize
        >
          {({errors}) => (
            <Form onChange={onChangeHandler}>
              <div className='mb-7'>
                <KrysFormLabel text='Ad Server' isRequired={true} />

                <Select
                  name='ad_server_id'
                  value={filteredAdServers.find((adServer) => adServer.id === form.ad_server_id)}
                  options={filteredAdServers}
                  getOptionLabel={(instance) => instance.name}
                  getOptionValue={(instance) => instance.id.toString()}
                  placeholder='Select ad server'
                  onChange={(e) => {
                    genericSingleSelectOnChangeHandler(e, form, setForm, 'ad_server_id')
                  }}
                />

                <div className='mt-1 text-danger'>
                  {errors?.ad_server_id ? errors?.ad_server_id : null}
                </div>
              </div>

              <KrysFormFooter cancelUrl={`/supply/publications/${publication?.id}/edit`} />
            </Form>
          )}
        </Formik>
      </KTCardBody>
    </KTCard>
  )
}

export default PublicationAdServerEdit
