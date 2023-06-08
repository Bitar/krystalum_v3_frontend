import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData} from '../../../helpers/requests'
import {Publisher} from '../../../models/supply/publisher/Publisher'
import {
  PublisherContact,
  PublisherContactPaginate,
} from '../../../models/supply/publisher/PublisherContact'

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/publishers`
const ENDPOINT_ADDITION = 'contacts'

export const getPublisherContacts = (
  publisherId: number,
  query?: String
): Promise<PublisherContactPaginate> => {
  let url = `${ENDPOINT}/${publisherId}/${ENDPOINT_ADDITION}`

  if (query) {
    url += `?${query}`
  }

  return axios
    .get(url)
    .then((response: AxiosResponse<PublisherContactPaginate>) => response.data)
    .catch((error) => {
      return error
    })
}

export const getPublisherContact = async (
  publisher: Publisher,
  id: number
): Promise<PublisherContact | AxiosError | undefined> => {
  let url = `${ENDPOINT}/${publisher.id}/${ENDPOINT_ADDITION}`

  return await axios
    .get(url + '/' + id)
    .then((response) => response.data.data)
    .catch((error) => {
      return error
    })
}

export const storePublisherContact = async (
  publisher: Publisher,
  form: any
): Promise<PublisherContact | AxiosError | undefined> => {
  let url = `${ENDPOINT}/${publisher.id}/${ENDPOINT_ADDITION}`

  let formData = createFormData(form)

  return await axios
    .post(url, formData)
    .then((response) => response.data)
    .catch((error) => {
      return error
    })
}

export const updatePublisherContact = async (
  publisher: Publisher,
  id: number,
  publisherContact: any
): Promise<PublisherContact | AxiosError | undefined> => {
  let url = `${ENDPOINT}/${publisher.id}/${ENDPOINT_ADDITION}`

  let formData = createFormData(publisherContact)

  formData.append('_method', 'put')

  return await axios
    .post(url + '/' + id, formData)
    .then((response) => response.data.data)
    .catch((error) => {
      return error
    })
}
