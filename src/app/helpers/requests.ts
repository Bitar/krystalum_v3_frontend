import axios from 'axios';

export const extractErrors = (error: any) => {
    if(error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;

        let errorMessages: string[] = [];

        for(const field in errors) {
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
        if(form[key] instanceof Array) {
            for (const item in form[key]) {
                formData.append(`${key}[]`, form[key][item].id)
            }
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