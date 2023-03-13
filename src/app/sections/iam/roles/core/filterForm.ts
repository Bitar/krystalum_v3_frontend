import * as Yup from 'yup';

export interface FilterFields {
    name?: string,
    permissions?: number[]
}

export const defaultFilterFields = {name: ''}

export const FilterSchema = Yup.object().shape({
    name: Yup.string().notRequired(),
    permissions: Yup.array().of(Yup.number()).notRequired()
});