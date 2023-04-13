import axios, {AxiosError, AxiosResponse} from 'axios'
import {Campaign, CampaignList, CampaignPaginate} from '../../models/demand/Campaign';
import {createFormData} from '../../helpers/requests';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/demand/campaigns`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllCampaigns = async (): Promise<CampaignList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<CampaignList>) => response.data).catch((error) => {
        return error;
    });
}

export const getCampaigns = (query?: String): Promise<CampaignPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<CampaignPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const getCampaign = async (id: number): Promise<Campaign | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeCampaign = async (campaign: any): Promise<Campaign | AxiosError | undefined> => {
    let formData = createFormData(campaign);

    return await axios.post(ENDPOINT + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            error = error as AxiosError;

            return error;
        });
}

export const updateCampaign = async (id: number, campaign: any): Promise<Campaign | AxiosError | undefined> => {
    let formData = createFormData(campaign);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
