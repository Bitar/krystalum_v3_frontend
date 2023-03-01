import {ID} from '../../../../../_metronic/helpers';
import * as Yup from 'yup';

export interface FormFields {
    name: string,
    country: ID,
}

export const defaultFormFields = {name: '', country: 0};

export const CitySchema = Yup.object().shape({
    name: Yup.string().required(),
    country: Yup.number().required().min(1, 'You must select at least one country.')
});