import * as Yup from 'yup';

export interface FormFields {
    name: string,
    country_id: number|null
}

export const defaultFormFields = {name: '', country_id: null};

export const CitySchema = Yup.object().shape({
    name: Yup.string().required(),
    country_id: Yup.number().required()
});