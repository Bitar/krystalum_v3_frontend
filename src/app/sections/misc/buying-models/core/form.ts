import * as Yup from 'yup';

export interface FormFields {
    name: string,
    performance_metric_ids: number[]
}

export const defaultFormFields = {name: '', performance_metric_ids: []};

export const BuyingModelSchema = Yup.object().shape({
    name: Yup.string().required(),
    performance_metric_ids: Yup.array().of(Yup.number()).required().min(1, 'You must select at least one performance metric.')
});