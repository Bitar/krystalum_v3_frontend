import axios, {AxiosError, AxiosResponse} from 'axios'

import {createFormData} from '../../helpers/requests';
import {PerformanceMetric, PerformanceMetricList, PerformanceMetricPaginate} from '../../models/misc/PerformanceMetric';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/misc/performance-metrics`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllPerformanceMetrics = async (): Promise<PerformanceMetricList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<PerformanceMetricList>) => response.data).catch((error) => {
        return error;
    });
}

export const getPerformanceMetrics = (query?: String): Promise<PerformanceMetricPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<PerformanceMetricPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const getPerformanceMetric = async (id: number): Promise<PerformanceMetric | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storePerformanceMetric = async (performanceMetric: any): Promise<PerformanceMetric | AxiosError | undefined> => {
    let formData = createFormData(performanceMetric);

    return await axios.post(ENDPOINT + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updatePerformanceMetric = async (id: number, performanceMetric: any): Promise<PerformanceMetric | AxiosError | undefined> => {
    let formData = createFormData(performanceMetric);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
