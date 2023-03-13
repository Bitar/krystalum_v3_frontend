import * as Yup from 'yup';
import {Country} from '../../../../models/misc/Country';

export interface FormFields {
    name: string,
    countries: Country[]
}

export const defaultFormFields = {name: '', countries: []};

export const RegionSchema = Yup.object().shape({
    name: Yup.string().required()
});