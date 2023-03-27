import * as Yup from 'yup';

export interface FilterFields {
    name?: string,
    starts_between?: string

}

export const defaultFilterFields = {name: '', starts_between: ''}

export const FilterSchema = Yup.object().shape({
    name: Yup.string().notRequired(),
    starts_between: Yup.string().notRequired(),
});