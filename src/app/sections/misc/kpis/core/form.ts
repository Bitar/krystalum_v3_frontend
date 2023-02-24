import * as Yup from 'yup';
import {ID} from '../../../../../_metronic/helpers';

export interface FormFields {
    name: string,
    is_rate: boolean,
    is_conversion: boolean,
    metric: ID
}

export const defaultFormFields = {name: '', is_rate: false, is_conversion: false, metric: 0};

export const KpiSchema = Yup.object().shape({
    name: Yup.string().required(),
    is_rate: Yup.boolean().required(),
    is_conversion: Yup.boolean().required(),
    metric: Yup.number().required()
});