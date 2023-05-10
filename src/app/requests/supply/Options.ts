import {Publisher} from '../../models/supply/publisher/Publisher';
import {UserList} from '../../models/iam/User';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {AnalyticTypeList, ContactTypeList, GeoTypeList} from '../../models/supply/Options';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/options`

export const getAccountManagers = async (publisher?: Publisher): Promise<UserList | AxiosError | undefined> => {
    let url = `${ENDPOINT}/account-managers`

    if (publisher) url += `/${publisher.id}`

    return axios.get(url).then((response: AxiosResponse<UserList>) => response.data).catch((error) => {
        return error;
    });
}
export const getContactTypes = async (): Promise<ContactTypeList | AxiosError | undefined> => {
    let url = `${ENDPOINT}/contacts-types`;

    return axios.get(url).then((response: AxiosResponse<ContactTypeList>) => response.data).catch((error) => {
        return error;
    });
}

export const getAnalyticsTypes = async (): Promise<AnalyticTypeList | AxiosError | undefined> => {
    let url = `${ENDPOINT}/analytics-types`;

    return axios.get(url).then((response: AxiosResponse<AnalyticTypeList>) => response.data).catch((error) => {
        return error;
    });
}

export const getGeoTypes = async (): Promise<GeoTypeList | AxiosError | undefined> => {
    let url = `${ENDPOINT}/geo-types`;

    return axios.get(url).then((response: AxiosResponse<GeoTypeList>) => response.data).catch((error) => {
        return error;
    });
}