import * as Yup from 'yup';

export interface FormFields {
    name: string,
    order: number
}

export const defaultFormFields = {name: '', order: 0};

export const TierSchema = Yup.object().shape({
    name: Yup.string().required(),
    order: Yup.number().required().min(1, 'The ordering of the tiers starts at 1.')
});