import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData} from '../../helpers/requests';
import {WebsitePage, WebsitePageList, WebsitePagePaginate} from '../../models/misc/WebsitePage';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/misc/website-pages`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllWebsitePages = async (): Promise<WebsitePageList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<WebsitePageList>) => response.data).catch((error) => {
        return error;
    });
}

export const getWebsitePages = (query?: String): Promise<WebsitePagePaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<WebsitePagePaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const getWebsitePage = async (id: number): Promise<WebsitePage | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeWebsitePage = async (websitePage: any): Promise<WebsitePage | AxiosError | undefined> => {
    let formData = createFormData(websitePage);

    return await axios.post(ENDPOINT + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updateWebsitePage = async (id: number, websitePage: any): Promise<WebsitePage | AxiosError | undefined> => {
    let formData = createFormData(websitePage);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
