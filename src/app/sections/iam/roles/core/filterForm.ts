import {ID} from '../../../../../_metronic/helpers';
import * as Yup from 'yup';

export interface FilterFields {
    name?: string,
    permissions?: ID[]
}

export const defaultFilterFields = {
    name: '',
    permissions: []
}

export const FilterSchema = Yup.object().shape({
    name: Yup.string().notRequired(),
    permissions: Yup.array().of(Yup.number()).notRequired()
});