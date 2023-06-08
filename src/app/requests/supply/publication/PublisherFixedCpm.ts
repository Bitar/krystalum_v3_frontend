import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData} from '../../../helpers/requests'
import {Publication} from '../../../models/supply/publication/Publication'
import {
  PublicationFixedCpm,
  PublicationFixedCpmPaginate,
} from '../../../models/supply/publication/PublicationFixedCpm'

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/publications`
const ENDPOINT_ADDITION = 'fixed-cpms'

export const getPublicationFixedCpms = (
  publicationId: number,
  query?: String
): Promise<PublicationFixedCpmPaginate> => {
  let url = `${ENDPOINT}/${publicationId}/${ENDPOINT_ADDITION}`

  if (query) {
    url += `?${query}`
  }

  return axios
    .get(url)
    .then((response: AxiosResponse<PublicationFixedCpmPaginate>) => response.data)
    .catch((error) => {
      return error
    })
}

export const getPublicationFixedCpm = async (
  publication: Publication,
  id: number
): Promise<PublicationFixedCpm | AxiosError | undefined> => {
  let url = `${ENDPOINT}/${publication.id}/${ENDPOINT_ADDITION}`

  return await axios
    .get(url + '/' + id)
    .then((response) => response.data.data)
    .catch((error) => {
      return error
    })
}

export const storePublicationFixedCpm = async (
  publication: Publication,
  form: any
): Promise<PublicationFixedCpm | AxiosError | undefined> => {
  let url = `${ENDPOINT}/${publication.id}/${ENDPOINT_ADDITION}`

  let formData = createFormData(form)

  return await axios
    .post(url, formData)
    .then((response) => response.data)
    .catch((error) => {
      return error
    })
}

export const updatePublicationFixedCpm = async (
  publication: Publication,
  id: number,
  publicationFixedCpm: any
): Promise<PublicationFixedCpm | AxiosError | undefined> => {
  let url = `${ENDPOINT}/${publication.id}/${ENDPOINT_ADDITION}`

  let formData = createFormData(publicationFixedCpm)

  formData.append('_method', 'put')

  return await axios
    .post(url + '/' + id, formData)
    .then((response) => response.data.data)
    .catch((error) => {
      return error
    })
}
