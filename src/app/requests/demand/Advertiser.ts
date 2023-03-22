import axios, {AxiosError, AxiosResponse} from 'axios'
import {Advertiser, AdvertiserList, AdvertiserPaginate} from '../../models/demand/Advertiser';
import {createFormData} from '../../helpers/requests';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/demand/advertisers`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllAdvertisers = async (): Promise<AdvertiserList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<AdvertiserList>) => response.data).catch((error) => {
        return error;
    });
}

export const getAdvertisers = (query?: String): Promise<AdvertiserPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<AdvertiserPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const getAdvertiser = async (id: number, includes?: string[]): Promise<Advertiser | AxiosError | undefined> => {
    let query = '';

    if (includes) {
        let includeParts: string [] = [];

        includes.forEach((value) => {
            includeParts.push(`include[]=${value}`);
        })

        query = '?' + includeParts.join('&');
    }

    return await axios.get(ENDPOINT + '/' + id + query)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeAdvertiser = async (advertiser: any): Promise<Advertiser | AxiosError | undefined> => {
    let formData = createFormData(advertiser);

    return await axios.post(ENDPOINT + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            error = error as AxiosError;

            return error;
        });
}

export const updateAdvertiser = async (advertiser: any): Promise<Advertiser | AxiosError | undefined> => {
    let formData = createFormData(advertiser);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + advertiser.id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
