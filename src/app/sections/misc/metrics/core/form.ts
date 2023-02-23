import * as Yup from 'yup';

export interface FormFields {
    name: string
}

export const defaultFormFields = {name: ''};

export const MetricSchema = Yup.object().shape({
    name: Yup.string().required()
});