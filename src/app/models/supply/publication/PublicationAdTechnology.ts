import {Response} from '../../../../_metronic/helpers'

export type PublicationAdTechnology = {
  id: number
  technology: string
  type: string
}

export type PublicationAdTechnologyPaginate = Response<PublicationAdTechnology[]>
