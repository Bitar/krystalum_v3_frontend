import axios, {AxiosResponse} from 'axios'
import {PublicationAdTechnologyPaginate} from '../../../models/supply/publication/PublicationAdTechnology'

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/publications`
const ENDPOINT_ADDITION = 'ad-technologies'

export const getPublicationAdTechnologies = (
  publicationId: number,
  query?: String
): Promise<PublicationAdTechnologyPaginate> => {
  let url = `${ENDPOINT}/${publicationId}/${ENDPOINT_ADDITION}`

  if (query) {
    url += `?${query}`
  }

  return axios
    .get(url)
    .then((response: AxiosResponse<PublicationAdTechnologyPaginate>) => response.data.data)
    .catch((error) => {
      return error
    })
}
