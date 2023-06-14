import {Form, Formik} from 'formik'
import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import Select from 'react-select'
import {KTCard, KTCardBody} from '../../../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../../../_metronic/helpers/components/KTCardHeader'
import FormErrors from '../../../../../../components/forms/FormErrors'
import {indentOptions} from '../../../../../../components/forms/IndentOptions'
import KrysFormFooter from '../../../../../../components/forms/KrysFormFooter'
import KrysFormLabel from '../../../../../../components/forms/KrysFormLabel'
import KrysRadioButton from '../../../../../../components/forms/KrysRadioButton'
import {GeoTypeEnum} from '../../../../../../enums/Supply/GeoTypeEnum'
import {AlertMessageGenerator} from '../../../../../../helpers/AlertMessageGenerator'
import {
  genericMultiSelectOnChangeHandler,
  genericOnChangeHandler,
} from '../../../../../../helpers/form'
import {generatePageTitle} from '../../../../../../helpers/pageTitleGenerator'
import {getErrorPage, submitRequest} from '../../../../../../helpers/requests'
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

  const [publicationCampaignRestriction, setPublicationCampaignRestriction] =
    useState<PublicationCampaignRestriction | null>(null)

  const {formats, regions, countries} = options
  const {campaignTypes, websitePages, campaignRestrictionRequirements} = editOptions

  useEffect(() => {
    if (publication && cid) {
      // get the publication campaign restriction we need to edit from the database
      submitRequest(getPublicationCampaignRestriction, [publication, parseInt(cid)], (response) => {
        let errorPage = getErrorPage(response)

        if (errorPage) {
          navigate(errorPage)
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

  const handleEdit = (e: any, fns: any) => {
    if (publication && publicationCampaignRestriction) {
      // we need to update the campaign restriction data by doing API call with form
      submitRequest(
        updatePublicationCampaignRestriction,
        [publication, publicationCampaignRestriction.id, form],
        (response) => {
          // we got the updated publication campaign restriction so we're good
          krysApp.setAlert({
            message: new AlertMessageGenerator(
              'publication campaign restriction',
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
                  label='Regions'
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
                  label='Countries'
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

                  <Select
                    isMulti
                    name='geo_ids'
                    value={regions.filter(
                      (region) =>
                        form.geo_type === GeoTypeEnum.REGION && form.geo_ids.includes(region.id)
                    )}
                    options={regions}
                    getOptionLabel={(instance) => instance.name}
                    getOptionValue={(instance) => instance.id.toString()}
                    placeholder={`Select one or more regions`}
                    onChange={(e) => {
                      genericMultiSelectOnChangeHandler(e, form, setForm, 'geo_ids')
                    }}
                  />

                  <div className='mt-1 text-danger'>{errors?.geo_ids ? errors?.geo_ids : null}</div>
                </div>
              )}

              {form.geo_type === GeoTypeEnum.COUNTRY && (
                <div className='mb-7'>
                  <KrysFormLabel text='Country' isRequired={true} />

                  <Select
                    isMulti
                    name='geo_ids'
                    value={countries.filter(
                      (country) =>
                        form.geo_type === GeoTypeEnum.COUNTRY && form.geo_ids.includes(country.id)
                    )}
                    options={countries}
                    getOptionLabel={(instance) => instance.name}
                    getOptionValue={(instance) => instance.id.toString()}
                    placeholder={`Select one or more countries`}
                    onChange={(e) => {
                      genericMultiSelectOnChangeHandler(e, form, setForm, 'geo_ids')
                    }}
                  />

                  <div className='mt-1 text-danger'>{errors?.geo_ids ? errors?.geo_ids : null}</div>
                </div>
              )}

              <div className='mb-7'>
                <KrysFormLabel text='Formats' isRequired={false} />

                <Select
                  isMulti
                  name='format_ids'
                  value={formats.filter((format) => form.format_ids.includes(format.id))}
                  options={formats}
                  getOptionLabel={(instance) => instance.name}
                  getOptionValue={(instance) => instance.id.toString()}
                  placeholder={`Select one or more formats`}
                  onChange={(e) => {
                    genericMultiSelectOnChangeHandler(e, form, setForm, 'format_ids')
                  }}
                  formatOptionLabel={indentOptions}
                />

                <div className='mt-1 text-danger'>
                  {errors?.format_ids ? errors?.format_ids : null}
                </div>
              </div>

              <div className='mb-7'>
                <KrysFormLabel text='Campaign types' isRequired={false} />

                <Select
                  isMulti
                  name='campaign_type_ids'
                  value={campaignTypes.filter((campaignType) =>
                    form.campaign_type_ids?.includes(campaignType.id)
                  )}
                  options={campaignTypes}
                  getOptionLabel={(instance) => instance.name}
                  getOptionValue={(instance) => instance.id.toString()}
                  placeholder={`Select one or more campaign types`}
                  onChange={(e) => {
                    genericMultiSelectOnChangeHandler(e, form, setForm, 'campaign_type_ids')
                  }}
                />

                <div className='mt-1 text-danger'>
                  {errors?.campaign_type_ids ? errors?.campaign_type_ids : null}
                </div>
              </div>

              <div className='mb-7'>
                <KrysFormLabel text='Website pages' isRequired={false} />

                <Select
                  isMulti
                  name='website_page_ids'
                  value={websitePages.filter((websitePage) =>
                    form.website_page_ids?.includes(websitePage.id)
                  )}
                  options={websitePages}
                  getOptionLabel={(instance) => instance.name}
                  getOptionValue={(instance) => instance.id.toString()}
                  placeholder={`Select one or more website pages`}
                  onChange={(e) => {
                    genericMultiSelectOnChangeHandler(e, form, setForm, 'website_page_ids')
                  }}
                />

                <div className='mt-1 text-danger'>
                  {errors?.website_page_ids ? errors?.website_page_ids : null}
                </div>
              </div>

              <div className='mb-7'>
                <KrysFormLabel text='Campaign restriction requirements' isRequired={false} />

                <Select
                  isMulti
                  name='requirement_ids'
                  value={campaignRestrictionRequirements.filter((campaignRestrictionRequirement) =>
                    form.requirement_ids?.includes(campaignRestrictionRequirement.id)
                  )}
                  options={campaignRestrictionRequirements}
                  getOptionLabel={(instance) => instance.name}
                  getOptionValue={(instance) => instance.id.toString()}
                  placeholder={`Select one or more campaign restriction ids`}
                  onChange={(e) => {
                    genericMultiSelectOnChangeHandler(e, form, setForm, 'requirement_ids')
                  }}
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
