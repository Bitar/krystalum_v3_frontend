import * as Yup from 'yup';

export interface FilterFields {
    name?: string,
    publishers_ids?: number[],
    languages_ids?: number[],
    live_date_range?: Date | null,
    formats_ids?: number[],
    ad_servers_ids?: number[],
    technologies_ids?: number[],
    verticals_ids?: number[],
    creation_date_range?: Date | null,
    countries_ids?: number[],
    regions_ids?: number[],
    url?: string,

}

export const defaultFilterFields = {
    name: '',
    publishers_ids: [],
    languages_ids: [],
    live_date_range: null,
    formats_ids: [],
    ad_servers_ids: [],
    technologies_ids: [],
    verticals_ids: [],
    creation_date_range: null,
    countries_ids: [],
    regions_ids: [],
    url: '',
}

export const FilterSchema = Yup.object().shape({
    name: Yup.string().notRequired(),
});