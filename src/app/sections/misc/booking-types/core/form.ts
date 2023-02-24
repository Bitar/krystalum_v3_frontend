import * as Yup from 'yup';

export interface FormFields {
    name: string
}

export const defaultFormFields = {name: '', code: ''};

export const BookingTypeSchema = Yup.object().shape({
    name: Yup.string().required(),
    code: Yup.string().required()
});