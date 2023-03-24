import axios, {AxiosError, AxiosResponse} from 'axios'
import {
    Advertiser, AdvertiserContact,
    AdvertiserContactList,
    AdvertiserContactPaginate
} from '../../models/demand/Advertiser';
import {createFormData} from '../../helpers/requests';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/demand/advertisers`
const ENDPOINT_APPEND = 'contacts'

export const getAllAdvertiserContacts = async (advertiser: Advertiser): Promise<AdvertiserContactList | AxiosError | undefined> => {
    return axios.get(`${ENDPOINT}/${advertiser.id}/${ENDPOINT_APPEND}/all`).then((response: AxiosResponse<AdvertiserContactList>) => response.data).catch((error) => {
        return error;
    });
}

export const getAdvertiserContacts = (requestId?: number, query?: String): Promise<AdvertiserContactPaginate> => {
    let url = `${ENDPOINT}/${requestId}/${ENDPOINT_APPEND}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<AdvertiserContactPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const getAdvertiserContact = async (advertiser: Advertiser, id: number): Promise<AdvertiserContact | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${advertiser.id}/${ENDPOINT_APPEND}`;

    return await axios.get(url + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeAdvertiserContact = async (advertiser: Advertiser, advertiserContact: any): Promise<AdvertiserContact | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${advertiser.id}/${ENDPOINT_APPEND}`;

    let formData = createFormData(advertiserContact);

    return await axios.post(url + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            error = error as AxiosError;

            return error;
        });
}

export const updateAdvertiserContact = async (advertiser: Advertiser, id: number, advertiserContact: any): Promise<AdvertiserContact | AxiosError | undefined> => {
    let url = `${ENDPOINT}/${advertiser.id}/${ENDPOINT_APPEND}`;

    let formData = createFormData(advertiserContact);

    formData.append('_method', 'put');

    return await axios.post(url + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
