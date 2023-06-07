import axios, {AxiosError, AxiosResponse} from 'axios'

import {createFormData} from '../../helpers/requests';
import {Kpi, KpiList, KpiPaginate} from '../../models/misc/Kpi';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/misc/kpis`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllKpis = async (): Promise<Kpi[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<KpiList>) => response.data.data).catch((error) => {
        return error;
    });
}

export const getKpis = (query?: String): Promise<KpiPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<KpiPaginate>) => response.data);
}

export const getKpi = async (id: number): Promise<Kpi | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeKpi = async (kpi: any): Promise<Kpi | AxiosError | undefined> => {
    let formData = createFormData(kpi);

    return await axios.post(ENDPOINT + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updateKpi = async (id: number, kpi: any): Promise<Kpi | AxiosError | undefined> => {
    let formData = createFormData(kpi);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
