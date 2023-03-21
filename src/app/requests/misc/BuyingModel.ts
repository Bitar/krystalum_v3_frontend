import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData} from '../../helpers/requests';
import {BuyingModel, BuyingModelList, BuyingModelPaginate} from '../../models/misc/BuyingModel';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/misc/buying-models`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllBuyingModels = async (): Promise<BuyingModelList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all').then((response: AxiosResponse<BuyingModelList>) => response.data).catch((error) => {
        return error;
    });
}

export const getBuyingModels = (query?: String): Promise<BuyingModelPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<BuyingModelPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const getBuyingModel = async (id: number): Promise<BuyingModel | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeBuyingModel = async (buyingModel: any): Promise<BuyingModel | AxiosError | undefined> => {
    let formData = createFormData(buyingModel);

    return await axios.post(ENDPOINT + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updateBuyingModel = async (buyingModel: any): Promise<BuyingModel | AxiosError | undefined> => {
    let formData = createFormData(buyingModel);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + buyingModel.id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
