import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData} from '../../../helpers/requests'
import {Publisher, PublisherPaginate} from '../../../models/supply/publisher/Publisher'

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/publishers`

export const EXPORT_ENDPOINT = `${ENDPOINT}/export`

export const INCLUDES =
  'include[]=tier&include[]=info&include[]=accountManager&include[]=publications'

export const getAllPublishers = async (): Promise<Publisher[] | AxiosError | undefined> => {
  return axios
    .get(ENDPOINT + '/all?sort[]=name')
    .then((response: AxiosResponse<PublisherPaginate>) => response.data.data)
    .catch((error) => {
      return error
    })
}

export const getPublishers = (query?: String): Promise<PublisherPaginate> => {
  let url = `${ENDPOINT}?${INCLUDES}&filter[is_archived]=0`

  if (query) {
    url += `&${query}`
  }

  return axios
    .get(url)
    .then((response: AxiosResponse<PublisherPaginate>) => response.data)
    .catch((error) => {
      return error
    })
}

export const getArchivedPublishers = (query?: String): Promise<PublisherPaginate> => {
  let url = `${ENDPOINT}/archived?${INCLUDES}`

  if (query) {
    url += `&${query}`
  }

  return axios
    .get(url)
    .then((response: AxiosResponse<PublisherPaginate>) => response.data)
    .catch((error) => {
      return error
    })
}

export const getPublisher = async (id: number): Promise<Publisher | AxiosError | undefined> => {
  return await axios
    .get(`${ENDPOINT}/${id}?${INCLUDES}`)
    .then((response) => response.data.data)
    .catch((error) => {
      return error
    })
}

export const storePublisher = async (
  publisher: any
): Promise<Publisher | AxiosError | undefined> => {
  let formData = createFormData(publisher)

  return await axios
    .post(ENDPOINT + '/', formData)
    .then((response) => response.data.data)
    .catch((error) => {
      return error
    })
}

export const updatePublisher = async (
  id: number,
  publisher: any
): Promise<Publisher | AxiosError | undefined> => {
  let formData = createFormData(publisher)

  formData.append('_method', 'put')

  return await axios
    .post(ENDPOINT + '/' + id, formData)
    .then((response) => response.data.data)
    .catch((error) => {
      return error
    })
}
