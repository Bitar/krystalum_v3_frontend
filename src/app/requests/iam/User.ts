import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData} from '../../helpers/requests'
import {User, UserList, UserPaginate} from '../../models/iam/User'

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/iam/users`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`

export const getAllUsers = async (): Promise<User[] | AxiosError | undefined> => {
  return axios
    .get(ENDPOINT + '/all?sort[]=name')
    .then((response: AxiosResponse<UserList>) => response.data.data)
    .catch((error) => {
      return error
    })
}

export const getUsers = (query?: String): Promise<UserPaginate> => {
  let url = `${ENDPOINT}`

  if (query) {
    url += `?${query}`
  }

  return axios.get(url).then((response: AxiosResponse<UserPaginate>) => response.data)
}

export const getUser = async (id: number): Promise<User | AxiosError | undefined> => {
  return await axios
    .get(ENDPOINT + '/' + id)
    .then((res) => res.data.data)
    .catch((error) => {
      return error
    })
}

export const updateUser = async (id: number, user: any): Promise<User | AxiosError | undefined> => {
  let formData = createFormData(user)

  formData.append('_method', 'put')

  return await axios
    .post(ENDPOINT + '/' + id, formData)
    .then((res) => res.data.data)
    .catch((error) => {
      return error
    })
}

export const storeUser = async (user: any): Promise<User | AxiosError | undefined> => {
  let formData = createFormData(user)

  return await axios
    .post(ENDPOINT + '/', formData)
    .then((res) => res.data.data)
    .catch((error) => {
      return error
    })
}

export const changePassword = async (
  user: any,
  form: any
): Promise<User | AxiosError | undefined> => {
  let formData = createFormData(form)

  formData.append('_method', 'put')

  return await axios
    .post(ENDPOINT + '/' + user.id + '/password', formData)
    .then((res) => res.data)
    .catch((error) => {
      return error
    })
}
