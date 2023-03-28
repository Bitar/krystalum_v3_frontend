import * as Yup from 'yup';

export interface FilterFields {
    name?: string,
    countries?: number[],
    regions?: number[],
    tiers?: number[],
    starts_between?: string,
    account_managers?: number[]

}

export const defaultFilterFields = {name: '', starts_between: ''}

export const FilterSchema = Yup.object().shape({
    name: Yup.string().notRequired(),
    countries: Yup.array().of(Yup.number()).notRequired(),
    regions: Yup.array().of(Yup.number()).notRequired(),
    tiers: Yup.array().of(Yup.number()).notRequired(),
    starts_between: Yup.string().notRequired(),
    account_managers: Yup.array().of(Yup.number()).notRequired(),
});