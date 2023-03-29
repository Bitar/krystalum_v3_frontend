import axios, {AxiosError, AxiosResponse} from 'axios';

import {AdvertiserTypeList} from '../../models/demand/Options';

const API_URL = process.env.REACT_APP_API_URL;
const ENDPOINT = `${API_URL}/demand/options`;

export const getAllAdvertiserTypes = async (): Promise<AdvertiserTypeList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/advertiser-types').then((response: AxiosResponse<AdvertiserTypeList>) => response.data).catch((error) => {
        return error;
    });
}