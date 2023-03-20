import * as Yup from 'yup';

export interface FilterFields {
    name?: string,
    regions?: number[],
    holding_groups?: number[]
}

export const defaultFilterFields = {name: ''}

export const FilterSchema = Yup.object().shape({
    name: Yup.string().notRequired(),
    regions: Yup.array().of(Yup.number()).notRequired(),
    holding_groups: Yup.array().of(Yup.number()).notRequired()
});