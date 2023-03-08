import axios, {AxiosError, AxiosResponse} from 'axios'

import {createFormData, ExportUrl} from '../../helpers/requests';
import {PerformanceMetric, PerformanceMetricList, PerformanceMetricPaginate} from '../../models/misc/PerformanceMetric';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/misc/performance-metrics`

export const getAllPerformanceMetrics = async (): Promise<PerformanceMetricList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<PerformanceMetricList>) => response.data).catch((error) => {
        return error;
    });
}

export const exportPerformanceMetrics = async (query?: String): Promise<ExportUrl | AxiosError | undefined> => {
    let url = `${ENDPOINT}/export`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse) => response.data).catch((error) => {
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
            error = error as AxiosError;

            return error;
        });
}

export const updatePerformanceMetric = async (performanceMetric: any): Promise<PerformanceMetric | AxiosError | undefined> => {
    let formData = createFormData(performanceMetric);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + performanceMetric.id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}