import {ID} from '../../../../../_metronic/helpers';
import * as Yup from 'yup';

export interface FormFields {
    name: string,
    type: ID,
    regions: ID[],
    countries: ID[]
}

export const defaultFormFields = {name: '', type: undefined,regions:[],countries:[]};

export const RegionSchema = Yup.object().shape({
    name: Yup.string().required(),
    type: Yup.number().required(),
});