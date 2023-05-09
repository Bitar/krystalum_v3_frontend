import * as Yup from 'yup';
import {PublicationVertical} from '../../../../../../models/supply/publication/PublicationVertical';

export interface PublicationVerticalFormFields {
    vertical_id: number,
    is_primary: number
}

export const defaultPublicationVerticalFormFields = {
    vertical_id: 0,
    is_primary: 0
};

export const PublicationVerticalSchema = Yup.object().shape({
    vertical_id: Yup.number().min(1, 'vertical is a required field').required(),
    is_primary: Yup.number().required(),
});

export function fillEditForm(publicationVertical: PublicationVertical) {

}