import axios from 'axios'
import {Form, Formik} from 'formik'
import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {KTCard, KTCardBody} from '../../../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../../../_metronic/helpers/components/KTCardHeader'
import FormErrors from '../../../../../../components/forms/FormErrors'
import KrysFormFooter from '../../../../../../components/forms/KrysFormFooter'
import KrysFormLabel from '../../../../../../components/forms/KrysFormLabel'
import KrysRadioButton from '../../../../../../components/forms/KrysRadioButton'
import MultiSelect from '../../../../../../components/forms/MultiSelect'
import {GeoTypeEnum} from '../../../../../../enums/Supply/GeoTypeEnum'
import {AlertMessageGenerator} from '../../../../../../helpers/AlertMessageGenerator'
import {GenericErrorMessage, genericOnChangeHandler} from '../../../../../../helpers/form'
import {generatePageTitle} from '../../../../../../helpers/pageTitleGenerator'
import {extractErrors} from '../../../../../../helpers/requests'
import {Sections} from '../../../../../../helpers/sections'
import {Actions, KrysToastType, PageTypes} from '../../../../../../helpers/variables'
import {PublicationCampaignRestriction} from '../../../../../../models/supply/publication/PublicationCampaignRestriction'
import {useKrysApp} from '../../../../../../modules/general/KrysApp'
import {
  getPublicationCampaignRestriction,
  updatePublicationCampaignRestriction,
} from '../../../../../../requests/supply/publication/PublisherCampaignRestriction'
import {
  defaultPublicationCampaignRestrictionFormFields,
  fillEditForm,
  PublicationCampaignRestrictionFormFields,
  publicationCampaignRestrictionSchema,
} from '../../../core/edit/restrictions/form'
import {usePublication} from '../../../core/PublicationContext'
import {usePublicationEdit} from '../../../core/PublicationEditContext'

const PublicationCampaignRestrictionEdit: React.FC = () => {
  const {cid} = useParams()
  const navigate = useNavigate()

  const {options} = usePublication()
  const {publication, editOptions} = usePublicationEdit()
  const krysApp = useKrysApp()

  const [form, setForm] = useState<PublicationCampaignRestrictionFormFields>(
    defaultPublicationCampaignRestrictionFormFields
  )
  const [formErrors, setFormErrors] = useState<string[]>([])
  const [isResourceLoaded, setIsResourceLoaded] = useState<boolean>(false)

  const [publicationCampaignRestriction, setPublicationCampaignRestriction] =
    useState<PublicationCampaignRestriction | null>(null)

  const {formats, regions, countries} = options
  const {campaignTypes, websitePages, campaignRestrictionRequirements} = editOptions

  useEffect(() => {
    if (publication && cid) {
      // get the publication campaign restriction we need to edit from the database
      getPublicationCampaignRestriction(publication, parseInt(cid)).then((response) => {
        if (axios.isAxiosError(response)) {
          // we were not able to fetch the publication campaign restriction to edit so we need to redirect
          // to error page
          navigate('/error/404')
        } else if (response === undefined) {
          navigate('/error/400')
        } else {
          // we were able to fetch current publication campaign restriction to edit
          setPublicationCampaignRestriction(response)

          // we also set the form to be the publication's campaign restriction details
          setForm(fillEditForm(response))
        }
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publication, cid])

  useEffect(() => {
    if (publicationCampaignRestriction) {
      setIsResourceLoaded(true)

      krysApp.setPageTitle(
        generatePageTitle(
          Sections.SUPPLY_PUBLICATION_CAMPAIGN_RESTRICTION,
          PageTypes.EDIT,
          `${publication?.name}'s campaign restriction`
        )
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicationCampaignRestriction])

  const onChangeHandler = (e: any) => {
    genericOnChangeHandler(e, form, setForm)
  }

  const handleEdit = () => {
    if (publication && publicationCampaignRestriction) {
      // we need to update the campaign restriction data by doing API call with form
      updatePublicationCampaignRestriction(
        publication,
        publicationCampaignRestriction.id,
        form
      ).then((response) => {
        if (axios.isAxiosError(response)) {
          // show errors
          setFormErrors(extractErrors(response))
        } else if (response === undefined) {
          // show generic error
          setFormErrors([GenericErrorMessage])
        } else {
          // we got the updated publication campaign restriction so we're good
          krysApp.setAlert({
            message: new AlertMessageGenerator(
              'publication campaign restriction',
              Actions.EDIT,
              KrysToastType.SUCCESS
            ).message,
            type: KrysToastType.SUCCESS,
          })

          navigate(`/supply/publications/${publication.id}/edit`)
        }
      })
    }
  }

  return (
    <KTCard>
      <KTCardHeader text='Edit Publication Campaign Restriction' />

      <KTCardBody>
        <FormErrors errorMessages={formErrors} />

        <Formik
          initialValues={form}
          validationSchema={publicationCampaignRestrictionSchema(true)}
          onSubmit={handleEdit}
          enableReinitialize
        >
          {({errors}) => (
            <Form onChange={onChangeHandler}>
              <div className='mb-7'>
                <KrysRadioButton
                  name='geo_type'
                  label={'Regions'}
                  onChangeHandler={(e) => {
                    e.stopPropagation()
                    setForm({
                      ...form,
                      geo_type: GeoTypeEnum.REGION,
                      geo_ids: [],
                    })
                  }}
                  defaultValue={form.geo_type === GeoTypeEnum.REGION}
                />

                <KrysRadioButton
                  name='geo_type'
                  label={'Countries'}
                  onChangeHandler={(e) => {
                    e.stopPropagation()
                    setForm({
                      ...form,
                      geo_type: GeoTypeEnum.COUNTRY,
                      geo_ids: [],
                    })
                  }}
                  defaultValue={form.geo_type === GeoTypeEnum.COUNTRY}
                />

                <div className='mt-1 text-danger'>{errors?.geo_type ? errors?.geo_type : null}</div>
              </div>

              {form.geo_type === GeoTypeEnum.REGION && (
                <div className='mb-7'>
                  <KrysFormLabel text='Region' isRequired={true} />

                  <MultiSelect
                    isResourceLoaded={isResourceLoaded}
                    options={regions}
                    defaultValue={publicationCampaignRestriction?.geos.map((geo) => geo.geo)}
                    form={form}
                    setForm={setForm}
                    name={'geo_ids'}
                  />

                  <div className='mt-1 text-danger'>{errors?.geo_ids ? errors?.geo_ids : null}</div>
                </div>
              )}

              {form.geo_type === GeoTypeEnum.COUNTRY && (
                <div className='mb-7'>
                  <KrysFormLabel text='Country' isRequired={true} />

                  <MultiSelect
                    isResourceLoaded={isResourceLoaded}
                    options={countries}
                    defaultValue={publicationCampaignRestriction?.geos.map((geo) => geo.geo)}
                    form={form}
                    setForm={setForm}
                    name={'geo_ids'}
                  />

                  <div className='mt-1 text-danger'>{errors?.geo_ids ? errors?.geo_ids : null}</div>
                </div>
              )}

              <div className='mb-7'>
                <KrysFormLabel text='Formats' isRequired={false} />

                <MultiSelect
                  isResourceLoaded={isResourceLoaded}
                  options={formats}
                  defaultValue={publicationCampaignRestriction?.formats}
                  form={form}
                  setForm={setForm}
                  name={'format_ids'}
                />

                <div className='mt-1 text-danger'>
                  {errors?.format_ids ? errors?.format_ids : null}
                </div>
              </div>

              <div className='mb-7'>
                <KrysFormLabel text='Campaign types' isRequired={false} />

                <MultiSelect
                  isResourceLoaded={isResourceLoaded}
                  options={campaignTypes}
                  defaultValue={publicationCampaignRestriction?.campaignTypes}
                  form={form}
                  setForm={setForm}
                  name={'campaign_type_ids'}
                />

                <div className='mt-1 text-danger'>
                  {errors?.campaign_type_ids ? errors?.campaign_type_ids : null}
                </div>
              </div>

              <div className='mb-7'>
                <KrysFormLabel text='Website pages' isRequired={false} />

                <MultiSelect
                  isResourceLoaded={isResourceLoaded}
                  options={websitePages}
                  defaultValue={publicationCampaignRestriction?.websitePages}
                  form={form}
                  setForm={setForm}
                  name={'website_page_ids'}
                />

                <div className='mt-1 text-danger'>
                  {errors?.website_page_ids ? errors?.website_page_ids : null}
                </div>
              </div>

              <div className='mb-7'>
                <KrysFormLabel text='Campaign restriction requirements' isRequired={false} />

                <MultiSelect
                  isResourceLoaded={isResourceLoaded}
                  options={campaignRestrictionRequirements}
                  defaultValue={publicationCampaignRestriction?.requirements}
                  form={form}
                  setForm={setForm}
                  name={'requirement_ids'}
                />

                <div className='mt-1 text-danger'>
                  {errors?.requirement_ids ? errors?.requirement_ids : null}
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

export default PublicationCampaignRestrictionEdit
