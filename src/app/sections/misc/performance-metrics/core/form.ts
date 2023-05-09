import * as Yup from 'yup';

export interface FormFields {
    name: string,
    title?: string
}

export const defaultFormFields = {name: '', title: ''};

export const PerformanceMetricSchema = Yup.object().shape({
    name: Yup.string().required(),
    title: Yup.string().notRequired()
});