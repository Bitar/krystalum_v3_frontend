import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData} from '../../../helpers/requests';
import {Publication} from '../../../models/supply/publication/Publication';
import {
    PublicationCampaignRestriction,
    PublicationCampaignRestrictionPaginate
} from '../../../models/supply/publication/PublicationCampaignRestriction';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/publications`
const CAMPAIGN_RESTRICTIONS_ENDPOINT = 'campaign-restrictions'

export const getPublicationCampaignRestrictions = (publicationId: number, query?: String): Promise<PublicationCampaignRestrictionPaginate> => {
    let url = `${ENDPOINT}/${publicationId}/${CAMPAIGN_RESTRICTIONS_ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<PublicationCampaignRestrictionPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const getPublicationCampaignRestriction = async (publication: Publication, id: number): Promise<PublicationCampaignRestriction | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${publication.id}/${CAMPAIGN_RESTRICTIONS_ENDPOINT}`;

    return await axios.get(url + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storePublicationCampaignRestriction = async (publication: Publication, form: any): Promise<PublicationCampaignRestriction | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${publication.id}/${CAMPAIGN_RESTRICTIONS_ENDPOINT}`;

    let formData = createFormData(form);

    return await axios.post(url, formData).then(res => res.data).catch((error) => {
        return error;
    });
}

export const updatePublicationCampaignRestriction = async (publication: Publication, id: number, publicationCampaignRestriction: any): Promise<PublicationCampaignRestriction | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${publication.id}/${CAMPAIGN_RESTRICTIONS_ENDPOINT}`;

    let formData = createFormData(publicationCampaignRestriction);

    formData.append('_method', 'put');

    return await axios.post(url + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
