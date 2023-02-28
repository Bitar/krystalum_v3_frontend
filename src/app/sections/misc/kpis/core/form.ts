import * as Yup from 'yup';
import {ID} from '../../../../../_metronic/helpers';

export interface FormFields {
    name: string,
    is_rate: boolean,
    is_conversion: boolean,
    performance_metric_ids: ID[]
}

export const defaultFormFields = {name: '', is_rate: true, is_conversion: false, performance_metric_ids: []};

export const KpiSchema = Yup.object().shape({
    name: Yup.string().required(),
    is_rate: Yup.boolean().required(),
    is_conversion: Yup.boolean().required(),
    performance_metric_ids: Yup.array().of(Yup.number()).required().min(1, 'You must select at least one performance metric.')
});