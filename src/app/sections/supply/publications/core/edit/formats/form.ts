import * as Yup from 'yup';

export interface PublicationFormatFormFields {
    format_ids: number[];
    type: string;
}

export const defaultPublicationFormatFormFields: PublicationFormatFormFields = {
    format_ids: [],
    type: ''
};

export interface PublicationFormatEditFormFields extends Omit<PublicationFormatFormFields, 'format_ids'> {
    format_id: number;
}

const {format_ids, ...defaultFields} = defaultPublicationFormatFormFields;

export const defaultPublicationFormatEditFormFields: PublicationFormatEditFormFields = {
    format_id: 0,
    ...defaultFields
};

export const publicationFormatSchema = (isEdit: boolean) => {
    let schema = {
        ...(isEdit ? {
            format_id: Yup.number().required().min(1, 'format is a required field')
        } : {format_ids: Yup.array().of(Yup.number()).required().min(1, 'You must select at least one format')}),
        type: Yup.string().required(),
    };

    return Yup.object().shape(schema);
}