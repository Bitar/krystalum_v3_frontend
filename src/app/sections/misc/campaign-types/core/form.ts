import * as Yup from 'yup';

export interface FormFields {
    name: string
}

export const defaultFormFields = {name: ''};

export const CampaignTypeSchema = Yup.object().shape({
    name: Yup.string().required()
});