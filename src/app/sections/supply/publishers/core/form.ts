import * as Yup from 'yup';
import {Tier} from '../../../../models/misc/Tier';

export interface FormFields {
    name: string,
    tier: Tier | null,
    integration_date: string,
    revenue_type: number,
    revenue_share: number | null,
    commitment: string | null
}

export const defaultFormFields = {
    name: '',
    tier: null,
    integration_date: '',
    revenue_type: 0,
    revenue_share: null,
    commitment: ''
};

export const PublisherSchema = Yup.object().shape({
    name: Yup.string().required()
});