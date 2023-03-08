import * as Yup from 'yup';
import {Format} from '../../../../models/misc/Format';

export interface FormFields {
    name: string,
    code: string,
    parent?: Format | null,
    buying_model_ids: number[]
}

export const defaultFormFields = {name: '', code: '', buying_model_ids: []};

export const FormatSchema = Yup.object().shape({
    name: Yup.string().required(),
    code: Yup.string().required(),
    parent: Yup.object().notRequired(),
    buying_model_ids: Yup.array().notRequired()
});
