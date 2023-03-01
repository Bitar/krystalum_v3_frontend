import * as Yup from 'yup';

export interface FormFields {
    name: string
}

export const defaultFormFields = {name: ''};

export const GenderSchema = Yup.object().shape({
    name: Yup.string().required()
});