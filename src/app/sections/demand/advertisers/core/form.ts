import * as Yup from 'yup';

export interface AdvertiserFormFields {
    name: string
}

export const defaultAdvertiserFormFields = {name: ''};

export const AdvertiserSchema = Yup.object().shape({
    name: Yup.string().required()
});