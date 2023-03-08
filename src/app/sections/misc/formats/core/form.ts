import * as Yup from 'yup';
import {Format} from '../../../../models/misc/Format';

export interface FormFields {
    name: string,
    code: string,
    parent?: Format | null,
    has_buying_model: number,
    buying_model_ids: number[]
}

export const defaultFormFields = {name: '', code: '', has_buying_model: 0, buying_model_ids: []};

export const FormatSchema = Yup.object().shape({
    name: Yup.string().required(),
    code: Yup.string().required(),
    parent: Yup.object().notRequired(),
    has_buying_model: Yup.number().required(),
    buying_model_ids: Yup.array().notRequired()
});