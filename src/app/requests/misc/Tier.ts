import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData} from '../../helpers/requests';
import {Tier, TierList, TierPaginate} from '../../models/misc/Tier';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/misc/tiers`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllTiers = async (): Promise<TierList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<TierList>) => response.data).catch((error) => {
        return error;
    });
}

export const getTiers = (query?: String): Promise<TierPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<TierPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const getTier = async (id: number): Promise<Tier | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeTier = async (tier: any): Promise<Tier | AxiosError | undefined> => {
    let formData = createFormData(tier);

    return await axios.post(ENDPOINT + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updateTier = async (id: number, tier: any): Promise<Tier | AxiosError | undefined> => {
    let formData = createFormData(tier);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
