import * as Yup from 'yup';
import {Country} from '../../../../models/misc/Country';

export interface FormFields {
    name: string,
    country_id: number,
    country?: Country
}

export const defaultFormFields = {name: '', country_id: undefined};

export const CitySchema = Yup.object().shape({
    name: Yup.string().required(),
    country_id: Yup.number().required()
});