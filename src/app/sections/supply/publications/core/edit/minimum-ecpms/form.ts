import * as Yup from 'yup'
import {GeoTypeEnum} from '../../../../../../enums/Supply/GeoTypeEnum'
import {getEnumIds} from '../../../../../../helpers/dataManipulation'
import {DEFAULT_CURRENCY} from '../../../../../../helpers/settings'
import {PublicationMinimumEcpm} from '../../../../../../models/supply/publication/PublicationMinimumEcpm'

export interface PublicationMinimumEcpmFormFields {
  format_ids: number[]
  geo_type: number
  geo_ids: number[]
  rate: number
  currency_id: number
}

export const defaultPublicationMinimumEcpmFormFields: PublicationMinimumEcpmFormFields = {
  format_ids: [],
  geo_type: 0,
  geo_ids: [],
  rate: 0,
  currency_id: DEFAULT_CURRENCY.id,
}

export interface PublicationMinimumEcpmEditFormFields
  extends Omit<PublicationMinimumEcpmFormFields, 'format_ids' | 'geo_ids'> {
  format_id: number
  geo_id: number
}

const {format_ids, geo_ids, ...defaultFields} = defaultPublicationMinimumEcpmFormFields

export const defaultPublicationMinimumEcpmEditFormFields: PublicationMinimumEcpmEditFormFields = {
  format_id: 0,
  geo_id: 0,
  ...defaultFields,
}

export const publicationMinimumEcpmSchema = (isEdit: boolean) => {
  let schema = {
    geo_type: Yup.number().oneOf(getEnumIds(GeoTypeEnum)).required(),
    ...(isEdit
      ? {
          format_id: Yup.number().required().min(1, 'format is a required field'),
          geo_id: Yup.number().min(1, 'geo is a required field').required(),
        }
      : {
          format_ids: Yup.array()
            .of(Yup.number())
            .required()
            .min(1, 'You must select at least one format'),
          geo_ids: Yup.array()
            .of(Yup.number())
            .required()
            .min(1, 'You must select at least one geo'),
        }),
    rate: Yup.number().min(1, 'price must be greater than 0').required(),
    currency_id: Yup.number().min(1, 'currency is a required field').required(),
  }

  return Yup.object().shape(schema)
}

export function fillEditForm(publicationMinimumEcpm: PublicationMinimumEcpm) {
  const form: PublicationMinimumEcpmEditFormFields = {
    ...publicationMinimumEcpm,
    format_id: publicationMinimumEcpm.format.id,
    geo_type: publicationMinimumEcpm.geoType.id,
    geo_id: publicationMinimumEcpm.geo.id,
    currency_id: publicationMinimumEcpm.currency.id,
  }

  return form
}
