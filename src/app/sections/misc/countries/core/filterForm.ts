import * as Yup from 'yup';

export interface FilterFields {
    name?: string,
    code?: string,
    currency?: string,
    phone_code?: string
}

export const defaultFilterFields = {name: '', code: '', currency: '', phone_code: ''}

export const FilterSchema = Yup.object().shape({
    name: Yup.string().notRequired(),
    code: Yup.string().notRequired(),
    currency: Yup.string().notRequired(),
    phone_code: Yup.number().notRequired() // keep validation as number even though the field is string type
});