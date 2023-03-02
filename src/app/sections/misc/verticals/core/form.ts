import * as Yup from 'yup';
import {ID} from "../../../../../_metronic/helpers";

export interface FormFields {
    name: string,
    parent_id: ID
}

export const defaultFormFields: FormFields = {
    name: '',
    parent_id: undefined
}

export const VerticalSchema = Yup.object().shape({
    name: Yup.string().required(),
    parent_id: Yup.number().notRequired()
});