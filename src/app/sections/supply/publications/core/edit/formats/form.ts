import * as Yup from 'yup';
import {PublicationFormat} from '../../../../../../models/supply/publication/PublicationFormat';
import {PUBLICATION_TYPE, REVENUE_TYPE} from '../../../../../../models/supply/Options';

export interface PublicationFormatFormFields {
    format_ids: number[],
    type: string
}

export const defaultPublicationFormatFormFields = {
    format_ids: [],
    type: ''
};

export interface PublicationFormatEditFormFields {
    format_id: number,
    type: string
}

export const defaultPublicationFormatEditFormFields = {
    format_id: 0,
    type: ''
};

export const publicationFormatSchema = (isEdit: boolean) => {
    let schema = {
        // if we are editing the publication schema, then unique identifier is not required and disabled
        // so no need to validate it
        ...(isEdit ? {
            format_id: Yup.number().required().min(1, 'format is required')
        } : {format_ids: Yup.array().of(Yup.number()).required().min(1, 'You must select at least one format')}),
        type: Yup.string().required(),
    };

    return Yup.object().shape(schema);
}

export function fillEditForm(publicationFormat: PublicationFormat) {

}