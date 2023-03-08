import * as Yup from 'yup';

export interface FormFields {
    name: string,
    countries: any[]
}

export const defaultFormFields = {name: '', countries: []};

export const RegionSchema = Yup.object().shape({
    name: Yup.string().required(),
    countries: Yup.array().of(Yup.number()).required().min(1, 'You must select at least one country.'),
});