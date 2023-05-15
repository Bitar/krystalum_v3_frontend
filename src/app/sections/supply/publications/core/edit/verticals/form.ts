import * as Yup from 'yup';
import {PublicationVertical} from '../../../../../../models/supply/publication/PublicationVertical';

export interface PublicationVerticalFormFields {
    vertical_ids: number[],
    is_primary: number
}

export const defaultPublicationVerticalFormFields = {
    vertical_ids: [],
    is_primary: 0
};

export interface PublicationVerticalEditFormFields {
    vertical_id: number,
    is_primary: number
}

export const defaultPublicationVerticalEditFormFields = {
    vertical_id: 0,
    is_primary: 0
};

export const publicationVerticalSchema = (isEdit: boolean) => {
    let schema = {
        ...(isEdit ? {
            vertical_id: Yup.number().required().min(1, 'vertical is a required field'),
            is_primary: Yup.string().required(),
        } : {vertical_ids: Yup.array().of(Yup.number()).required().min(1, 'You must select at least one vertical')}),
    };

    return Yup.object().shape(schema);
}