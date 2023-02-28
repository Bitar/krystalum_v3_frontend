import axios, {AxiosError, AxiosResponse} from 'axios'

import {createFormData} from '../../helpers/requests';
import {Objective, ObjectiveList, ObjectivePaginate} from '../../models/misc/Objective';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/misc/objectives`

export const getAllObjectives = async (): Promise<ObjectiveList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<ObjectiveList>) => response.data).catch((error) => {
        return error;
    });
}

export const getObjectives = (query?: String): Promise<ObjectivePaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<ObjectivePaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const getObjective = async (id: number): Promise<Objective | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeObjective = async (objective: any): Promise<Objective | AxiosError | undefined> => {
    let formData = createFormData(objective);

    return await axios.post(ENDPOINT + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            error = error as AxiosError;

            return error;
        });
}

export const updateObjective = async (objective: any): Promise<Objective | AxiosError | undefined> => {
    let formData = createFormData(objective);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + objective.id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
