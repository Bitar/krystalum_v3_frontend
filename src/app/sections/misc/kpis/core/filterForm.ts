import * as Yup from 'yup';

export interface FilterFields {
    name?: string,
    is_rate?: boolean,
    is_conversion?: boolean,
    metrics?: number[]
}

export const defaultFilterFields = {name: ''}

export const FilterSchema = Yup.object().shape({
    name: Yup.string().notRequired(),
    is_rate: Yup.number().notRequired(), // 0 No or 1 Yes
    is_conversion: Yup.number().notRequired(), // 0 No or 1 Yes
    metrics: Yup.array().of(Yup.number()).notRequired()
});