import axios, {AxiosError, AxiosResponse} from 'axios';
import {createFormData} from '../../helpers/requests';
import {Campaign, CampaignOwner, CampaignOwnerPaginate} from '../../models/demand/Campaign';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/demand/campaigns`
const ENDPOINT_APPEND = 'owners'

export const getCampaignOwners = (requestId?: number, query?: String): Promise<CampaignOwnerPaginate> => {
    let url = `${ENDPOINT}/${requestId}/${ENDPOINT_APPEND}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<CampaignOwnerPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const storeCampaignOwner = async (campaign: Campaign, campaignOwner: any): Promise<CampaignOwner | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${campaign.id}/${ENDPOINT_APPEND}`;

    let formData = createFormData(campaignOwner);

    return await axios.post(url + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            error = error as AxiosError;

            return error;
        });
}