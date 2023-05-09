import axios, {AxiosError, AxiosResponse} from 'axios'
import {
    Campaign,
    CampaignOrder,
    CampaignOrderList,
    CampaignOrderPaginate
} from '../../models/demand/Campaign';
import {createFormData} from '../../helpers/requests';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/demand/campaigns`
const ENDPOINT_APPEND = 'orders'

export const getAllCampaignOrders = async (campaign: Campaign): Promise<CampaignOrderList | AxiosError | undefined> => {
    return axios.get(`${ENDPOINT}/${campaign.id}/${ENDPOINT_APPEND}/all`).then((response: AxiosResponse<CampaignOrderList>) => response.data).catch((error) => {
        return error;
    });
}

export const getCampaignOrders = (requestId?: number, query?: String): Promise<CampaignOrderPaginate> => {
    let url = `${ENDPOINT}/${requestId}/${ENDPOINT_APPEND}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<CampaignOrderPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const getCampaignOrder = async (campaign: Campaign, id: number): Promise<CampaignOrder | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${campaign.id}/${ENDPOINT_APPEND}`;

    return await axios.get(url + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeCampaignOrder = async (campaign: Campaign, campaignOrder: any): Promise<CampaignOrder | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${campaign.id}/${ENDPOINT_APPEND}`;

    let formData = createFormData(campaignOrder);

    return await axios.post(url + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            error = error as AxiosError;

            return error;
        });
}

export const updateCampaignOrder = async (campaign: Campaign, id: number, campaignOrder: any): Promise<Campaign | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${campaign.id}/${ENDPOINT_APPEND}`;

    let formData = createFormData(campaignOrder);

    formData.append('_method', 'put');

    return await axios.post(url + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
