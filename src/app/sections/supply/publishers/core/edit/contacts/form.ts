import * as Yup from 'yup';

export interface PublisherContactFormFields {
    type: string;
    detail: string;
}

export const defaultPublisherContactFormFields: PublisherContactFormFields = {
    type: '',
    detail: ''
};

export const PublisherContactSchema = Yup.object().shape({
    type: Yup.string().required(),
    detail: Yup.string().required(),
});