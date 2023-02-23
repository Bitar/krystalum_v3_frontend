import * as Yup from 'yup';

export interface FormFields {
    name: string,
    code: string,
}

export const defaultFormFields = {name: '', code: ''};

export const BuyTypeSchema = Yup.object().shape({
    name: Yup.string().required(),
    code: Yup.string().required()
});