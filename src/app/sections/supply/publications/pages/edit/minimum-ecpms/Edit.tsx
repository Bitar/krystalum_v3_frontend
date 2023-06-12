import {Field, Form, Formik} from 'formik'
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
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
  genericOnChangeHandler,
  genericSingleSelectOnChangeHandler,
} from '../../../../../../helpers/form'
import {generatePageTitle} from '../../../../../../helpers/pageTitleGenerator'
import {submitRequest} from '../../../../../../helpers/requests'
import {Sections} from '../../../../../../helpers/sections'
import {Actions, KrysToastType, PageTypes} from '../../../../../../helpers/variables'
import {PublicationMinimumEcpm} from '../../../../../../models/supply/publication/PublicationMinimumEcpm'
import {useKrysApp} from '../../../../../../modules/general/KrysApp'
import {
  getPublicationMinimumEcpm,
  storePublicationMinimumEcpm,
} from '../../../../../../requests/supply/publication/PublisherMinimumEcpm'
import {
  defaultPublicationMinimumEcpmEditFormFields,
  fillEditForm,
  PublicationMinimumEcpmEditFormFields,
  publicationMinimumEcpmSchema,
} from '../../../core/edit/minimum-ecpms/form'
import {usePublication} from '../../../core/PublicationContext'
import {usePublicationEdit} from '../../../core/PublicationEditContext'

const PublicationMinimumEcpmEdit: React.FC = () => {
  const {cid} = useParams()

  const {options} = usePublication()
  const {publication, editOptions} = usePublicationEdit()
  const krysApp = useKrysApp()

  const [form, setForm] = useState<PublicationMinimumEcpmEditFormFields>(
    defaultPublicationMinimumEcpmEditFormFields
  )
  const [formErrors, setFormErrors] = useState<string[]>([])

  const [publicationMinimumEcpm, setPublicationMinimumEcpm] =
    useState<PublicationMinimumEcpm | null>(null)

  const {formats, regions, countries} = options
  const {currencies} = editOptions

  useEffect(() => {
    if (publication && cid) {
      // get the publication minimum ecpm we need to edit from the database
      submitRequest(
        getPublicationMinimumEcpm,
        [publication, parseInt(cid)],
        (response) => {
          // we were able to fetch current publication minimum ecpm to edit
          setPublicationMinimumEcpm(response)
          // we also set the form to be the publication's minimum ecpm details
          setForm(fillEditForm(response))
        },
        setFormErrors
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publication, cid])

  useEffect(() => {
    if (publicationMinimumEcpm) {
      krysApp.setPageTitle(
        generatePageTitle(
          Sections.SUPPLY_PUBLICATION_MINIMUM_ECPM,
          PageTypes.EDIT,
          `${publication?.name}'s minimum ECPM`
        )
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicationMinimumEcpm])

  const onChangeHandler = (e: any) => {
    genericOnChangeHandler(e, form, setForm)
  }

  const handleEdit = () => {
    if (publication && publicationMinimumEcpm) {
      // we need to update the minimum ecpm data by doing API call with form
      submitRequest(
        storePublicationMinimumEcpm,
        [publication, publicationMinimumEcpm.id, form],
        (response) => {
          // we got the updated publication minimum ecpm so we're good
          krysApp.setAlert({
            message: new AlertMessageGenerator(
              'publication minimum ecpm',
              Actions.EDIT,
              KrysToastType.SUCCESS
            ).message,
            type: KrysToastType.SUCCESS,
          })
        },
        setFormErrors
      )
    }
  }

  return (
    <KTCard>
      <KTCardHeader text='Edit Publication Minimum ECPM (NET)' />

      <KTCardBody>
        <FormErrors errorMessages={formErrors} />

        <Formik
          initialValues={form}
          validationSchema={publicationMinimumEcpmSchema(true)}
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
                    value={regions.find(
                      (region) => form.geo_type === GeoTypeEnum.REGION && region.id === form.geo_id
                    )}
                    options={regions}
                    getOptionLabel={(instance) => instance.name}
                    getOptionValue={(instance) => instance.id.toString()}
                    placeholder='Select a region'
                    onChange={(e) => {
                      genericSingleSelectOnChangeHandler(e, form, setForm, 'geo_id')
                    }}
                  />

                  <div className='mt-1 text-danger'>{errors?.geo_id ? errors?.geo_id : null}</div>
                </div>
              )}

              {form.geo_type === GeoTypeEnum.COUNTRY && (
                <div className='mb-7'>
                  <KrysFormLabel text='Country' isRequired={true} />

                  <Select
                    name='geo_id'
                    value={countries.find(
                      (country) =>
                        form.geo_type === GeoTypeEnum.COUNTRY && country.id === form.geo_id
                    )}
                    options={countries}
                    getOptionLabel={(instance) => instance.name}
                    getOptionValue={(instance) => instance.id.toString()}
                    placeholder='Select a country'
                    onChange={(e) => {
                      genericSingleSelectOnChangeHandler(e, form, setForm, 'geo_id')
                    }}
                  />

                  <div className='mt-1 text-danger'>{errors?.geo_id ? errors?.geo_id : null}</div>
                </div>
              )}

              <div className='mb-7'>
                <KrysFormLabel text='Formats' isRequired={false} />

                <Select
                  name='format_id'
                  value={formats.find((format) => format.id === form.format_id)}
                  options={formats}
                  getOptionLabel={(instance) => instance.name}
                  getOptionValue={(instance) => instance.id.toString()}
                  placeholder='Select a format'
                  onChange={(e) => {
                    genericSingleSelectOnChangeHandler(e, form, setForm, 'format_id')
                  }}
                  formatOptionLabel={indentOptions}
                />

                <div className='mt-1 text-danger'>
                  {errors?.format_id ? errors?.format_id : null}
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
                  value={currencies.find((currency) => currency.id === form.currency_id)}
                  options={currencies}
                  getOptionLabel={(instance) => instance.currency}
                  getOptionValue={(instance) => instance.id.toString()}
                  placeholder='Select a currency'
                  onChange={(e) => {
                    genericSingleSelectOnChangeHandler(e, form, setForm, 'currency_id')
                  }}
                />

                <div className='mt-1 text-danger'>
                  {errors?.currency_id ? errors?.currency_id : null}
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

export default PublicationMinimumEcpmEdit
