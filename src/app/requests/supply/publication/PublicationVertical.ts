import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData} from '../../../helpers/requests'
import {Publication} from '../../../models/supply/publication/Publication'
import {
  PublicationVertical,
  PublicationVerticalPaginate,
} from '../../../models/supply/publication/PublicationVertical'

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/publications`
const ENDPOINT_ADDITION = 'verticals'

export const getPublicationVerticals = (
  publicationId: number,
  query?: String
): Promise<PublicationVerticalPaginate> => {
  let url = `${ENDPOINT}/${publicationId}/${ENDPOINT_ADDITION}`

  if (query) {
    url += `?${query}`
  }

  return axios
    .get(url)
    .then((response: AxiosResponse<PublicationVerticalPaginate>) => response.data)
    .catch((error) => {
      return error
    })
}

export const getPublicationVertical = async (
  publication: Publication,
  id: number
): Promise<PublicationVertical | AxiosError | undefined> => {
  let url = `${ENDPOINT}/${publication.id}/${ENDPOINT_ADDITION}`

  return await axios
    .get(url + '/' + id)
    .then((response) => response.data.data)
    .catch((error) => {
      return error
    })
}

export const storePublicationVertical = async (
  publication: Publication,
  form: any
): Promise<Publication | AxiosError | undefined> => {
  let url = `${ENDPOINT}/${publication.id}/${ENDPOINT_ADDITION}`

  let formData = createFormData(form)

  return await axios
    .post(url, formData)
    .then((response) => response.data.data)
    .catch((error) => {
      return error
    })
}

export const updatePublicationVertical = async (
  publication: Publication,
  id: number,
  publicationVertical: any
): Promise<PublicationVertical | AxiosError | undefined> => {
  let url = `${ENDPOINT}/${publication.id}/${ENDPOINT_ADDITION}`

  let formData = createFormData(publicationVertical)

  formData.append('_method', 'put')

  return await axios
    .post(url + '/' + id, formData)
    .then((response) => response.data.data)
    .catch((error) => {
      return error
    })
}
