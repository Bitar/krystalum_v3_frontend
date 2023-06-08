import {Response} from '../../../../_metronic/helpers'

export type PublicationCampaignRestrictionMeta = {
  id: number
  campaign_restriction_meta: string
}

export type PublicationCampaignRestrictionMetaPaginate = Response<
  PublicationCampaignRestrictionMeta[]
>
