import axios, {AxiosError, AxiosResponse} from 'axios';
import {
    AnalyticTypeList,
    ApplicationTypeList, CampaignRestrictionTypeList,
    ContactTypeList,
    FormatTypeList,
    GeoTypeList,
    RevenueTypeList,
    TypeList
} from '../../models/supply/Options';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/supply/options`

export const getContactTypes = async (): Promise<ContactTypeList | AxiosError | undefined> => {
    let url = `${ENDPOINT}/contact-types`;

    return axios.get(url).then((response: AxiosResponse<ContactTypeList>) => response.data).catch((error) => {
        return error;
    });
}

export const getAnalyticsTypes = async (): Promise<AnalyticTypeList | AxiosError | undefined> => {
    let url = `${ENDPOINT}/analytic-types`;

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

export const getApplicationTypes = async (): Promise<ApplicationTypeList | AxiosError | undefined> => {
    let url = `${ENDPOINT}/application-types`;

    return axios.get(url).then((response: AxiosResponse<ApplicationTypeList>) => response.data).catch((error) => {
        return error;
    });
}

export const getFormatTypes = async (): Promise<FormatTypeList | AxiosError | undefined> => {
    let url = `${ENDPOINT}/format-types`;

    return axios.get(url).then((response: AxiosResponse<FormatTypeList>) => response.data).catch((error) => {
        return error;
    });
}

export const getTypes = async (): Promise<TypeList | AxiosError | undefined> => {
    let url = `${ENDPOINT}/types`;

    return axios.get(url).then((response: AxiosResponse<TypeList>) => response.data).catch((error) => {
        return error;
    });
}

export const getRevenueTypes = async (): Promise<RevenueTypeList | AxiosError | undefined> => {
    let url = `${ENDPOINT}/revenue-types`;

    return axios.get(url).then((response: AxiosResponse<RevenueTypeList>) => response.data).catch((error) => {
        return error;
    });
}

export const getCampaignRestrictionTypes = async (): Promise<CampaignRestrictionTypeList | AxiosError | undefined> => {
    let url = `${ENDPOINT}/campaign-restriction-types`;

    return axios.get(url).then((response: AxiosResponse<CampaignRestrictionTypeList>) => response.data).catch((error) => {
        return error;
    });
}