import * as Yup from 'yup';

export interface FilterFields {
    name?: string,
    countries_ids?: number[],
    regions_ids?: number[],
    tiers_ids?: number[],
    starts_between?: string,
    account_managers_ids?: number[]

}

export const defaultFilterFields = {name: '', starts_between: ''}

export const FilterSchema = Yup.object().shape({
    name: Yup.string().notRequired(),
    countries_ids: Yup.array().of(Yup.number()).notRequired(),
    regions_ids: Yup.array().of(Yup.number()).notRequired(),
    tiers_ids: Yup.array().of(Yup.number()).notRequired(),
    starts_between: Yup.string().notRequired(),
    account_managers_ids: Yup.array().of(Yup.number()).notRequired(),
});