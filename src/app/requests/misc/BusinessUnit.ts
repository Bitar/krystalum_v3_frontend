import axios, {AxiosError, AxiosResponse} from 'axios'

import {createFormData} from '../../helpers/requests';
import {BusinessUnit, BusinessUnitList, BusinessUnitPaginate} from '../../models/misc/BusinessUnit';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/misc/business-units`

export const getAllBusinessUnits = async (): Promise<BusinessUnitList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<BusinessUnitList>) => response.data).catch((error) => {
        return error;
    });
}

export const getBusinessUnits = (query?: String): Promise<BusinessUnitPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<BusinessUnitPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const getBusinessUnit = async (id: number): Promise<BusinessUnit | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeBusinessUnit = async (businessUnit: any): Promise<BusinessUnit | AxiosError | undefined> => {
    let formData = createFormData(businessUnit);

    return await axios.post(ENDPOINT + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            error = error as AxiosError;

            return error;
        });
}

export const updateBusinessUnit = async (businessUnit: any): Promise<BusinessUnit | AxiosError | undefined> => {
    let formData = createFormData(businessUnit);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + businessUnit.id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
