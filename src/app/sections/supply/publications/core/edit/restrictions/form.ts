import * as Yup from 'yup'
import {GeoTypeEnum} from '../../../../../../enums/Supply/GeoTypeEnum'
import {getEnumIds} from '../../../../../../helpers/dataManipulation'
import {DEFAULT_CAMPAIGN_RESTRICTION_TYPE} from '../../../../../../helpers/settings'
import {PublicationCampaignRestriction} from '../../../../../../models/supply/publication/PublicationCampaignRestriction'

export interface PublicationCampaignRestrictionFormFields {
  type: string
  geo_type: number
  geo_ids: number[]
  format_ids: number[]
  campaign_type_ids?: number[]
  website_page_ids?: number[]
  requirement_ids?: number[]
}

export const defaultPublicationCampaignRestrictionFormFields: PublicationCampaignRestrictionFormFields =
  {
    type: DEFAULT_CAMPAIGN_RESTRICTION_TYPE.id,
    geo_type: 0,
    geo_ids: [],
    format_ids: [],
  }

export interface PublicationCampaignRestrictionMetaFormFields {
  campaign_restriction_meta: string
}

export const defaultPublicationCampaignRestrictionMetaFormFields: PublicationCampaignRestrictionMetaFormFields =
  {
    campaign_restriction_meta: '',
  }

export interface CampaignRestrictionsFilterFields {
  type?: string
}

export const defaultCampaignRestrictionsFilterFields = {
  type: DEFAULT_CAMPAIGN_RESTRICTION_TYPE.id,
}

export const publicationCampaignRestrictionSchema = (isEdit: boolean) => {
  let schema = {
    geo_type: Yup.number().oneOf(getEnumIds(GeoTypeEnum)).required(),
    format_ids: Yup.array()
      .of(Yup.number())
      .required()
      .min(1, 'You must select at least one format'),
    geo_ids: Yup.array().of(Yup.number()).required().min(1, 'You must select at least one geo'),
  }

  return Yup.object().shape(schema)
}

export const PublicationCampaignRestrictionMetaSchema = Yup.object().shape({
  campaign_restriction_meta: Yup.string().required(),
})

export function fillEditForm(publicationCampaignRestriction: PublicationCampaignRestriction) {
  const form: PublicationCampaignRestrictionFormFields = {
    ...publicationCampaignRestriction,
    type: publicationCampaignRestriction.type.id,
    geo_type: publicationCampaignRestriction.geos[0].geoType.id,
    geo_ids: publicationCampaignRestriction.geos.map((geo) => geo.geo.id),
    format_ids: publicationCampaignRestriction.formats.map((format) => format.id),
    campaign_type_ids: publicationCampaignRestriction.campaignTypes?.map(
      (campaignType) => campaignType.id
    ),
    website_page_ids: publicationCampaignRestriction.websitePages?.map(
      (websitePage) => websitePage.id
    ),
    requirement_ids: publicationCampaignRestriction.requirements?.map(
      (requirement) => requirement.id
    ),
  }

  return form
}
