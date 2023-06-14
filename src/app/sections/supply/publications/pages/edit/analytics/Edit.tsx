import {Field, Form, Formik} from 'formik'
import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import Select from 'react-select'
import {KTCard, KTCardBody} from '../../../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../../../_metronic/helpers/components/KTCardHeader'
import FormErrors from '../../../../../../components/forms/FormErrors'
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
import {PublicationAnalytic} from '../../../../../../models/supply/publication/PublicationAnalytic'
import {useKrysApp} from '../../../../../../modules/general/KrysApp'
import {
  getPublicationAnalytic,
  updatePublicationAnalytic,
} from '../../../../../../requests/supply/publication/PublisherAnalytic'
import {
  defaultPublicationAnalyticFormFields,
  fillEditForm,
  PublicationAnalyticFormFields,
  PublicationAnalyticSchema,
} from '../../../core/edit/analytics/form'
import {usePublication} from '../../../core/PublicationContext'
import {usePublicationEdit} from '../../../core/PublicationEditContext'

const PublicationAnalyticEdit: React.FC = () => {
  const {cid} = useParams()
  const navigate = useNavigate()

  const {options} = usePublication()
  const {publication, editOptions} = usePublicationEdit()
  const krysApp = useKrysApp()

  const [form, setForm] = useState<PublicationAnalyticFormFields>(
    defaultPublicationAnalyticFormFields
  )
  const [formErrors, setFormErrors] = useState<string[]>([])

  const [publicationAnalytic, setPublicationAnalytic] = useState<PublicationAnalytic | null>(null)

  const {regions, countries} = options
  const {devices} = editOptions

  useEffect(() => {
    if (publication && cid) {
      // get the publication analytics we need to edit from the database
      submitRequest(getPublicationAnalytic, [publication, parseInt(cid)], (response) => {
        let errorPage = getErrorPage(response)

        if (errorPage) {
          navigate(errorPage)
        } else {
          // we were able to fetch current publication analytics to edit
          setPublicationAnalytic(response)

          // we also set the form to be the publication's analytics details
          setForm(fillEditForm(response))
        }
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publication, cid])

  useEffect(() => {
    if (publicationAnalytic) {
      krysApp.setPageTitle(
        generatePageTitle(
          Sections.SUPPLY_PUBLICATION_ANALYTICS,
          PageTypes.EDIT,
          `${publication?.name}'s analytic`
        )
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicationAnalytic])

  const onChangeHandler = (e: any) => {
    genericOnChangeHandler(e, form, setForm)
  }

  const handleEdit = (e: any, fns: any) => {
    if (publication && publicationAnalytic) {
      // we need to update the analytic's data by doing API call with form
      submitRequest(
        updatePublicationAnalytic,
        [publication, publicationAnalytic.id, form],
        (response) => {
          // we got the updated publication analytics so we're good
          krysApp.setAlert({
            message: new AlertMessageGenerator(
              'publication analytic',
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
      <KTCardHeader text='Edit Publication Analytic' />

      <KTCardBody>
        <FormErrors errorMessages={formErrors} />

        <Formik
          initialValues={form}
          validationSchema={PublicationAnalyticSchema}
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
                <KrysFormLabel text='Device' isRequired={false} />

                <Select
                  name='device_id'
                  value={devices.find((device) => device.id === form.device_id)}
                  options={devices}
                  getOptionLabel={(instance) => instance.name}
                  getOptionValue={(instance) => instance.id.toString()}
                  placeholder='Select a device'
                  onChange={(e) => {
                    genericSingleSelectOnChangeHandler(e, form, setForm, 'device_id')
                  }}
                  isClearable={true}
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

              <KrysFormFooter cancelUrl={`/supply/publications/${publication?.id}/edit`} />
            </Form>
          )}
        </Formik>
      </KTCardBody>
    </KTCard>
  )
}

export default PublicationAnalyticEdit
