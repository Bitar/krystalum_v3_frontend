import * as Yup from 'yup';
import {ID} from '../../../../../_metronic/helpers';

export interface FilterFields {
    name?: string,
    is_rate?: boolean,
    is_conversion?: boolean,
    metrics?: ID[]
}

export const defaultFilterFields = {
    name: '',
    is_rate: undefined,
    is_conversion: undefined,
    metrics: []
}

export const FilterSchema = Yup.object().shape({
    name: Yup.string().notRequired(),
    is_rate: Yup.number().notRequired(), // 0 No or 1 Yes
    is_conversion: Yup.number().notRequired(), // 0 No or 1 Yes
    metrics: Yup.array().of(Yup.number()).notRequired()
});