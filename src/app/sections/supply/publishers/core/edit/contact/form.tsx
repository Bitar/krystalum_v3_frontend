import * as Yup from 'yup';

export interface FormFields {
    type: number,
    detail: string
}

export const defaultFormFields = {
    type: 0,
    detail: ''
};

export const ContactSchema = Yup.object().shape({
    type: Yup.number().min(1, 'contact type is required').required(),
    detail: Yup.string().required(),
});