import * as Yup from 'yup';

export interface PublisherAccountManagerFormFields {
    user_id: number;
}

export const defaultPublisherAccountManagerFormFields = {
    user_id: 0
};

export const PublisherAccountManagerSchema = Yup.object().shape({
    user_id: Yup.number().min(1, 'account manager is required').required(),
});