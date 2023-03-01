import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData} from '../../helpers/requests';
import {CampaignType, CampaignTypeList, CampaignTypePaginate} from '../../models/misc/CampaignType';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/misc/campaign-types`

export const getAllCampaignTypes = async (): Promise<CampaignTypeList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all').then((response: AxiosResponse<CampaignTypeList>) => response.data).catch((error) => {
        return error;
    });
}

export const getCampaignTypes = (query?: String): Promise<CampaignTypePaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<CampaignTypePaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const getCampaignType = async (id: number): Promise<CampaignType | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeCampaignType = async (campaignType: any): Promise<CampaignType | AxiosError | undefined> => {
    let formData = createFormData(campaignType);

    return await axios.post(ENDPOINT + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            error = error as AxiosError;

            return error;
        });
}

export const updateCampaignType = async (campaignType: any): Promise<CampaignType | AxiosError | undefined> => {
    let formData = createFormData(campaignType);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + campaignType.id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
