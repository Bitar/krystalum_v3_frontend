import {Form, Formik} from 'formik'
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Select from 'react-select'
import {KTCard, KTCardBody} from '../../../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../../../_metronic/helpers/components/KTCardHeader'
import FormErrors from '../../../../../../components/forms/FormErrors'
import KrysFormFooter from '../../../../../../components/forms/KrysFormFooter'
import KrysFormLabel from '../../../../../../components/forms/KrysFormLabel'
import {AlertMessageGenerator} from '../../../../../../helpers/AlertMessageGenerator'
import {filterData} from '../../../../../../helpers/dataManipulation'
import {
  genericOnChangeHandler,
  genericSingleSelectOnChangeHandler,
} from '../../../../../../helpers/form'
import {generatePageTitle} from '../../../../../../helpers/pageTitleGenerator'
import {submitRequest} from '../../../../../../helpers/requests'
import {Sections} from '../../../../../../helpers/sections'
import {Actions, KrysToastType, PageTypes} from '../../../../../../helpers/variables'
import {Technology} from '../../../../../../models/misc/Technology'
import {useKrysApp} from '../../../../../../modules/general/KrysApp'
import {
  getPublicationTechnology,
  updatePublicationTechnology,
} from '../../../../../../requests/supply/publication/PublicationTechnology'
import {
  defaultPublicationTechnologyEditFormFields,
  PublicationTechnologyEditFormFields,
  publicationTechnologySchema,
} from '../../../core/edit/technologies/form'
import {usePublication} from '../../../core/PublicationContext'
import {usePublicationEdit} from '../../../core/PublicationEditContext'

const PublicationTechnologyEdit: React.FC = () => {
  const {cid} = useParams()

  const {options} = usePublication()
  const {publication} = usePublicationEdit()
  const krysApp = useKrysApp()

  const [form, setForm] = useState<PublicationTechnologyEditFormFields>(
    defaultPublicationTechnologyEditFormFields
  )
  const [formErrors, setFormErrors] = useState<string[]>([])

  const [publicationTechnology, setPublicationTechnology] = useState<Technology | null>(null)
  const [filteredTechnologies, setFilteredTechnologies] = useState<Technology[]>([])

  const {technologies} = options

  useEffect(() => {
    if (publication && cid) {
      // get the publication technology we need to edit from the database
      submitRequest(
        getPublicationTechnology,
        [publication, parseInt(cid)],
        (response) => {
          // we were able to fetch current publication technology to edit
          setPublicationTechnology(response)

          // we are getting the response as technology and not publication technology
          // response is: {id, name}
          setForm({technology_id: response.id})
        },
        setFormErrors
      )

      const excludedTechnologiesNames: string[] = publication.technologies
        ? publication.technologies?.map((technology) => technology.name)
        : []

      setFilteredTechnologies(filterData(technologies, 'name', excludedTechnologiesNames))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publication, cid])

  useEffect(() => {
    if (publicationTechnology) {
      krysApp.setPageTitle(
        generatePageTitle(
          Sections.SUPPLY_PUBLICATION_TECHNOLOGIES,
          PageTypes.EDIT,
          `${publication?.name} - ${publicationTechnology.name}`
        )
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicationTechnology])

  const onChangeHandler = (e: any) => {
    genericOnChangeHandler(e, form, setForm)
  }

  const handleEdit = (e: any, fns: any) => {
    if (publication && publicationTechnology) {
      // we need to update the publication technology's data by doing API call with form
      submitRequest(
        updatePublicationTechnology,
        [publication, publicationTechnology.id, form],
        (response) => {
          // we got the updated publication technology so we're good
          krysApp.setAlert({
            message: new AlertMessageGenerator(
              'publication technology',
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
      <KTCardHeader text='Edit Publication Technology' />

      <KTCardBody>
        <FormErrors errorMessages={formErrors} />

        <Formik
          initialValues={form}
          validationSchema={publicationTechnologySchema(true)}
          onSubmit={handleEdit}
          enableReinitialize
        >
          {({errors}) => (
            <Form onChange={onChangeHandler}>
              <div className='mb-7'>
                <KrysFormLabel text='Technology' isRequired={true} />

                <Select
                  name='technology_id'
                  value={filteredTechnologies.find(
                    (technology) => technology.id === form.technology_id
                  )}
                  options={filteredTechnologies}
                  getOptionLabel={(instance) => instance.name}
                  getOptionValue={(instance) => instance.id.toString()}
                  placeholder='Select a technology'
                  onChange={(e) => {
                    genericSingleSelectOnChangeHandler(e, form, setForm, 'technology_id')
                  }}
                />

                <div className='mt-1 text-danger'>
                  {errors?.technology_id ? errors?.technology_id : null}
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

export default PublicationTechnologyEdit
