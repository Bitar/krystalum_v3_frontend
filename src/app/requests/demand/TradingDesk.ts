import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData} from '../../helpers/requests';
import {TradingDesk, TradingDeskList, TradingDeskPaginate} from '../../models/demand/TradingDesk';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/demand/trading-desks`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllTradingDesks = async (): Promise<TradingDeskList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<TradingDeskList>) => response.data).catch((error) => {
        return error;
    });
}

export const getTradingDesks = (query?: String): Promise<TradingDeskPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<TradingDeskPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const getTradingDesk = async (id: number): Promise<TradingDesk | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeTradingDesk = async (tradingDesk: any): Promise<TradingDesk | AxiosError | undefined> => {
    let formData = createFormData(tradingDesk);

    return await axios.post(ENDPOINT + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            error = error as AxiosError;

            return error;
        });
}

export const updateTradingDesk = async (tradingDesk: any): Promise<TradingDesk | AxiosError | undefined> => {
    let formData = createFormData(tradingDesk);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + tradingDesk.id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
