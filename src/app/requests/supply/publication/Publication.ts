import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData} from '../../../helpers/requests'
import {Publication, PublicationPaginate} from '../../../models/supply/publication/Publication'

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/publications`

export const EXPORT_ENDPOINT = `${ENDPOINT}/export`

export const INCLUDES = 'include[]=info&include[]=languages'
export const SHOW_INCLUDES =
  'include[]=info&include[]=languages&include[]=formats&include[]=verticals&include[]=adServers&include[]=technologies'

export const getAllPublications = async (): Promise<Publication[] | AxiosError | undefined> => {
  return axios
    .get(ENDPOINT + '/all?sort[]=name')
    .then((response: AxiosResponse<PublicationPaginate>) => response.data.data)
    .catch((error) => {
      return error
    })
}

export const getPublications = (query?: String): Promise<PublicationPaginate> => {
  let url = `${ENDPOINT}?${INCLUDES}`

  if (query) {
    url += `&${query}`
  }

  return axios
    .get(url)
    .then((response: AxiosResponse<PublicationPaginate>) => response.data)
    .catch((error) => {
      return error
    })
}

export const getArchivedPublications = (query?: String): Promise<PublicationPaginate> => {
  let url = `${ENDPOINT}/archived?${INCLUDES}`

  if (query) {
    url += `&${query}`
  }

  return axios
    .get(url)
    .then((response: AxiosResponse<PublicationPaginate>) => response.data)
    .catch((error) => {
      return error
    })
}

export const getPublication = async (id: number): Promise<Publication | AxiosError | undefined> => {
  return await axios
    .get(`${ENDPOINT}/${id}?${SHOW_INCLUDES}`)
    .then((response) => response.data.data)
    .catch((error) => {
      return error
    })
}

export const storePublication = async (
  publication: any
): Promise<Publication | AxiosError | undefined> => {
  let formData = createFormData(publication)

  return await axios
    .post(ENDPOINT + '/', formData)
    .then((response) => response.data.data)
    .catch((error) => {
      return error
    })
}

export const updatePublication = async (
  id: number,
  publication: any
): Promise<Publication | AxiosError | undefined> => {
  let formData = createFormData(publication)

  formData.append('_method', 'put')

  return await axios
    .post(ENDPOINT + '/' + id, formData)
    .then((response) => response.data.data)
    .catch((error) => {
      return error
    })
}
