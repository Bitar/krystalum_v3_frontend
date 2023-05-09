import * as Yup from 'yup';
import {PublicationAdServer} from '../../../../../../models/supply/publication/PublicationAdServer';

export interface PublicationAdServerFormFields {
    ad_server_id: number
}

export const defaultPublicationAdServerFormFields = {
    ad_server_id: 0,
};

export const PublicationAdServerSchema = Yup.object().shape({
    ad_server_id: Yup.number().min(1, 'ad server is a required field').required()
});

export function fillEditForm(publicationAdServer: PublicationAdServer) {

}