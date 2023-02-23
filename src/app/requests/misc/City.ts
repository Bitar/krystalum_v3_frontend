import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData} from '../../helpers/requests';
import {City, CityList, CityPaginate} from '../../models/misc/City';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/misc/cities`

export const getAllCities = async (): Promise<CityList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all').then((response: AxiosResponse<CityList>) => response.data).catch((error) => {
        return error;
    });
}

export const getCities = (query?: String): Promise<CityPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<CityPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const getCity = async (id: number): Promise<City | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeCity = async (city: any): Promise<City | AxiosError | undefined> => {
    let formData = createFormData(city);

    return await axios.post(ENDPOINT + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            error = error as AxiosError;

            return error;
        });
}

export const updateCity = async (city: any): Promise<City | AxiosError | undefined> => {
    let formData = createFormData(city);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + city.id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
