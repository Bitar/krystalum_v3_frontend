import * as Yup from 'yup';

export interface FormFields {
    type: string,
    detail: string
}

export const defaultFormFields = {
    type: '',
    detail: ''
};

export const ContactSchema = Yup.object().shape({
    type: Yup.string().required(),
    detail: Yup.string().required(),
});