import * as Yup from 'yup';
import {Country} from '../../../../models/misc/Country';

export interface FormFields {
    name: string,
    // country_id: number,
    country: Country | null
}

export const defaultFormFields = {name: '', country: null};

export const CitySchema = Yup.object().shape({
    name: Yup.string().required(),
    country: Yup.object().required('country is required')
});