import * as Yup from 'yup'

export interface FilterFields {
  name?: string
  countries_ids?: number[]
  regions_ids?: number[]
  tiers_ids?: number[]
  integration_date_range?: string
  account_managers_ids?: number[]
  is_archived?: number
}

export const FilterSchema = Yup.object().shape({})
