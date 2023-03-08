import * as Yup from 'yup';

export interface FormFields {
    name: string,
    countries: any[]
}

export const defaultFormFields = {name: '', countries: []};

export const RegionSchema = Yup.object().shape({
    name: Yup.string().required(),
});