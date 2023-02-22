import {ID} from '../../../../../_metronic/helpers';
import * as Yup from 'yup';

export interface FilterFields {
    name?: string,
    email?: string,
    roles?: ID[]
}

export const defaultFilterFields = {
    name: '',
    email: '',
    roles: []
}

export const FilterSchema = Yup.object().shape({
    name: Yup.string().notRequired(),
    email: Yup.string().notRequired().email(),
    roles: Yup.array().of(Yup.number()).notRequired()
});