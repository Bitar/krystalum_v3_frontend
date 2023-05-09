import * as Yup from 'yup';
import {PublicationFormat} from '../../../../../../models/supply/publication/PublicationFormat';

export interface PublicationFormatFormFields {
    format_id: number,
    type: string
}

export const defaultPublicationFormatFormFields = {
    format_id: 0,
    type: ''
};

export const PublicationFormatSchema = Yup.object().shape({
    format_id: Yup.number().min(1, 'format is a required field').required(),
    type: Yup.string().required(),
});

export function fillEditForm(publicationFormat: PublicationFormat) {

}