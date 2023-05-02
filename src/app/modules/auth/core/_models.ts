import {User} from '../../../models/iam/User'

export interface AuthModel {
  data: User
  token: string,
  impersonatedUserId?: number
}
