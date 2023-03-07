import * as Yup from 'yup';

export interface FormFields {
    name: string,
    permissions: number[]
}

export const defaultFormFields = {name: '', permissions: []};

export const RoleSchema = Yup.object().shape({
    name: Yup.string().required(),
    permissions: Yup.array().of(Yup.number()).required().min(1, 'You must select at least one permission.')
});