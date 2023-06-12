import {Form, Formik} from 'formik'
import React, {useEffect, useState} from 'react'
import {FormControl, FormGroup} from 'react-bootstrap'
import FormErrors from '../../../../../../../components/forms/FormErrors'
import KrysFormFooter from '../../../../../../../components/forms/KrysFormFooter'
import KrysFormLabel from '../../../../../../../components/forms/KrysFormLabel'
import {AlertMessageGenerator} from '../../../../../../../helpers/AlertMessageGenerator'
import {genericOnChangeHandler} from '../../../../../../../helpers/form'
import {submitRequest} from '../../../../../../../helpers/requests'
import {Actions, KrysToastType} from '../../../../../../../helpers/variables'
import {useKrysApp} from '../../../../../../../modules/general/KrysApp'
import {
  getPublicationCampaignRestrictionMeta,
  storePublicationCampaignRestrictionMeta,
} from '../../../../../../../requests/supply/publication/PublisherCampaignRestrictionMeta'
import {
  defaultPublicationCampaignRestrictionMetaFormFields,
  PublicationCampaignRestrictionMetaFormFields,
  PublicationCampaignRestrictionMetaSchema,
} from '../../../../core/edit/restrictions/form'
import {usePublicationEdit} from '../../../../core/PublicationEditContext'

const PublicationCampaignRestrictionMetaCreate: React.FC = () => {
  const {publication} = usePublicationEdit()
  const krysApp = useKrysApp()

  const [form, setForm] = useState<PublicationCampaignRestrictionMetaFormFields>(
    defaultPublicationCampaignRestrictionMetaFormFields
  )
  const [formErrors, setFormErrors] = useState<string[]>([])

  useEffect(() => {
    if (publication) {
      // get the publication restriction meta
      submitRequest(
        getPublicationCampaignRestrictionMeta,
        [publication],
        (response) => {
          // set the form to be the publication's restriction meta details
          const {campaign_restriction_meta} = response

          setForm({campaign_restriction_meta: campaign_restriction_meta})
        },
        setFormErrors
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChangeHandler = (e: any) => {
    genericOnChangeHandler(e, form, setForm)
  }

  const handleCreate = () => {
    if (publication) {
      // send API request to create the publication campaign restriction meta
      submitRequest(
        storePublicationCampaignRestrictionMeta,
        [publication, form],
        (response) => {
          // we were able to store the publication campaign restriction meta
          krysApp.setAlert({
            message: new AlertMessageGenerator(
              'publication campaign restriction meta',
              Actions.CREATE,
              KrysToastType.SUCCESS
            ).message,
            type: KrysToastType.SUCCESS,
          })

          // set the form to be the publication's restriction meta details
          const {campaign_restriction_meta} = response

          setForm({campaign_restriction_meta: campaign_restriction_meta})

          // we need to clear the form data
          setFormErrors([])
        },
        setFormErrors
      )
    }
  }

  return (
    <>
      <div className='mb-4'>
        <span className='fs-5 text-gray-700 d-flex fw-medium'>
          New Campaign Restriction Record Creation Form
        </span>
        <span className='text-muted'>
          Include additional meta restrictions that provide further limitations or conditions
        </span>
      </div>

      <FormErrors errorMessages={formErrors} />

      <Formik
        initialValues={form}
        validationSchema={PublicationCampaignRestrictionMetaSchema}
        onSubmit={handleCreate}
        enableReinitialize
      >
        {({errors}) => (
          <Form onChange={onChangeHandler}>
            <div className='mb-7'>
              <KrysFormLabel text='Campaign restrictions meta' isRequired={false} />

              <FormGroup>
                <FormControl
                  as='textarea'
                  rows={6}
                  name='campaign_restriction_meta'
                  className='form-control fs-base'
                  placeholder='Enter publication campaign restriction meta'
                  value={form.campaign_restriction_meta}
                />
              </FormGroup>

              <div className='mt-1 text-danger'>
                {errors?.campaign_restriction_meta ? errors?.campaign_restriction_meta : null}
              </div>
            </div>

            <KrysFormFooter cancelUrl='/supply/publications' />
          </Form>
        )}
      </Formik>
    </>
  )
}

export default PublicationCampaignRestrictionMetaCreate
