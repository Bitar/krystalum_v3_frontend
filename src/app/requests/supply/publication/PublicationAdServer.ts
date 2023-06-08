import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData} from '../../../helpers/requests'
import {AdServer, AdServerPaginate} from '../../../models/misc/AdServer'
import {Publication} from '../../../models/supply/publication/Publication'

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/publications`
const ENDPOINT_ADDITION = 'ad-servers'

export const getPublicationAdServers = (
  publicationId: number,
  query?: String
): Promise<AdServerPaginate> => {
  let url = `${ENDPOINT}/${publicationId}/${ENDPOINT_ADDITION}`

  if (query) {
    url += `?${query}`
  }

  return axios
    .get(url)
    .then((response: AxiosResponse<AdServerPaginate>) => response.data)
    .catch((error) => {
      return error
    })
}

export const getPublicationAdServer = async (
  publication: Publication,
  id: number
): Promise<AdServer | AxiosError | undefined> => {
  let url = `${ENDPOINT}/${publication.id}/${ENDPOINT_ADDITION}`

  return await axios
    .get(url + '/' + id)
    .then((response) => response.data.data)
    .catch((error) => {
      return error
    })
}

export const storePublicationAdServer = async (
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

export const updatePublicationAdServer = async (
  publication: Publication,
  id: number,
  publicationAdServer: any
): Promise<AdServer | AxiosError | undefined> => {
  let url = `${ENDPOINT}/${publication.id}/${ENDPOINT_ADDITION}`

  let formData = createFormData(publicationAdServer)

  formData.append('_method', 'put')

  return await axios
    .post(url + '/' + id, formData)
    .then((response) => response.data.data)
    .catch((error) => {
      return error
    })
}
