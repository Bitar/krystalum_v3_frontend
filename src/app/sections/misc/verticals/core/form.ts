import * as Yup from 'yup';
import {Vertical} from "../../../../models/misc/Vertical";

export interface FormFields {
    name: string,
    parent_id?: number,
    parent?: Vertical | null
}

export const defaultFormFields = {name: ''};

export const VerticalSchema = Yup.object().shape({
    name: Yup.string().required(),
    parent_id: Yup.number().notRequired()
});
