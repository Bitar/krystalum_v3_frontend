import * as Yup from 'yup'

export interface FilterFields {
  name?: string
  publishers_ids?: number[]
  languages_ids?: number[]
  live_date_range?: Date | string
  formats_ids?: number[]
  ad_servers_ids?: number[]
  technologies_ids?: number[]
  verticals_ids?: number[]
  creation_date_range?: Date | string
  countries_ids?: number[]
  regions_ids?: number[]
  url?: string[]
  unique_identifiers?: string[]
  is_deal_pmp?: number | string
  is_archived?: number
}

export const FilterSchema = Yup.object().shape({})
