import * as Yup from 'yup';
import {Vertical} from "../../../../models/misc/Vertical";

export interface FormFields {
    name: string,
    parent?: Vertical | null
}

export const defaultFormFields = {name: ''};

export const VerticalSchema = Yup.object().shape({
    name: Yup.string().required(),
    parent: Yup.object().notRequired().nullable()
});
