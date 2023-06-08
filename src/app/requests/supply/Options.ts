import axios, {AxiosError, AxiosResponse} from 'axios'
import {
  PublicationEditOptions,
  PublicationOptions,
  PublisherOptions,
} from '../../models/supply/Options'

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/options`

export const getPublisherOptions = async (): Promise<PublisherOptions | AxiosError | undefined> => {
  let url = `${ENDPOINT}/publisher`

  return axios
    .get(url)
    .then((response: AxiosResponse<PublisherOptions>) => response.data)
    .catch((error) => {
      return error
    })
}

export const getPublicationOptions = async (): Promise<
  PublicationOptions | AxiosError | undefined
> => {
  let url = `${ENDPOINT}/publication`

  return axios
    .get(url)
    .then((response: AxiosResponse<PublicationOptions>) => response.data)
    .catch((error) => {
      return error
    })
}

export const getPublicationEditOptions = async (): Promise<
  PublicationEditOptions | AxiosError | undefined
> => {
  let url = `${ENDPOINT}/publication-edit`

  return axios
    .get(url)
    .then((response: AxiosResponse<PublicationEditOptions>) => response.data)
    .catch((error) => {
      return error
    })
}
