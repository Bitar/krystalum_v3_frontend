import axios, {AxiosError} from 'axios'
import {createFormData} from '../../../helpers/requests'
import {Publication} from '../../../models/supply/publication/Publication'
import {PublicationCampaignRestrictionMeta} from '../../../models/supply/publication/PublicationCampaignRestrictionMeta'

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/publications`
const ENDPOINT_ADDITION = 'restriction-meta'

export const getPublicationCampaignRestrictionMeta = async (
  publication: Publication
): Promise<PublicationCampaignRestrictionMeta | AxiosError | undefined> => {
  let url = `${ENDPOINT}/${publication.id}/${ENDPOINT_ADDITION}`

  return await axios
    .get(url)
    .then((response) => response.data.data)
    .catch((error) => {
      return error
    })
}

export const storePublicationCampaignRestrictionMeta = async (
  publication: Publication,
  form: any
): Promise<PublicationCampaignRestrictionMeta | AxiosError | undefined> => {
  let url = `${ENDPOINT}/${publication.id}/${ENDPOINT_ADDITION}`

  let formData = createFormData(form)

  return await axios
    .post(url, formData)
    .then((response) => response.data.data)
    .catch((error) => {
      return error
    })
}
