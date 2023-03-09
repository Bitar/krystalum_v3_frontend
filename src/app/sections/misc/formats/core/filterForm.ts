import * as Yup from 'yup';

export interface FilterFields {
    name?: string,
    code?: string
}

export const defaultFilterFields = {}

export const FilterSchema = Yup.object().shape({
    name: Yup.string().notRequired(),
    code: Yup.string().notRequired(),
});