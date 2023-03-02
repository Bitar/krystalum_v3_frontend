import {ID} from '../../../../../_metronic/helpers';
import * as Yup from 'yup';

export interface FormFields {
    name: string,
    country_id: ID,
}

export const defaultFormFields = {name: '', country_id: undefined};

export const CitySchema = Yup.object().shape({
    name: Yup.string().required(),
    country_id: Yup.number().required()
});