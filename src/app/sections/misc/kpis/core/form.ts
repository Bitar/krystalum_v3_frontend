import * as Yup from 'yup';

export interface FormFields {
    name: string
}

export const defaultFormFields = {name: ''};

export const KpiSchema = Yup.object().shape({
    name: Yup.string().required(),
    is_rate: Yup.boolean().required(),
    is_conversion: Yup.boolean().required(),
    metrics: Yup.array().of(Yup.number()).required()
});