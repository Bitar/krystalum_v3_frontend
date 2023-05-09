import * as Yup from 'yup';
import {PublicationTechnology} from '../../../../../../models/supply/publication/PublicationTechnology';

export interface PublicationTechnologyFormFields {
    technology_id: number
}

export const defaultPublicationTechnologyFormFields = {
    technology_id: 0,
};

export const PublicationTechnologySchema = Yup.object().shape({
    technology_id: Yup.number().min(1, 'technology is a required field').required()
});

export function fillEditForm(publicationTechnology: PublicationTechnology) {

}