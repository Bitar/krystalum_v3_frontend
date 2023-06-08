import axios from 'axios'
import {Field, Form, Formik} from 'formik'
import React, {useRef, useState} from 'react'
import Select from 'react-select'
import {KTCard, KTCardBody, QUERIES} from '../../../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../../../_metronic/helpers/components/KTCardHeader'
import FormErrors from '../../../../../../components/forms/FormErrors'
import {indentOptions} from '../../../../../../components/forms/IndentOptions'
import KrysFormFooter from '../../../../../../components/forms/KrysFormFooter'
import KrysFormLabel from '../../../../../../components/forms/KrysFormLabel'
import KrysRadioButton from '../../../../../../components/forms/KrysRadioButton'
import KrysInnerTable from '../../../../../../components/tables/KrysInnerTable'
import {GeoTypeEnum} from '../../../../../../enums/Supply/GeoTypeEnum'
import {AlertMessageGenerator} from '../../../../../../helpers/AlertMessageGenerator'
import {
  GenericErrorMessage,
  genericMultiSelectOnChangeHandler,
  genericOnChangeHandler,
  genericSingleSelectOnChangeHandler,
} from '../../../../../../helpers/form'
import {extractErrors} from '../../../../../../helpers/requests'
import {DEFAULT_CURRENCY} from '../../../../../../helpers/settings'
import {Actions, KrysToastType} from '../../../../../../helpers/variables'

import {useKrysApp} from '../../../../../../modules/general/KrysApp'
import {
  getPublicationMinimumEcpms,
  storePublicationMinimumEcpm,
} from '../../../../../../requests/supply/publication/PublisherMinimumEcpm'
import {
  defaultPublicationMinimumEcpmFormFields,
  PublicationMinimumEcpmFormFields,
  publicationMinimumEcpmSchema,
} from '../../../core/edit/minimum-ecpms/form'
import {PublicationMinimumEcpmColumns} from '../../../core/edit/minimum-ecpms/TableColumns'
import {usePublication} from '../../../core/PublicationContext'
import {usePublicationEdit} from '../../../core/PublicationEditContext'

const PublicationMinimumEcpmCreate: React.FC = () => {
  const {options} = usePublication()
  const {publication, editOptions} = usePublicationEdit()
  const krysApp = useKrysApp()

  const [form, setForm] = useState<PublicationMinimumEcpmFormFields>(
    defaultPublicationMinimumEcpmFormFields
  )
  const [formErrors, setFormErrors] = useState<string[]>([])
  const [refreshTable, setRefreshTable] = useState<boolean>(false)

  const formatsSelectRef = useRef<any>(null)
  const geosSelectRef = useRef<any>(null)

  const {formats, regions, countries} = options
  const {currencies} = editOptions

  const selectChangeHandler = (e: any, key: string) => {
    genericSingleSelectOnChangeHandler(e, form, setForm, key)
  }

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
      // send API request to create the publication minimum ecpm
      storePublicationMinimumEcpm(publication, form).then((response) => {
        if (axios.isAxiosError(response)) {
          // we need to show the errors
          setFormErrors(extractErrors(response))
        } else if (response === undefined) {
          // show generic error message
          setFormErrors([GenericErrorMessage])
        } else {
          // we were able to store the publication minimum ecpm
          krysApp.setAlert({
            message: new AlertMessageGenerator(
              'publication minimum ecpm',
              Actions.CREATE,
              KrysToastType.SUCCESS
            ).message,
            type: KrysToastType.SUCCESS,
          })

          // now that we have a new record successfully we need to refresh the table
          setRefreshTable(true)

          // clear the selected values from dropdown
          formatsSelectRef.current?.clearValue()
          geosSelectRef.current?.clearValue()

          // we need to clear the form data
          setForm(defaultPublicationMinimumEcpmFormFields)

          // we need to clear the form data
          setFormErrors([])
        }
      })
    }
  }

  return (
    <KTCard className='card-bordered border-1'>
      <KTCardHeader text='Add New Minimum ECPM (NET)' />

      <KTCardBody>
        <FormErrors errorMessages={formErrors} />

        <Formik
          initialValues={form}
          validationSchema={publicationMinimumEcpmSchema(false)}
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
                    getOptionLabel={(region) => region.name}
                    getOptionValue={(region) => region.id.toString()}
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
                    getOptionLabel={(country) => country.name}
                    getOptionValue={(country) => country.id.toString()}
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
                  getOptionLabel={(format) => format.name}
                  getOptionValue={(format) => format.id.toString()}
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
                <KrysFormLabel text='Rate' isRequired={true} />

                <Field
                  className='form-control fs-base'
                  type='number'
                  placeholder='Enter the rate'
                  name='rate'
                />

                <div className='mt-1 text-danger'>{errors?.rate ? errors?.rate : null}</div>
              </div>

              <div className='mb-7'>
                <KrysFormLabel text='Currency' isRequired={true} />

                <Select
                  name='currency_id'
                  options={currencies}
                  getOptionLabel={(currency) => currency.currency}
                  getOptionValue={(currency) => currency.id.toString()}
                  onChange={(e) => {
                    selectChangeHandler(e, 'currency_id')
                  }}
                  value={DEFAULT_CURRENCY}
                  placeholder='Select a currency'
                />

                <div className='mt-1 text-danger'>
                  {errors?.currency_id ? errors?.currency_id : null}
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
            slug='publication-minimum-ecpms'
            queryId={QUERIES.PUBLICATION_MINIMUM_ECPMS_LIST}
            requestFunction={getPublicationMinimumEcpms}
            requestId={publication.id}
            columnsArray={PublicationMinimumEcpmColumns}
          ></KrysInnerTable>
        )}
      </KTCardBody>
    </KTCard>
  )
}

export default PublicationMinimumEcpmCreate
