import * as Yup from 'yup'

export interface PublicationVerticalFormFields {
  vertical_ids: number[]
  is_primary: number
}

export const defaultPublicationVerticalFormFields: PublicationVerticalFormFields = {
  vertical_ids: [],
  is_primary: 0,
}

export interface PublicationVerticalEditFormFields
  extends Omit<PublicationVerticalFormFields, 'vertical_ids'> {
  vertical_id: number
}

const {vertical_ids, ...defaultFields} = defaultPublicationVerticalFormFields

export const defaultPublicationVerticalEditFormFields: PublicationVerticalEditFormFields = {
  vertical_id: 0,
  ...defaultFields,
}

export const publicationVerticalSchema = (isEdit: boolean) => {
  let schema = {
    ...(isEdit
      ? {
          vertical_id: Yup.number().required().min(1, 'vertical is a required field'),
          is_primary: Yup.string().required(),
        }
      : {
          vertical_ids: Yup.array()
            .of(Yup.number())
            .required()
            .min(1, 'You must select at least one vertical'),
        }),
  }

  return Yup.object().shape(schema)
}
