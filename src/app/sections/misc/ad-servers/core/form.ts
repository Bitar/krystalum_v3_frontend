import * as Yup from 'yup';

export interface FormFields {
    name: string
}

export const defaultFormFields = {name: ''};

export const AdServerSchema = Yup.object().shape({
    name: Yup.string().required()
});