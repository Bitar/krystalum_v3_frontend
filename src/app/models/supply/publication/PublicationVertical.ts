import {Response} from '../../../../_metronic/helpers'
import {Vertical} from '../../misc/Vertical'

export type PublicationVertical = {
  id: number
  vertical: Vertical
  is_primary: number
}

export type PublicationVerticalPaginate = Response<PublicationVertical[]>
