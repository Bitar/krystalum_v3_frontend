import * as Yup from 'yup';
import {Vertical} from "../../../../models/misc/Vertical";
import {ID} from "../../../../../_metronic/helpers";

export interface FormFields {
    name: string,
    parent: ID
}

export const defaultFormFields: FormFields = {
    name: '',
    parent: undefined
}

export const VerticalSchema = Yup.object().shape({
    name: Yup.string().required(),
    parent_id: Yup.number().notRequired()
});