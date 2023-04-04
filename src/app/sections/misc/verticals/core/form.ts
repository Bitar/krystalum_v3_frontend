import * as Yup from 'yup';

export interface FormFields {
    name: string,
    parent_id?: number
}

export const defaultFormFields = {name: ''};

export const VerticalSchema = Yup.object().shape({
    name: Yup.string().required(),
    parent_id: Yup.number().notRequired()
});
