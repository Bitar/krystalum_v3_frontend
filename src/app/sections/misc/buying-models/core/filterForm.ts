import * as Yup from 'yup';

export interface FilterFields {
    name?: string,
    metrics?: number[]
}

export const defaultFilterFields = {name: ''}

export const FilterSchema = Yup.object().shape({
    name: Yup.string().notRequired(),
    metrics: Yup.array().of(Yup.number()).notRequired()
});