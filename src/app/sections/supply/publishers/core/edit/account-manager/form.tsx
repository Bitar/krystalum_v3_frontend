import * as Yup from 'yup';

export interface FormFields {
    user_id: number
}

export const defaultFormFields = {
    user_id: 0
};

export const AccountManagerSchema = Yup.object().shape({
    user_id: Yup.number().min(1, 'account manager is required').required(),
});