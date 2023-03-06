import * as Yup from 'yup';
import {ID} from '../../../../../_metronic/helpers';

export interface FormFields {
    name: string,
    is_rate: number,
    is_conversion: number,
    performance_metric_ids: ID[]
}


export const defaultFormFields = {name: '', is_rate: 1, is_conversion: 0, performance_metric_ids: []};

export const KpiSchema = Yup.object().shape({
    name: Yup.string().required(),
    is_rate: Yup.number().required(),
    is_conversion: Yup.number().required(),
    performance_metric_ids: Yup.array().of(Yup.number()).required().min(1, 'You must select at least one performance metric.')
});