import * as Yup from 'yup';

export interface FilterFields {
    name?: string,
    code?: string,
    currency?: string,
    phone_code?: string
}

export const defaultFilterFields = {}

export const FilterSchema = Yup.object().shape({
    name: Yup.string().notRequired(),
    code: Yup.string().notRequired(),
    currency: Yup.string().notRequired(),
    phone_code: Yup.string().notRequired()
});