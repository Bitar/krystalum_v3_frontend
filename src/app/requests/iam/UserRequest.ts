import {UserPaginate} from '../../models/iam/User'
import axios, {AxiosResponse} from 'axios'

const API_URL = process.env.REACT_APP_API_URL
const GET_USERS_URL = `${API_URL}/users`

export const getUsers = (query?: String): Promise<UserPaginate> => {
  let url = `${GET_USERS_URL}`

  if (query) {
    url += `?${query}`
  }

  return axios.get(url).then((response: AxiosResponse<UserPaginate>) => response.data)
}
