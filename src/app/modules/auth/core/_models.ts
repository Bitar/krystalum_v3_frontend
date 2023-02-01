import {User} from '../../../sections/iam/user/models/User'

export interface AuthModel {
  data: User
  token: string
}
