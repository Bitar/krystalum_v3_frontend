import {Field, Form, Formik} from 'formik'
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
  genericOnChangeHandler,
  genericSingleSelectOnChangeHandler,
} from '../../../../../../helpers/form'
import {generatePageTitle} from '../../../../../../helpers/pageTitleGenerator'
import {getErrorPage, submitRequest} from '../../../../../../helpers/requests'
import {Sections} from '../../../../../../helpers/sections'
import {Actions, KrysToastType, PageTypes} from '../../../../../../helpers/variables'
import {PublicationFixedCpm} from '../../../../../../models/supply/publication/PublicationFixedCpm'
import {useKrysApp} from '../../../../../../modules/general/KrysApp'
import {
  getPublicationFixedCpm,
  updatePublicationFixedCpm,
} from '../../../../../../requests/supply/publication/PublisherFixedCpm'
import {
  defaultPublicationFixedCpmEditFormFields,
  fillEditForm,
  PublicationFixedCpmEditFormFields,
  publicationFixedCpmSchema,
} from '../../../core/edit/fixed-cpms/form'
import {usePublication} from '../../../core/PublicationContext'
import {usePublicationEdit} from '../../../core/PublicationEditContext'

const PublicationFixedCpmEdit: React.FC = () => {
  const {cid} = useParams()
  const navigate = useNavigate()

  const {options} = usePublication()
  const {publication, editOptions} = usePublicationEdit()
  const krysApp = useKrysApp()

  const [form, setForm] = useState<PublicationFixedCpmEditFormFields>(
    defaultPublicationFixedCpmEditFormFields
  )
  const [formErrors, setFormErrors] = useState<string[]>([])

  const [publicationFixedCpm, setPublicationFixedCpm] = useState<PublicationFixedCpm | null>(null)

  const {formats, regions, countries} = options
  const {currencies} = editOptions

  useEffect(() => {
    if (publication && cid) {
      // get the publication fixed cpm we need to edit from the database
      submitRequest(getPublicationFixedCpm, [publication, parseInt(cid)], (response) => {
        let errorPage = getErrorPage(response)

        if (errorPage) {
          navigate(errorPage)
        } else {
          // we were able to fetch current publication fixed cpm to edit
          setPublicationFixedCpm(response)
          // we also set the form to be the publication's fixed cpm details
          setForm(fillEditForm(response))
        }
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publication, cid])

  useEffect(() => {
    if (publicationFixedCpm) {
      krysApp.setPageTitle(
        generatePageTitle(
          Sections.SUPPLY_PUBLICATION_FIXED_CPM,
          PageTypes.EDIT,
          `${publication?.name}'s fixed CPM`
        )
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicationFixedCpm])

  const onChangeHandler = (e: any) => {
    genericOnChangeHandler(e, form, setForm)
  }

  const handleEdit = (e: any, fns: any) => {
    if (publication && publicationFixedCpm) {
      // we need to update the fixed cpm data by doing API call with form
      submitRequest(
        updatePublicationFixedCpm,
        [publication, publicationFixedCpm.id, form],
        (response) => {
          // we got the updated publication fixed cpm so we're good
          krysApp.setAlert({
            message: new AlertMessageGenerator(
              'publication fixed cpm',
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
      <KTCardHeader text='Edit Publication Fixed CPM (NET)' />

      <KTCardBody>
        <FormErrors errorMessages={formErrors} />

        <Formik
          initialValues={form}
          validationSchema={publicationFixedCpmSchema(true)}
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
                <KrysFormLabel text='Formats' isRequired={true} />

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
                <KrysFormLabel text='Price' isRequired={true} />

                <Field
                  className='form-control fs-base'
                  type='number'
                  placeholder='Enter the price'
                  name='price'
                />

                <div className='mt-1 text-danger'>{errors?.price ? errors?.price : null}</div>
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

export default PublicationFixedCpmEdit
