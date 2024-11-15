import axios, {AxiosError} from 'axios'
import {AuthModel} from './_models'
import {User} from '../../../models/iam/User'
import {createFormData} from '../../../helpers/requests';

const API_URL = process.env.REACT_APP_API_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`
export const GET_USER_PROFILE = `${API_URL}/profile`
export const LOGIN_URL = `${API_URL}/login`
export const REGISTER_URL = `${API_URL}/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`
export const RESET_PASSWORD_URL = `${API_URL}/reset_password`

// Server should return AuthModel
export function login(email: string, password: string) {
    return axios.post<AuthModel>(LOGIN_URL, {
        email,
        password,
    })
}

// Server should return AuthModel
export function register(
    email: string,
    firstname: string,
    lastname: string,
    password: string,
    password_confirmation: string
) {
    return axios.post(REGISTER_URL, {
        email,
        first_name: firstname,
        last_name: lastname,
        password,
        password_confirmation,
    })
}

// Server should return object => { result: boolean } (Is Email in DB)
// export function requestPassword(email: string) {
//     return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
//         email,
//     })
// }

export const requestPassword = async (form: any): Promise<string | AxiosError | undefined> => {
    let formData = createFormData(form);

    return await axios.post(REQUEST_PASSWORD_URL, formData)
        .then(res => res.data)
        .catch((error) => {
            error = error as AxiosError;

            return error;
        });
}

export const resetPassword = async (form: any): Promise<string | AxiosError | undefined> => {
    let formData = createFormData(form);

    return await axios.post(RESET_PASSWORD_URL, formData)
        .then(res => res.data)
        .catch((error) => {
            error = error as AxiosError;

            return error;
        });
}

export function getUserByToken(token: string) {
    return axios.get<User>(GET_USER_PROFILE, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        transformResponse: [
            function (data) {
                return JSON.parse(data).data
            },
        ],
    })
}
