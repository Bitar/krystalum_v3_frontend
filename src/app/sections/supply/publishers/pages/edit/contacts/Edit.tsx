import {Field, Form, Formik} from 'formik'
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Select from 'react-select'
import {KTCard, KTCardBody} from '../../../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../../../_metronic/helpers/components/KTCardHeader'
import FormErrors from '../../../../../../components/forms/FormErrors'
import KrysFormFooter from '../../../../../../components/forms/KrysFormFooter'
import KrysFormLabel from '../../../../../../components/forms/KrysFormLabel'
import {AlertMessageGenerator} from '../../../../../../helpers/AlertMessageGenerator'
import {
  genericOnChangeHandler,
  genericSingleSelectOnChangeHandler,
} from '../../../../../../helpers/form'
import {generatePageTitle} from '../../../../../../helpers/pageTitleGenerator'
import {submitRequest} from '../../../../../../helpers/requests'
import {Sections} from '../../../../../../helpers/sections'
import {Actions, KrysToastType, PageTypes} from '../../../../../../helpers/variables'
import {PublisherContact} from '../../../../../../models/supply/publisher/PublisherContact'
import {useKrysApp} from '../../../../../../modules/general/KrysApp'
import {
  getPublisherContact,
  updatePublisherContact,
} from '../../../../../../requests/supply/publisher/PublisherContact'
import {useSupply} from '../../../../shared/SupplyContext'
import {
  defaultPublisherContactFormFields,
  PublisherContactFormFields,
  PublisherContactSchema,
} from '../../../core/edit/contacts/form'
import {usePublisher} from '../../../core/PublisherContext'

const PublisherContactEdit: React.FC = () => {
  const {options} = usePublisher()
  const {publisher} = useSupply()
  const krysApp = useKrysApp()

  const {cid} = useParams()

  const [publisherContact, setPublisherContact] = useState<PublisherContact | null>(null)
  const [form, setForm] = useState<PublisherContactFormFields>(defaultPublisherContactFormFields)
  const [formErrors, setFormErrors] = useState<string[]>([])

  const {contactTypes} = options

  useEffect(() => {
    if (publisher && cid) {
      // get the publisher contacts we need to edit from the database
      submitRequest(
        getPublisherContact,
        [publisher, parseInt(cid)],
        (response) => {
          // we were able to fetch current publisher contacts to edit
          setPublisherContact(response)

          // we also set the form to be the publisher's contacts details
          const {contactType, ...currentPublisherContact} = response

          setForm({...currentPublisherContact, type: contactType?.id})
        },
        setFormErrors
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publisher, cid])

  useEffect(() => {
    if (publisherContact) {
      krysApp.setPageTitle(
        generatePageTitle(
          Sections.SUPPLY_PUBLISHER_CONTACTS,
          PageTypes.EDIT,
          publisherContact.detail
        )
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publisherContact])

  const onChangeHandler = (e: any) => {
    genericOnChangeHandler(e, form, setForm)
  }

  const handleEdit = (e: any, fns: any) => {
    if (publisher && publisherContact) {
      // we need to update the contact's data by doing API call with form
      submitRequest(
        updatePublisherContact,
        [publisher, publisherContact.id, form],
        (response) => {
          // we got the updated publisher contacts so we're good
          krysApp.setAlert({
            message: new AlertMessageGenerator(
              'publisher contacts',
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
      <KTCardHeader text='Edit Publisher Contact' />

      <KTCardBody>
        <FormErrors errorMessages={formErrors} />

        <Formik
          initialValues={form}
          validationSchema={PublisherContactSchema}
          onSubmit={handleEdit}
          enableReinitialize
        >
          {({errors}) => (
            <Form onChange={onChangeHandler}>
              <div className='mb-7'>
                <KrysFormLabel text='Contact type' isRequired={true} />

                <Select
                  name='type'
                  value={contactTypes.find((contactType) => contactType.id === form.type)}
                  options={contactTypes}
                  getOptionLabel={(instance) => instance.name}
                  getOptionValue={(instance) => instance.id.toString()}
                  placeholder='Select type'
                  onChange={(e) => {
                    genericSingleSelectOnChangeHandler(e, form, setForm, 'type')
                  }}
                />

                <div className='mt-1 text-danger'>{errors?.type ? errors?.type : null}</div>
              </div>

              <div className='mb-7'>
                <KrysFormLabel text='Contact detail' isRequired={true} />

                <Field
                  className='form-control fs-base'
                  type='text'
                  placeholder='Enter contact detail (address, email address or phone)'
                  name='detail'
                />

                <div className='mt-1 text-danger'>{errors?.detail ? errors?.detail : null}</div>
              </div>

              <KrysFormFooter cancelUrl={`/supply/publishers/${publisher?.id}/edit`} />
            </Form>
          )}
        </Formik>
      </KTCardBody>
    </KTCard>
  )
}

export default PublisherContactEdit
