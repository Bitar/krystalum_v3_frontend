import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData} from '../../helpers/requests';
import {Metric, MetricList, MetricPaginate} from '../../models/misc/Metric';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/misc/metrics`

export const getAllMetrics = async (): Promise<MetricList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all').then((response: AxiosResponse<MetricList>) => response.data).catch((error) => {
        return error;
    });
}

export const getMetrics = (query?: String): Promise<MetricPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<MetricPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const getMetric = async (id: number): Promise<Metric | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeMetric = async (metric: any): Promise<Metric | AxiosError | undefined> => {
    let formData = createFormData(metric);

    return await axios.post(ENDPOINT + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            error = error as AxiosError;

            return error;
        });
}

export const updateMetric = async (metric: any): Promise<Metric | AxiosError | undefined> => {
    let formData = createFormData(metric);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + metric.id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
