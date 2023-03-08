import * as Yup from 'yup';

export interface FilterFields {
    name?: string,
    country?: number,
}

export const defaultFilterFields = {
    name: '', country: 0
}

export const FilterSchema = Yup.object().shape({
    name: Yup.string().notRequired(),
    country: Yup.number().notRequired(),
});