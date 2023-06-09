import {Form, Formik} from 'formik'
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Select from 'react-select'
import {KTCard, KTCardBody} from '../../../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../../../_metronic/helpers/components/KTCardHeader'
import Alert from '../../../../../../components/alerts/Alert'
import FormErrors from '../../../../../../components/forms/FormErrors'
import {indentOptions} from '../../../../../../components/forms/IndentOptions'
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
import {PublicationFormat} from '../../../../../../models/supply/publication/PublicationFormat'
import {useKrysApp} from '../../../../../../modules/general/KrysApp'
import {
  getPublicationFormat,
  updatePublicationFormat,
} from '../../../../../../requests/supply/publication/PublicationFormat'
import {
  defaultPublicationFormatEditFormFields,
  PublicationFormatEditFormFields,
  publicationFormatSchema,
} from '../../../core/edit/formats/form'
import {checkFormats} from '../../../core/helpers'
import {usePublication} from '../../../core/PublicationContext'
import {usePublicationEdit} from '../../../core/PublicationEditContext'

const PublicationFormatEdit: React.FC = () => {
  const {cid} = useParams()

  const {options} = usePublication()
  const {publication} = usePublicationEdit()
  const krysApp = useKrysApp()

  const [form, setForm] = useState<PublicationFormatEditFormFields>(
    defaultPublicationFormatEditFormFields
  )
  const [formErrors, setFormErrors] = useState<string[]>([])
  const [alertMessages, setAlertMessages] = useState<string[]>([])

  const [publicationFormat, setPublicationFormat] = useState<PublicationFormat | null>(null)

  const {formats, formatTypes} = options

  useEffect(() => {
    if (publication && cid) {
      // get the publication format we need to edit from the database
      submitRequest(
        getPublicationFormat,
        [publication, parseInt(cid)],
        (response) => {
          // we were able to fetch current publication format to edit
          setPublicationFormat(response)

          // we also set the form to be the publication format details
          const {format, type, ...currentPublicationFormat} = response

          setForm({...currentPublicationFormat, format_id: format.id, type: type.id})
        },
        setFormErrors
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publication, cid])

  useEffect(() => {
    if (publicationFormat) {
      krysApp.setPageTitle(
        generatePageTitle(
          Sections.SUPPLY_PUBLICATION_FORMATS,
          PageTypes.EDIT,
          `${publication?.name} - ${publicationFormat.format.name}`
        )
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicationFormat])

  const onChangeHandler = (e: any) => {
    genericOnChangeHandler(e, form, setForm)
  }

  const handleEdit = () => {
    if (publication && publicationFormat) {
      const message: string = checkFormats(publication, formats, form.format_id, form.type)

      if (message !== '') {
        setAlertMessages((prevMessage) => [...prevMessage, message])
      } else {
        // we need to update the publication format's data by doing API call with form
        submitRequest(
          updatePublicationFormat,
          [publication, publicationFormat.id, form],
          (response) => {
            krysApp.setAlert({
              message: new AlertMessageGenerator(
                'publication format',
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
  }

  return (
    <KTCard>
      <KTCardHeader text='Edit Publication Format' />

      <KTCardBody>
        <FormErrors errorMessages={formErrors} />

        {alertMessages.length > 0 && (
          <Alert title={'Warning!'} messages={alertMessages} setMessages={setAlertMessages} />
        )}

        <Formik
          initialValues={form}
          validationSchema={publicationFormatSchema(true)}
          onSubmit={handleEdit}
          enableReinitialize
        >
          {({errors}) => (
            <Form onChange={onChangeHandler}>
              <div className='mb-7'>
                <KrysFormLabel text='Format' isRequired={true} />

                <Select
                  name={'format_id'}
                  value={formats.find((format) => format.id === form.format_id)}
                  options={formats}
                  getOptionLabel={(instance) => instance.name}
                  getOptionValue={(instance) => instance.id.toString()}
                  placeholder={'Select a format'}
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
                <KrysFormLabel text='Type' isRequired={true} />

                <Select
                  name={'type'}
                  value={formatTypes.find((formatType) => formatType.id === form.type)}
                  options={formatTypes}
                  getOptionLabel={(instance) => instance.name}
                  getOptionValue={(instance) => instance.id.toString()}
                  placeholder={'Select a type'}
                  onChange={(e) => {
                    genericSingleSelectOnChangeHandler(e, form, setForm, 'type')
                  }}
                />

                <div className='mt-1 text-danger'>{errors?.type ? errors?.type : null}</div>
              </div>

              <KrysFormFooter cancelUrl={`/supply/publications/${publication?.id}/edit`} />
            </Form>
          )}
        </Formik>
      </KTCardBody>
    </KTCard>
  )
}

export default PublicationFormatEdit
