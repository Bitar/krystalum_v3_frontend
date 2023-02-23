import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData} from '../../helpers/requests';
import {Country, CountryList, CountryPaginate} from '../../models/misc/Country';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/misc/countries`

export const getAllCountries = async (): Promise<CountryList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all').then((response: AxiosResponse<CountryList>) => response.data).catch((error) => {
        return error;
    });
}

export const getCountries = (query?: String): Promise<CountryPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<CountryPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const getCountry = async (id: number): Promise<Country | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeCountry = async (country: any): Promise<Country | AxiosError | undefined> => {
    let formData = createFormData(country);

    return await axios.post(ENDPOINT + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            error = error as AxiosError;

            return error;
        });
}

export const updateCountry = async (country: any): Promise<Country | AxiosError | undefined> => {
    let formData = createFormData(country);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + country.id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
