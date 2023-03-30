import * as Yup from 'yup';

export interface FilterFields {
    name?: string,
    country_ids?: number[],
    region_ids?: number[],
    tier_ids?: number[],
    starts_between?: string,
    account_manager_ids?: number[]

}

export const defaultFilterFields = {name: '', starts_between: ''}

export const FilterSchema = Yup.object().shape({
    name: Yup.string().notRequired(),
    country_ids: Yup.array().of(Yup.number()).notRequired(),
    region_ids: Yup.array().of(Yup.number()).notRequired(),
    tier_ids: Yup.array().of(Yup.number()).notRequired(),
    starts_between: Yup.string().notRequired(),
    account_manager_ids: Yup.array().of(Yup.number()).notRequired(),
});