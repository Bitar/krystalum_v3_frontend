import * as Yup from 'yup';
import {Publication} from '../../../../models/supply/publication/Publication';

export interface FormFields {
    name: string
}

export const defaultFormFields = {
    name: '',
};

export const PublicationSchema = Yup.object().shape({
    name: Yup.string().required(),
});

export function fillEditForm(publication: Publication) {
    const {info, ...currentPublication} = publication

    const form: FormFields = {
        ...currentPublication
    };

    return form;
}