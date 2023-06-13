import {Field, Form, Formik} from 'formik'
import React, {useEffect, useRef, useState} from 'react'
import Select from 'react-select'
import {KTCard, KTCardBody, QUERIES} from '../../../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../../../_metronic/helpers/components/KTCardHeader'
import FormErrors from '../../../../../../components/forms/FormErrors'
import KrysFormFooter from '../../../../../../components/forms/KrysFormFooter'
import KrysFormLabel from '../../../../../../components/forms/KrysFormLabel'
import KrysRadioButton from '../../../../../../components/forms/KrysRadioButton'
import {SelectCardAction} from '../../../../../../components/misc/CardAction'
import KrysInnerTable from '../../../../../../components/tables/KrysInnerTable'
import {GeoTypeEnum} from '../../../../../../enums/Supply/GeoTypeEnum'
import {AlertMessageGenerator} from '../../../../../../helpers/AlertMessageGenerator'
import {
  genericOnChangeHandler,
  genericSingleSelectOnChangeHandler,
} from '../../../../../../helpers/form'
import {submitRequest} from '../../../../../../helpers/requests'
import {DEFAULT_ANALYTIC_TYPE} from '../../../../../../helpers/settings'
import {Actions, KrysToastType} from '../../../../../../helpers/variables'
import {AnalyticType} from '../../../../../../models/supply/Options'

import {useKrysApp} from '../../../../../../modules/general/KrysApp'
import {
  getPublicationAnalytics,
  storePublicationAnalytic,
} from '../../../../../../requests/supply/publication/PublisherAnalytic'
import {
  AnalyticsFilterFields,
  defaultAnalyticsFilterFields,
  defaultPublicationAnalyticFormFields,
  PublicationAnalyticFormFields,
  PublicationAnalyticSchema,
} from '../../../core/edit/analytics/form'
import {PublicationAnalyticsColumns} from '../../../core/edit/analytics/TableColumns'
import {usePublication} from '../../../core/PublicationContext'
import {usePublicationEdit} from '../../../core/PublicationEditContext'

const PublicationAnalyticCreate: React.FC = () => {
  const {options} = usePublication()
  const {publication, editOptions} = usePublicationEdit()
  const krysApp = useKrysApp()

  const [form, setForm] = useState<PublicationAnalyticFormFields>(
    defaultPublicationAnalyticFormFields
  )
  const [formErrors, setFormErrors] = useState<string[]>([])
  const [filters, setFilters] = useState<AnalyticsFilterFields>(defaultAnalyticsFilterFields)
  const [refreshTable, setRefreshTable] = useState<boolean>(false)

  const [analyticsTypes, setAnalyticsType] = useState<AnalyticType[]>([])
  const [currentAnalyticTypeFormatted, setCurrentAnalyticTypeFormatted] = useState<string>(
    DEFAULT_ANALYTIC_TYPE.name
  )

  const geosSelectRef = useRef<any>(null)
  const devicesSelectRef = useRef<any>(null)

  const {regions, countries, analyticTypes} = options
  const {devices} = editOptions

  useEffect(() => {
    if (publication) {
      setAnalyticsType(analyticTypes)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publication, options])

  const selectChangeHandler = (e: any, key: string) => {
    genericSingleSelectOnChangeHandler(e, form, setForm, key)

    if (key === 'type' && e) {
      const type = analyticsTypes.find((analyticsType) => analyticsType.id === e.id)

      if (type) {
        setCurrentAnalyticTypeFormatted(type.name)
        setFilters({...filters, type: e.id})
      }

      // as long as we are updating the create form, we should set the table refresh to false
      setRefreshTable(true)
    }
  }

  const onChangeHandler = (e: any) => {
    // as long as we are updating the create form, we should set the table refresh to false
    setRefreshTable(false)

    genericOnChangeHandler(e, form, setForm)
  }

  const handleCreate = (e: any, fns: any) => {
    if (publication) {
      // send API request to create the publication analytics
      submitRequest(
        storePublicationAnalytic,
        [publication, form],
        (response) => {
          // we were able to store the publication analytics
          krysApp.setAlert({
            message: new AlertMessageGenerator(
              'publication google analytics data',
              Actions.CREATE,
              KrysToastType.SUCCESS
            ).message,
            type: KrysToastType.SUCCESS,
          })

          // now that we have a new record successfully we need to refresh the table
          setRefreshTable(true)

          // clear the selected values from dropdown
          geosSelectRef.current?.clearValue()
          devicesSelectRef.current?.clearValue()

          // we need to clear the form data
          setForm(defaultPublicationAnalyticFormFields)

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
      <KTCardHeader
        text='Add New Analytic'
        actions={[
          new SelectCardAction(
            'manage-supply',
            analyticsTypes,
            'Select analytics type',
            selectChangeHandler,
            'type',
            DEFAULT_ANALYTIC_TYPE
          ),
        ]}
      />

      <KTCardBody>
        <div className='mb-4'>
          <span className='fs-5 text-gray-700 d-flex fw-medium'>
            New Analytics Record Creation Form
          </span>
          <span className='text-muted'>
            This form allows you to create a new analytics record. You will need to provide the
            following information:
          </span>
        </div>

        <FormErrors errorMessages={formErrors} />

        <Formik
          initialValues={form}
          validationSchema={PublicationAnalyticSchema}
          onSubmit={handleCreate}
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
                      geo_id: 0,
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
                      geo_id: 0,
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
                    name='geo_id'
                    options={regions}
                    getOptionLabel={(instance) => instance.name}
                    getOptionValue={(instance) => instance.id.toString()}
                    onChange={(e) => {
                      selectChangeHandler(e, 'geo_id')
                    }}
                    placeholder='Select a region'
                    isClearable={true}
                    ref={geosSelectRef}
                  />

                  <div className='mt-1 text-danger'>{errors?.geo_id ? errors?.geo_id : null}</div>
                </div>
              )}

              {form.geo_type === GeoTypeEnum.COUNTRY && (
                <div className='mb-7'>
                  <KrysFormLabel text='Country' isRequired={true} />

                  <Select
                    name='geo_id'
                    options={countries}
                    getOptionLabel={(instance) => instance.name}
                    getOptionValue={(instance) => instance.id.toString()}
                    onChange={(e) => {
                      selectChangeHandler(e, 'geo_id')
                    }}
                    placeholder='Select a country'
                    isClearable={true}
                    ref={geosSelectRef}
                  />

                  <div className='mt-1 text-danger'>{errors?.geo_id ? errors?.geo_id : null}</div>
                </div>
              )}

              <div className='mb-7'>
                <KrysFormLabel text='Device' isRequired={false} />

                <Select
                  name='device_id'
                  options={devices}
                  getOptionLabel={(instance) => instance.name}
                  getOptionValue={(instance) => instance.id.toString()}
                  onChange={(e) => {
                    selectChangeHandler(e, 'device_id')
                  }}
                  placeholder='Select a device'
                  isClearable={true}
                  ref={devicesSelectRef}
                />

                <div className='mt-1 text-danger'>
                  {errors?.device_id ? errors?.device_id : null}
                </div>
              </div>

              <div className='mb-7'>
                <KrysFormLabel text='Value' isRequired={true} />

                <Field
                  className='form-control fs-base'
                  type='number'
                  placeholder='Enter the value'
                  name='value'
                />

                <div className='mt-1 text-danger'>{errors?.value ? errors?.value : null}</div>
              </div>

              <KrysFormFooter cancelUrl='/supply/publications' />
            </Form>
          )}
        </Formik>

        <div className='separator separator-dashed my-10'></div>

        <div className='mb-4'>
          <span className='fs-5 text-gray-700 d-flex fw-medium'>
            {currentAnalyticTypeFormatted}
          </span>
          <span className='text-muted'>
            This table displays a list of '{currentAnalyticTypeFormatted}' records:
          </span>
        </div>

        {publication && (
          <KrysInnerTable
            doRefetch={refreshTable}
            slug='publication-analytics'
            queryId={QUERIES.PUBLICATION_ANALYTICS_LIST}
            requestFunction={getPublicationAnalytics}
            requestId={publication.id}
            columnsArray={PublicationAnalyticsColumns}
            filters={filters}
          ></KrysInnerTable>
        )}
      </KTCardBody>
    </KTCard>
  )
}

export default PublicationAnalyticCreate
