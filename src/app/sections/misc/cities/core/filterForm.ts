import * as Yup from 'yup';

export interface FilterFields {
    name?: string,
    countries?: number[],
}

export const defaultFilterFields = {}

export const FilterSchema = Yup.object().shape({
    name: Yup.string().notRequired(),
    countries: Yup.array().of(Yup.number()).notRequired()
});