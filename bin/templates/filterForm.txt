import * as Yup from 'yup';

export interface FilterFields {
    name?: string
}

export const defaultFilterFields = {name: ''}

export const FilterSchema = Yup.object().shape({
    name: Yup.string().notRequired()
});