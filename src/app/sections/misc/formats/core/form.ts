import * as Yup from 'yup';

export interface FormFields {
    name: string,
    code: string,
    parent_id?: number,
    has_buying_model: number,
    buying_model_ids: number[]
}

export const defaultFormFields = {name: '', code: '', has_buying_model: 0, buying_model_ids: []};

export const FormatSchema = Yup.object().shape({
    name: Yup.string().required(),
    code: Yup.string().required(),
    parent_id: Yup.number().notRequired(),
    has_buying_model: Yup.number().required(),
    buying_model_ids: Yup.array().when('has_buying_model', {
        is: 1,
        then: Yup.array().of(Yup.number()).required().min(1, 'You must select at least one buying model.')
    })
});