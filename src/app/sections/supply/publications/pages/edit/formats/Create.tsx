import {Form, Formik} from 'formik'
import React, {useRef, useState} from 'react'
import Select from 'react-select'
import {KTCard, KTCardBody, QUERIES} from '../../../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../../../_metronic/helpers/components/KTCardHeader'
import FormErrors from '../../../../../../components/forms/FormErrors'
import {indentOptions} from '../../../../../../components/forms/IndentOptions'
import KrysFormFooter from '../../../../../../components/forms/KrysFormFooter'
import KrysFormLabel from '../../../../../../components/forms/KrysFormLabel'
import KrysInnerTable from '../../../../../../components/tables/KrysInnerTable'
import {AlertMessageGenerator} from '../../../../../../helpers/AlertMessageGenerator'
import {
  genericMultiSelectOnChangeHandler,
  genericOnChangeHandler,
  genericSingleSelectOnChangeHandler,
} from '../../../../../../helpers/form'
import {submitRequest} from '../../../../../../helpers/requests'
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

  const handleCreate = (e: any, fns: any) => {
    if (publication) {
      // as long as we are updating the create form, we should set the table refresh to false
      setRefreshTable(false)

      // send API request to create the publication formats
      submitRequest(
        storePublicationFormat,
        [publication, form],
        (response) => {
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
        },
        setFormErrors,
        fns
      )

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
                <KrysFormLabel text='Type' isRequired={true} />

                <Select
                  name='type'
                  options={formatTypes}
                  getOptionLabel={(instance) => instance.name}
                  getOptionValue={(instance) => instance.id.toString()}
                  onChange={(e) => {
                    selectChangeHandler(e, 'type')
                  }}
                  placeholder='Select a type'
                  isClearable={true}
                  ref={formatTypesSelectRef}
                />

                <div className='mt-1 text-danger'>{errors?.type ? errors?.type : null}</div>
              </div>

              <KrysFormFooter cancelUrl='/supply/publications' />
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
          />
        )}
      </KTCardBody>
    </KTCard>
  )
}

export default PublicationFormatCreate
