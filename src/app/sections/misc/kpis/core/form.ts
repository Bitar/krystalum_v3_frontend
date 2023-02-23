import * as Yup from 'yup';
import {PerformanceMetric} from '../../../../models/misc/PerformanceMetric';

export interface FormFields {
    name: string,
    is_rate: boolean,
    is_conversion: boolean,
    metrics: PerformanceMetric[]
}

export const defaultFormFields = {name: '', is_rate: false, is_conversion: false, metrics: []};

export const KpiSchema = Yup.object().shape({
    name: Yup.string().required(),
    is_rate: Yup.boolean().required(),
    is_conversion: Yup.boolean().required(),
    metrics: Yup.array().of(Yup.number()).required()
});