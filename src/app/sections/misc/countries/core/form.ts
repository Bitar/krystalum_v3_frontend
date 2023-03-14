import * as Yup from 'yup';

export interface FormFields {
    name: string,
    code: string,
    currency: string,
    phone_code: string|number|null // kept the string type here because we don't want to see phone_code 0 as default
    // value in the form. However, we kept the phone_code validation to be number to make sure that the string entered
    // is a valid number.
}

export const defaultFormFields = {name: '', code: '', currency: '', phone_code: ''};

export const CountrySchema = Yup.object().shape({
    name: Yup.string().required(),
    code: Yup.string().required(),
    currency: Yup.string().required(),
    phone_code: Yup.number().min(0, 'phone code must be greater than or equal to 0').required(),
});