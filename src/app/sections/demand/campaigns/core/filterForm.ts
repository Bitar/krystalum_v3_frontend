import * as Yup from 'yup';

export interface FilterFields {
    name?: string,
    unique_identifiers?: string[]
}

export const defaultFilterFields = {name: ''}

export const FilterSchema = Yup.object().shape({
    name: Yup.string().notRequired(),
    unique_identifier: Yup.array().of(Yup.string()).notRequired()
});