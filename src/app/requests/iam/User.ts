import {User, UserPaginate} from '../../models/iam/User'
import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData} from '../../helpers/requests';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/iam/users`

export const getUsers = (query?: String): Promise<UserPaginate> => {
  let url = `${ENDPOINT}`

  if (query) {
    url += `?${query}`
  }

  return axios.get(url).then((response: AxiosResponse<UserPaginate>) => response.data)
}

export const getUser = async (id: number): Promise<User | AxiosError | undefined> => {
  return await axios.get(ENDPOINT + '/' + id)
      .then(res => res.data.data).catch((error) => {
        return error;
      });
}

export const updateUser = async (user: any): Promise<User | AxiosError | undefined> => {
  let formData = createFormData(user);

  formData.append('_method', 'put');

  return await axios.post(ENDPOINT + '/' + user.id, formData).then(res => res.data.data).catch((error) => {
    return error;
  });
}

export const storeUser = async (user: any): Promise<User | AxiosError | undefined> => {
  let formData = createFormData(user);

  return await axios.post(ENDPOINT + '/', formData).then(res => res.data.data).catch((error) => {
    return error;
  });
}
