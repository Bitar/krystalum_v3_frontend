import * as Yup from 'yup';


export interface FilterFields {
    name?: string,
    code?: string,
    buying_models?: number[],
}

export const defaultFilterFields = {name: '', code: '', buying_models: []}

export const FilterSchema = Yup.object().shape({
    name: Yup.string().notRequired(),
    code: Yup.string().notRequired(),
    buying_models: Yup.array().of(Yup.number()).notRequired()
});