import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData} from '../../helpers/requests';
import {Device, DeviceList, DevicePaginate} from '../../models/misc/Device';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/misc/devices`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllDevices = async (): Promise<DeviceList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all').then((response: AxiosResponse<DeviceList>) => response.data).catch((error) => {
        return error;
    });
}

export const getDevices = (query?: String): Promise<DevicePaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<DevicePaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const getDevice = async (id: number): Promise<Device | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeDevice = async (device: any): Promise<Device | AxiosError | undefined> => {
    let formData = createFormData(device);

    return await axios.post(ENDPOINT + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            error = error as AxiosError;

            return error;
        });
}

export const updateDevice = async (device: any): Promise<Device | AxiosError | undefined> => {
    let formData = createFormData(device);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + device.id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
