import axios, {AxiosError, AxiosResponse} from 'axios';

export const extractErrors = (error: any) => {
    if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;

        let errorMessages: string[] = [];

        for (const field in errors) {
            errorMessages.push(errors[field]);
        }

        return errorMessages;
    } else {
        return [];
    }
}

export const createFormData = (form: any) => {
    let formData = new FormData();

    for (const key in form) {
        if (form[key] instanceof Array) {
            for (const item in form[key]) {
                formData.append(`${key}[]`, form[key][item])
            }
        } else if (form[key] instanceof Object) {
            formData.append(`${key}_id`, form[key].id)
        } else {
            formData.append(key, form[key])
        }
    }

    return formData;
}

export const deleteObject = async (link: string): Promise<void> => {
    const API_URL = process.env.REACT_APP_API_URL;

    return axios.delete(`${API_URL}/${link}`);
}

export const exportObjects = async (endpoint: String, query?: String): Promise<ExportUrl | AxiosError | undefined> => {
    let url = `${endpoint}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse) => response.data).catch((error) => {
        return error;
    });
}

export const createFilterQueryParam = (query: any) => {
    let queryArray: string[] = [];

    for (const key in query) {
        const value = query[key];

        if (value instanceof Array) {
            if (value.length > 0) {
                value.forEach((item) => {
                    queryArray.push(`filter[${key}][]=${item}`);
                });
            }
        } else if (value instanceof Object) {
            queryArray.push(`filter[${key}]=${value.id}`);
        } else {
            queryArray.push(`filter[${key}]=${value}`);
        }
    }

    return queryArray.join('&');
}

export type ExportUrl = {
    data: {
        status: string,
        url?: string
    }
}