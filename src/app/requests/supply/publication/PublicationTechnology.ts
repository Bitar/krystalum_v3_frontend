import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData} from '../../../helpers/requests'
import {Technology, TechnologyPaginate} from '../../../models/misc/Technology'
import {Publication} from '../../../models/supply/publication/Publication'

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/publications`
const ENDPOINT_ADDITION = 'technologies'

export const getPublicationTechnologies = (
  publicationId: number,
  query?: String
): Promise<TechnologyPaginate> => {
  let url = `${ENDPOINT}/${publicationId}/${ENDPOINT_ADDITION}`

  if (query) {
    url += `?${query}`
  }

  return axios
    .get(url)
    .then((response: AxiosResponse<TechnologyPaginate>) => response.data)
    .catch((error) => {
      return error
    })
}

export const getPublicationTechnology = async (
  publication: Publication,
  id: number
): Promise<Technology | AxiosError | undefined> => {
  let url = `${ENDPOINT}/${publication.id}/${ENDPOINT_ADDITION}`

  return await axios
    .get(url + '/' + id)
    .then((response) => response.data.data)
    .catch((error) => {
      return error
    })
}

export const storePublicationTechnology = async (
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

export const updatePublicationTechnology = async (
  publication: Publication,
  id: number,
  publicationTechnology: any
): Promise<Technology | AxiosError | undefined> => {
  let url = `${ENDPOINT}/${publication.id}/${ENDPOINT_ADDITION}`

  let formData = createFormData(publicationTechnology)

  formData.append('_method', 'put')

  return await axios
    .post(url + '/' + id, formData)
    .then((response) => response.data.data)
    .catch((error) => {
      return error
    })
}
