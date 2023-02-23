import * as Yup from 'yup';

export interface FormFields {
    name: string,
    code: string,
    currency: string,
    phone_code: number
}

export const defaultFormFields = {name: '', code: '', currency: '', phone_code: 0};

export const CountrySchema = Yup.object().shape({
    name: Yup.string().required(),
    code: Yup.string().required(),
    currency: Yup.string().required().matches(/^[A-Z]{3}$/, 'Currency should be all capital and three letters only'),
    phone_code: Yup.number().required()
        .positive('phone code must be positive')
        .notOneOf([0], 'phone code must not be zero')
});