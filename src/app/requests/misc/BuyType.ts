import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData} from '../../helpers/requests';
import {BuyType, BuyTypeList, BuyTypePaginate} from '../../models/misc/BuyType';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/misc/buy-types`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllBuyTypes = async (): Promise<BuyTypeList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all').then((response: AxiosResponse<BuyTypeList>) => response.data).catch((error) => {
        return error;
    });
}

export const getBuyTypes = (query?: String): Promise<BuyTypePaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<BuyTypePaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const getBuyType = async (id: number): Promise<BuyType | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeBuyType = async (buyType: any): Promise<BuyType | AxiosError | undefined> => {
    let formData = createFormData(buyType);

    return await axios.post(ENDPOINT + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updateBuyType = async (buyType: any): Promise<BuyType | AxiosError | undefined> => {
    let formData = createFormData(buyType);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + buyType.id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
