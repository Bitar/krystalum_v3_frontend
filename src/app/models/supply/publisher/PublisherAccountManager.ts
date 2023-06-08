import {Response} from '../../../../_metronic/helpers'

export type PublisherAccountManager = {
  id: number
  name: string
  email: string
  assignment_date: Date
  is_active: number
}

export type PublisherAccountManagerPaginate = Response<PublisherAccountManager[]>
