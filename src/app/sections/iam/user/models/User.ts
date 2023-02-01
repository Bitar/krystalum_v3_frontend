import {ID, Response} from '../../../../../_metronic/helpers'

export type User = {
  id: ID
  name: string
  email: string
}

export type UserArray = Response<Array<User>>