import * as Yup from 'yup';

export interface PublicationAdServerFormFields {
    ad_server_ids: number[];
}

export const defaultPublicationAdServerFormFields: PublicationAdServerFormFields = {
    ad_server_ids: [],
};

export interface PublicationAdServerEditFormFields extends Omit<PublicationAdServerFormFields, 'ad_server_ids'> {
    ad_server_id: number;
}

export const defaultPublicationAdServerEditFormFields: PublicationAdServerEditFormFields = {
    ad_server_id: 0,
};

export const publicationAdServerSchema = (isEdit: boolean) => {
    let schema = {
        ...(isEdit ? {
            ad_server_id: Yup.number().required().min(1, 'ad server is a required field')
        } : {ad_server_ids: Yup.array().of(Yup.number()).required().min(1, 'You must select at least one ad server')}),
    };

    return Yup.object().shape(schema);
}