import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData} from '../../helpers/requests'
import {Language, LanguageList, LanguagePaginate} from '../../models/misc/Language'

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/misc/languages`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`

export const getAllLanguages = async (): Promise<Language[] | AxiosError | undefined> => {
  return axios
    .get(ENDPOINT + '/all?sort[]=name')
    .then((response: AxiosResponse<LanguageList>) => response.data.data)
    .catch((error) => {
      return error
    })
}

export const getLanguages = (query?: String): Promise<LanguagePaginate> => {
  let url = `${ENDPOINT}`

  if (query) {
    url += `?${query}`
  }

  return axios.get(url).then((response: AxiosResponse<LanguagePaginate>) => response.data)
}

export const getLanguage = async (id: number): Promise<Language | AxiosError | undefined> => {
  return await axios
    .get(ENDPOINT + '/' + id)
    .then((res) => res.data.data)
    .catch((error) => {
      return error
    })
}

export const storeLanguage = async (language: any): Promise<Language | AxiosError | undefined> => {
  let formData = createFormData(language)

  return await axios
    .post(ENDPOINT + '/', formData)
    .then((res) => res.data.data)
    .catch((error) => {
      return error
    })
}

export const updateLanguage = async (
  id: number,
  language: any
): Promise<Language | AxiosError | undefined> => {
  let formData = createFormData(language)

  formData.append('_method', 'put')

  return await axios
    .post(ENDPOINT + '/' + id, formData)
    .then((res) => res.data.data)
    .catch((error) => {
      return error
    })
}
