import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData} from '../../helpers/requests';
import {HoldingGroup, HoldingGroupList, HoldingGroupPaginate} from '../../models/demand/HoldingGroup';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/demand/holding-groups`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllHoldingGroups = async (): Promise<HoldingGroupList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<HoldingGroupList>) => response.data).catch((error) => {
        return error;
    });
}

export const getHoldingGroups = (query?: String): Promise<HoldingGroupPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<HoldingGroupPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const getHoldingGroup = async (id: number): Promise<HoldingGroup | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeHoldingGroup = async (holdingGroup: any): Promise<HoldingGroup | AxiosError | undefined> => {
    let formData = createFormData(holdingGroup);

    return await axios.post(ENDPOINT + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            error = error as AxiosError;

            return error;
        });
}

export const updateHoldingGroup = async (id: number, holdingGroup: any): Promise<HoldingGroup | AxiosError | undefined> => {
    let formData = createFormData(holdingGroup);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
