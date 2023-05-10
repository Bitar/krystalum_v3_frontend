import * as Yup from 'yup';

export interface FilterFields {
    name?: string,
    publishers_ids?: number[],
    languages_ids?: number[],
    live_date_range?: Date | string,
    formats_ids?: number[],
    ad_servers_ids?: number[],
    technologies_ids?: number[],
    verticals_ids?: number[],
    creation_date_range?: Date | string,
    countries_ids?: number[],
    regions_ids?: number[],
    url?: string,
    is_deal_pmp?: number | string,
    is_archived?: number
}

export const defaultFilterFields = {
    name: '',
    publishers_ids: [],
    languages_ids: [],
    live_date_range: '',
    formats_ids: [],
    ad_servers_ids: [],
    technologies_ids: [],
    verticals_ids: [],
    creation_date_range: '',
    countries_ids: [],
    regions_ids: [],
    url: '',
    is_deal_pmp: ''
}

export const FilterSchema = Yup.object().shape({
    name: Yup.string().notRequired(),
});

export function fillFilterFields(key: string, value: any) {
    return {...defaultFilterFields, [key]: value}
}