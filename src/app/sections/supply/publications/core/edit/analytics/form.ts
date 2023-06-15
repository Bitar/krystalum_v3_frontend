import * as Yup from 'yup'
import {GeoTypeEnum} from '../../../../../../enums/Supply/GeoTypeEnum'
import {PublicationAnalyticTypeEnum} from '../../../../../../enums/Supply/PublicationAnalyticTypeEnum'
import {getEnumIds} from '../../../../../../helpers/dataManipulation'
import {DEFAULT_ANALYTIC_TYPE} from '../../../../../../helpers/settings'
import {PublicationAnalytic} from '../../../../../../models/supply/publication/PublicationAnalytic'

export interface PublicationAnalyticFormFields {
  type: string
  geo_type: number
  geo_id: number
  device_id?: number | null
  value: number
}

export const defaultPublicationAnalyticFormFields = {
  type: DEFAULT_ANALYTIC_TYPE.id,
  geo_type: 0,
  geo_id: 0,
  value: 0,
}

export interface AnalyticsFilterFields {
  type?: string
}

export const defaultAnalyticsFilterFields = {
  type: DEFAULT_ANALYTIC_TYPE.id,
}

export const PublicationAnalyticSchema = Yup.object().shape({
  geo_type: Yup.number()
    .oneOf(getEnumIds(GeoTypeEnum))
    // .oneOf(getEnumValues(GeoTypeEnum) as number[])
    .required(),
  geo_id: Yup.number().min(1, 'geo is a required field').required(),
  value: Yup.number().when('type', {
    is: (type: string) =>
      type === PublicationAnalyticTypeEnum.UNIQUE_USERS ||
      type === PublicationAnalyticTypeEnum.PAGE_VIEWS,
    then: Yup.number().integer().min(1, 'value must be greater than 0').required(),
    otherwise: Yup.number().min(1, 'value must be greater than 0').required(),
  }),
})

export function fillEditForm(publicationAnalytic: PublicationAnalytic) {
  const form: PublicationAnalyticFormFields = {
    ...publicationAnalytic,
    type: publicationAnalytic.type.id,
    geo_type: publicationAnalytic.geoType.id,
    geo_id: publicationAnalytic.geo.id,
    device_id: publicationAnalytic.device.id,
    value:
      publicationAnalytic.type.id === PublicationAnalyticTypeEnum.UNIQUE_USERS ||
      publicationAnalytic.type.id === PublicationAnalyticTypeEnum.PAGE_VIEWS
        ? Math.floor(publicationAnalytic.value)
        : publicationAnalytic.value,
  }

  return form
}
