import * as Yup from 'yup'

export interface PublicationTechnologyFormFields {
  technology_ids: number[]
}

export const defaultPublicationTechnologyFormFields: PublicationTechnologyFormFields = {
  technology_ids: [],
}

export interface PublicationTechnologyEditFormFields
  extends Omit<PublicationTechnologyFormFields, 'technology_ids'> {
  technology_id: number
}

export const defaultPublicationTechnologyEditFormFields: PublicationTechnologyEditFormFields = {
  technology_id: 0,
}

export const publicationTechnologySchema = (isEdit: boolean) => {
  let schema = {
    ...(isEdit
      ? {
          technology_id: Yup.number().required().min(1, 'technology is a required field'),
        }
      : {
          technology_ids: Yup.array()
            .of(Yup.number())
            .required()
            .min(1, 'You must select at least one technology'),
        }),
  }

  return Yup.object().shape(schema)
}
