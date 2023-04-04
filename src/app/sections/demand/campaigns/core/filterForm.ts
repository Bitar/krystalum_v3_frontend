import * as Yup from 'yup';

export interface FilterFields {
    name?: string,
    unique_identifiers?: string[],
    agencies?: number[]
}

// we had to put unique_identifiers = [] part of the default so we're able to safely
// reset the tag input field
export const defaultFilterFields = {name: '', unique_identifiers: []}

export const FilterSchema = Yup.object().shape({
    name: Yup.string().notRequired(),
    unique_identifiers: Yup.array().of(Yup.string()).notRequired(),
    agencies: Yup.array().of(Yup.number()).notRequired()
});