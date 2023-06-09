import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData} from '../../../helpers/requests'
import {Publication} from '../../../models/supply/publication/Publication'
import {
  PublicationMinimumEcpm,
  PublicationMinimumEcpmPaginate,
} from '../../../models/supply/publication/PublicationMinimumEcpm'

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/publications`
const ENDPOINT_ADDITION = 'minimum-ecpms'

export const getPublicationMinimumEcpms = (
  publicationId: number,
  query?: String
): Promise<PublicationMinimumEcpmPaginate> => {
  let url = `${ENDPOINT}/${publicationId}/${ENDPOINT_ADDITION}`

  if (query) {
    url += `?${query}`
  }

  return axios
    .get(url)
    .then((response: AxiosResponse<PublicationMinimumEcpmPaginate>) => response.data)
    .catch((error) => {
      return error
    })
}

export const getPublicationMinimumEcpm = async (
  publication: Publication,
  id: number
): Promise<PublicationMinimumEcpm | AxiosError | undefined> => {
  let url = `${ENDPOINT}/${publication.id}/${ENDPOINT_ADDITION}`

  return await axios
    .get(url + '/' + id)
    .then((response) => response.data.data)
    .catch((error) => {
      return error
    })
}

export const storePublicationMinimumEcpm = async (
  publication: Publication,
  form: any
): Promise<PublicationMinimumEcpm | AxiosError | undefined> => {
  let url = `${ENDPOINT}/${publication.id}/${ENDPOINT_ADDITION}`

  let formData = createFormData(form)

  return await axios
    .post(url, formData)
    .then((response) => response.data.data)
    .catch((error) => {
      return error
    })
}

export const updatePublicationMinimumEcpm = async (
  publication: Publication,
  id: number,
  publicationMinimumEcpm: any
): Promise<PublicationMinimumEcpm | AxiosError | undefined> => {
  let url = `${ENDPOINT}/${publication.id}/${ENDPOINT_ADDITION}`

  let formData = createFormData(publicationMinimumEcpm)

  formData.append('_method', 'put')

  return await axios
    .post(url + '/' + id, formData)
    .then((response) => response.data.data)
    .catch((error) => {
      return error
    })
}
