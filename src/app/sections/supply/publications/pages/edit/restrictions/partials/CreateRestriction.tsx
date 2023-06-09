import {Form, Formik} from 'formik'
import React, {Dispatch, SetStateAction, useRef, useState} from 'react'
import Select from 'react-select'
import {QUERIES} from '../../../../../../../../_metronic/helpers'
import FormErrors from '../../../../../../../components/forms/FormErrors'
import {indentOptions} from '../../../../../../../components/forms/IndentOptions'
import KrysFormFooter from '../../../../../../../components/forms/KrysFormFooter'
import KrysFormLabel from '../../../../../../../components/forms/KrysFormLabel'
import KrysRadioButton from '../../../../../../../components/forms/KrysRadioButton'
import KrysInnerTable from '../../../../../../../components/tables/KrysInnerTable'
import {GeoTypeEnum} from '../../../../../../../enums/Supply/GeoTypeEnum'
import {AlertMessageGenerator} from '../../../../../../../helpers/AlertMessageGenerator'
import {
  genericMultiSelectOnChangeHandler,
  genericOnChangeHandler,
} from '../../../../../../../helpers/form'
import {submitRequest} from '../../../../../../../helpers/requests'
import {Actions, KrysToastType} from '../../../../../../../helpers/variables'
import {useKrysApp} from '../../../../../../../modules/general/KrysApp'
import {
  getPublicationCampaignRestrictions,
  storePublicationCampaignRestriction,
} from '../../../../../../../requests/supply/publication/PublisherCampaignRestriction'
import {
  CampaignRestrictionsFilterFields,
  defaultPublicationCampaignRestrictionFormFields,
  PublicationCampaignRestrictionFormFields,
  publicationCampaignRestrictionSchema,
} from '../../../../core/edit/restrictions/form'
import {PublicationCampaignRestrictionsColumns} from '../../../../core/edit/restrictions/TableColumns'
import {usePublication} from '../../../../core/PublicationContext'
import {usePublicationEdit} from '../../../../core/PublicationEditContext'

interface Props {
  currentCampaignRestrictionTypeFormatted: string
  filters: CampaignRestrictionsFilterFields
  refreshTable: boolean
  setRefreshTable: Dispatch<SetStateAction<boolean>>
}

const PublicationCampaignRestrictionCreate: React.FC<Props> = ({
  currentCampaignRestrictionTypeFormatted,
  filters,
  refreshTable,
  setRefreshTable,
}) => {
  const {options} = usePublication()
  const {publication, editOptions} = usePublicationEdit()
  const krysApp = useKrysApp()

  const [form, setForm] = useState<PublicationCampaignRestrictionFormFields>(
    defaultPublicationCampaignRestrictionFormFields
  )
  const [formErrors, setFormErrors] = useState<string[]>([])

  const geosSelectRef = useRef<any>(null)
  const formatsSelectRef = useRef<any>(null)
  const campaignTypesSelectRef = useRef<any>(null)
  const websitePagesSelectRef = useRef<any>(null)
  const campaignRestrictionRequirementsSelectRef = useRef<any>(null)

  const {formats, regions, countries} = options
  const {campaignTypes, websitePages, campaignRestrictionRequirements} = editOptions

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
      // send API request to create the publication campaign restrictions
      submitRequest(
        storePublicationCampaignRestriction,
        [publication, form],
        (response) => {
          // we were able to store the publication campaign restrictions
          krysApp.setAlert({
            message: new AlertMessageGenerator(
              'publication campaign restriction',
              Actions.CREATE,
              KrysToastType.SUCCESS
            ).message,
            type: KrysToastType.SUCCESS,
          })

          // now that we have a new record successfully we need to refresh the table
          setRefreshTable(true)

          // clear the selected values from dropdown
          geosSelectRef.current?.clearValue()
          formatsSelectRef.current?.clearValue()
          campaignTypesSelectRef.current?.clearValue()
          websitePagesSelectRef.current?.clearValue()
          campaignRestrictionRequirementsSelectRef.current?.clearValue()

          // we need to clear the form data
          setForm(defaultPublicationCampaignRestrictionFormFields)

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
          This form provides guidelines and limitations for advertising campaigns within a specific
          publication. Please submit the form below if you require additional restrictions to be
          linked for your advertising campaigns within a specific publication.
        </span>
      </div>

      <FormErrors errorMessages={formErrors} />

      <Formik
        initialValues={form}
        validationSchema={publicationCampaignRestrictionSchema(false)}
        onSubmit={handleCreate}
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
                <KrysFormLabel text='Regions' isRequired={true} />

                <Select
                  isMulti
                  name='geo_ids'
                  options={regions}
                  getOptionLabel={(instance) => instance.name}
                  getOptionValue={(instance) => instance.id.toString()}
                  onChange={(e) => {
                    multiSelectChangeHandler(e, 'geo_ids')
                  }}
                  placeholder='Select one or more region'
                  ref={geosSelectRef}
                />

                <div className='mt-1 text-danger'>{errors?.geo_ids ? errors?.geo_ids : null}</div>
              </div>
            )}

            {form.geo_type === GeoTypeEnum.COUNTRY && (
              <div className='mb-7'>
                <KrysFormLabel text='Countries' isRequired={true} />

                <Select
                  isMulti
                  name='geo_ids'
                  options={countries}
                  getOptionLabel={(instance) => instance.name}
                  getOptionValue={(instance) => instance.id.toString()}
                  onChange={(e) => {
                    multiSelectChangeHandler(e, 'geo_ids')
                  }}
                  placeholder='Select one or more country'
                  ref={geosSelectRef}
                />

                <div className='mt-1 text-danger'>{errors?.geo_ids ? errors?.geo_ids : null}</div>
              </div>
            )}

            <div className='mb-7'>
              <KrysFormLabel text='Formats' isRequired={true} />

              <Select
                isMulti
                name='format_ids'
                options={formats}
                getOptionLabel={(instance) => instance.name}
                getOptionValue={(instance) => instance.id.toString()}
                onChange={(e) => {
                  multiSelectChangeHandler(e, 'format_ids')
                }}
                formatOptionLabel={indentOptions}
                placeholder='Select one or more formats'
                ref={formatsSelectRef}
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
                options={campaignTypes}
                getOptionLabel={(instance) => instance.name}
                getOptionValue={(instance) => instance.id.toString()}
                onChange={(e) => {
                  multiSelectChangeHandler(e, 'campaign_type_ids')
                }}
                placeholder='Select one or more campaign types'
                ref={campaignTypesSelectRef}
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
                options={websitePages}
                getOptionLabel={(instance) => instance.name}
                getOptionValue={(instance) => instance.id.toString()}
                onChange={(e) => {
                  multiSelectChangeHandler(e, 'website_page_ids')
                }}
                placeholder='Select one or more website pages'
                ref={websitePagesSelectRef}
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
                options={campaignRestrictionRequirements}
                getOptionLabel={(instance) => instance.name}
                getOptionValue={(instance) => instance.id.toString()}
                onChange={(e) => {
                  multiSelectChangeHandler(e, 'requirement_ids')
                }}
                formatOptionLabel={indentOptions}
                placeholder='Select one or more campaign restriction requirements'
                ref={campaignRestrictionRequirementsSelectRef}
              />

              <div className='mt-1 text-danger'>
                {errors?.requirement_ids ? errors?.requirement_ids : null}
              </div>
            </div>

            <KrysFormFooter cancelUrl={'/supply/publications'} />
          </Form>
        )}
      </Formik>

      <div className='separator separator-dashed my-10'></div>

      <div className='mb-4'>
        <span className='fs-5 text-gray-700 d-flex fw-medium'>
          {currentCampaignRestrictionTypeFormatted}
        </span>
        <span className='text-muted'>
          This table displays a list of '{currentCampaignRestrictionTypeFormatted}' records:
        </span>
      </div>

      {publication && (
        <KrysInnerTable
          doRefetch={refreshTable}
          slug='publication-campaign-restrictions'
          queryId={QUERIES.PUBLICATION_CAMPAIGN_RESTRICTIONS_LIST}
          requestFunction={getPublicationCampaignRestrictions}
          requestId={publication.id}
          columnsArray={PublicationCampaignRestrictionsColumns}
          filters={filters}
        ></KrysInnerTable>
      )}
    </>
  )
}

export default PublicationCampaignRestrictionCreate
