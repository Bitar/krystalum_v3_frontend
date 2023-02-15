import * as Yup from 'yup';
import {ID} from '../../../../../_metronic/helpers';

export interface FormFields {
    name: string,
    permissions: ID[]
}

export const defaultFormFields = {name: '', permissions: []};

export const RoleSchema = Yup.object().shape({
    name: Yup.string().required(),
    permissions: Yup.array().of(Yup.number()).required().min(1, 'You must select at least one permission.')
});