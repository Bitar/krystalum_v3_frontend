import axios, {AxiosError, AxiosResponse} from 'axios'
import {Agency, AgencyList, AgencyPaginate} from '../../models/demand/Agency';
import {createFormData} from '../../helpers/requests';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/demand/agencies`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllAgencies = async (): Promise<AgencyList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<AgencyList>) => response.data).catch((error) => {
        return error;
    });
}

export const getAgencies = (query?: String): Promise<AgencyPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<AgencyPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const getAgency = async (id: number): Promise<Agency | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeAgency = async (agency: any): Promise<Agency | AxiosError | undefined> => {
    let formData = createFormData(agency);

    return await axios.post(ENDPOINT + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            error = error as AxiosError;

            return error;
        });
}

export const updateAgency = async (agency: any): Promise<Agency | AxiosError | undefined> => {
    let formData = createFormData(agency);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + agency.id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
