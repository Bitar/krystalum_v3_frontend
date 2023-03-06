import {ID} from '../../../../../_metronic/helpers';
import * as Yup from 'yup';
import {Vertical} from "../../../../models/misc/Vertical";

export interface FormFields {
    name: string,
    parent_id?: ID,
    parent?: Vertical | null
}

export const defaultFormFields = {name: '', parent_id: undefined, parent: null};

export const VerticalSchema = Yup.object().shape({
    name: Yup.string().required(),
    country_id: Yup.number().notRequired()
});