import axios, {AxiosError, AxiosResponse} from 'axios'
import {
  PublicationEditOptionPaginate,
  PublicationOptionPaginate,
  PublisherOptionPaginate,
} from '../../models/supply/Options'

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/options`

export const getPublisherOptions = async (): Promise<
  PublisherOptionPaginate | AxiosError | undefined
> => {
  let url = `${ENDPOINT}/publisher`

  return axios
    .get(url)
    .then((response: AxiosResponse<PublisherOptionPaginate>) => response.data.data)
    .catch((error) => {
      return error
    })
}

export const getPublicationOptions = async (): Promise<
  PublicationOptionPaginate | AxiosError | undefined
> => {
  let url = `${ENDPOINT}/publication`

  return axios
    .get(url)
    .then((response: AxiosResponse<PublicationOptionPaginate>) => response.data.data)
    .catch((error) => {
      return error
    })
}

export const getPublicationEditOptions = async (): Promise<
  PublicationEditOptionPaginate | AxiosError | undefined
> => {
  let url = `${ENDPOINT}/publication-edit`

  return axios
    .get(url)
    .then((response: AxiosResponse<PublicationEditOptionPaginate>) => response.data.data)
    .catch((error) => {
      return error
    })
}
