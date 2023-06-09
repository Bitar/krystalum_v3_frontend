import axios from 'axios'
import {Form, Formik} from 'formik'
import React, {useRef, useState} from 'react'
import Select from 'react-select'
import {KTCard, KTCardBody, QUERIES} from '../../../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../../../_metronic/helpers/components/KTCardHeader'
import Alert from '../../../../../../components/alerts/Alert'
import FormErrors from '../../../../../../components/forms/FormErrors'
import {indentOptions} from '../../../../../../components/forms/IndentOptions'
import KrysFormFooter from '../../../../../../components/forms/KrysFormFooter'
import KrysFormLabel from '../../../../../../components/forms/KrysFormLabel'
import KrysInnerTable from '../../../../../../components/tables/KrysInnerTable'
import {AlertMessageGenerator} from '../../../../../../helpers/AlertMessageGenerator'
import {
  GenericErrorMessage,
  genericMultiSelectOnChangeHandler,
  genericOnChangeHandler,
  genericSingleSelectOnChangeHandler,
} from '../../../../../../helpers/form'
import {extractErrors} from '../../../../../../helpers/requests'
import {Actions, KrysToastType} from '../../../../../../helpers/variables'
import {useKrysApp} from '../../../../../../modules/general/KrysApp'
import {
  getPublicationFormats,
  storePublicationFormat,
} from '../../../../../../requests/supply/publication/PublicationFormat'
import {
  defaultPublicationFormatFormFields,
  PublicationFormatFormFields,
  publicationFormatSchema,
} from '../../../core/edit/formats/form'
import {PublicationFormatsColumns} from '../../../core/edit/formats/TableColumns'
import {usePublication} from '../../../core/PublicationContext'
import {usePublicationEdit} from '../../../core/PublicationEditContext'

const PublicationFormatCreate: React.FC = () => {
  const {options} = usePublication()
  const {publication, setPublication} = usePublicationEdit()
  const krysApp = useKrysApp()

  const [form, setForm] = useState<PublicationFormatFormFields>(defaultPublicationFormatFormFields)
  const [formErrors, setFormErrors] = useState<string[]>([])
  const [refreshTable, setRefreshTable] = useState<boolean>(false)
  const [alertMessages, setAlertMessages] = useState<string[]>([])

  const formatsSelectRef = useRef<any>(null)
  const formatTypesSelectRef = useRef<any>(null)

  const {formats, formatTypes} = options

  const multiSelectChangeHandler = (e: any, key: string) => {
    genericMultiSelectOnChangeHandler(e, form, setForm, key)
  }

  const selectChangeHandler = (e: any, key: string) => {
    genericSingleSelectOnChangeHandler(e, form, setForm, key)
  }

  const onChangeHandler = (e: any) => {
    // as long as we are updating the create form, we should set the table refresh to false
    setRefreshTable(false)

    genericOnChangeHandler(e, form, setForm)
  }

  const handleCreate = () => {
    if (publication) {
      setAlertMessages([])

      // as long as we are updating the create form, we should set the table refresh to false
      setRefreshTable(false)

      let ignoredFormats: string[] = []

      const updatedFormatIds = form.format_ids.filter((formatId) => {
        // we need to check if the formats of the publications include 'All Formats'
        const allFormatExists = publication.formats?.find(
          (publicationFormat) => publicationFormat.format.name === 'All Formats'
        )

        // get the selected format object
        const selectedFormat = formats.find((format) => format.id === formatId)

        // 'All Formats' exists for this publication
        // then, the format should be ignored
        if (allFormatExists && allFormatExists.type.id === form.type && selectedFormat) {
          ignoredFormats.push(selectedFormat.name)

          return false
        }

        const publicationFormatExists = publication.formats?.find(
          (publicationFormat) => publicationFormat.format.id === formatId
        )

        if (publicationFormatExists && publicationFormatExists.type.id === form.type) {
          setAlertMessages((prevAlertMessage) => [
            ...prevAlertMessage,
            `The selected format '${publicationFormatExists.format.name}' with type '${form.type}' already exists.`,
          ])

          return false
        }

        const parentFormat = selectedFormat?.parent

        if (parentFormat) {
          // the format is a child
          const parentPublicationFormatExists = publication.formats?.find(
            (publicationFormat) => publicationFormat.format.id === parentFormat?.id
          )

          if (
            parentPublicationFormatExists &&
            parentPublicationFormatExists.type.id === form.type &&
            publicationFormatExists
          ) {
            return true
          } else {
            if (parentPublicationFormatExists) {
              setAlertMessages((prevAlertMessage) => [
                ...prevAlertMessage,
                `The selected format '${selectedFormat.name}' belongs to the '${parentPublicationFormatExists.format.name}' format, which already exists with the specified type '${form.type}'`,
              ])

              return false
            }

            return true
          }
        }

        // the format is a parent
        return formats.some((childFormat) => {
          const publicationChildFormat = publication.formats?.find(
            (publicationFormat) =>
              publicationFormat.format.id === childFormat.id &&
              publicationFormat.type.id === form.type
          )

          if (publicationChildFormat !== undefined) {
            setAlertMessages((prevAlertMessage) => [
              ...prevAlertMessage,
              `The selected format '${publicationChildFormat.format.name}' with type '${form.type}' already exists.`,
            ])

            return false
          }

          return true
        })
      })

      if (ignoredFormats.length > 0) {
        setAlertMessages((prevAlertMessage) => [
          ...prevAlertMessage,
          `The publication already includes an entry for 'All Formats' with the type '${
            form.type
          }' in its formats.
             Therefore, we have not added the requested formats (${ignoredFormats.join(
               ', '
             )}) with the type '${form.type}' since the 
             'All Formats' format already encompasses them with the same type. 
             Hence, there is no need to add them again`,
        ])
      }

      if (updatedFormatIds.length > 0) {
        // send API request to create the publication formats
        storePublicationFormat(publication, {...form, format_ids: updatedFormatIds}).then(
          (response) => {
            if (axios.isAxiosError(response)) {
              // we need to show the errors
              setFormErrors(extractErrors(response))
            } else if (response === undefined) {
              // show generic error message
              setFormErrors([GenericErrorMessage])
            } else {
              krysApp.setAlert({
                message: new AlertMessageGenerator(
                  'publication format',
                  Actions.CREATE,
                  KrysToastType.SUCCESS
                ).message,
                type: KrysToastType.SUCCESS,
              })

              // now that we have a new record successfully we need to refresh the table
              setRefreshTable(true)

              setPublication(response)
            }
          }
        )
      }

      // clear the selected values from dropdown
      formatsSelectRef.current?.clearValue()
      formatTypesSelectRef.current?.clearValue()

      // we need to clear the form data
      setForm(defaultPublicationFormatFormFields)

      // we need to clear the form errors
      setFormErrors([])
    }
  }

  return (
    <KTCard className='card-bordered border-1'>
      <KTCardHeader text='Add New Format' />

      <KTCardBody>
        <FormErrors errorMessages={formErrors} />

        {alertMessages.length > 0 && (
          <Alert title={'Warning!'} messages={alertMessages} setMessages={setAlertMessages} />
        )}

        <Formik
          initialValues={form}
          validationSchema={publicationFormatSchema(false)}
          onSubmit={handleCreate}
          enableReinitialize
        >
          {({errors}) => (
            <Form onChange={onChangeHandler}>
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
                <KrysFormLabel text='Type' isRequired={true} />

                <Select
                  name='type'
                  menuPlacement={'top'}
                  options={formatTypes}
                  getOptionLabel={(formatType) => formatType?.name}
                  getOptionValue={(formatType) => formatType?.id.toString()}
                  onChange={(e) => {
                    selectChangeHandler(e, 'type')
                  }}
                  placeholder='Select a type'
                  isClearable={true}
                  ref={formatTypesSelectRef}
                />

                <div className='mt-1 text-danger'>{errors?.type ? errors?.type : null}</div>
              </div>

              <KrysFormFooter cancelUrl={'/supply/publications'} />
            </Form>
          )}
        </Formik>

        <div className='separator separator-dashed my-10'></div>

        {publication && (
          <KrysInnerTable
            doRefetch={refreshTable}
            slug='publication-formats'
            queryId={QUERIES.PUBLICATION_FORMATS_LIST}
            requestFunction={getPublicationFormats}
            requestId={publication.id}
            columnsArray={PublicationFormatsColumns}
          ></KrysInnerTable>
        )}
      </KTCardBody>
    </KTCard>
  )
}

export default PublicationFormatCreate
