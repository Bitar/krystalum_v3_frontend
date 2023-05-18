import * as Yup from 'yup';

export interface FilterFields {
    name?: string;
    countries_ids?: number[];
    regions_ids?: number[];
    tiers_ids?: number[];
    integration_date_range?: string;
    account_managers_ids?: number[];
}

export const defaultFilterFields = {
    name: '',
    countries_ids: [],
    regions_ids: [],
    tiers_ids: [],
    integration_date_range: '',
    account_managers_ids: []
}

export const FilterSchema = Yup.object().shape({
    name: Yup.string().notRequired(),
    countries_ids: Yup.array().of(Yup.number()).notRequired(),
    regions_ids: Yup.array().of(Yup.number()).notRequired(),
    tiers_ids: Yup.array().of(Yup.number()).notRequired(),
    integration_date_range: Yup.string().notRequired(),
    account_managers_ids: Yup.array().of(Yup.number()).notRequired(),
});

export function fillFilterFields(key: string, value: any) {
    return {...defaultFilterFields, [key]: value}
}