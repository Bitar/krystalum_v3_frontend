import * as Yup from 'yup';
import {Tier} from '../../../../models/misc/Tier';
import {COMMITMENT, REVENUE_SHARE} from "../../../../models/supply/Publisher";

export interface FormFields {
    name: string,
    tier: Tier | null,
    integration_date: Date|null,
    revenue_type: number,
    revenue_share: string | number | null,
    commitment: string | null
}

export const defaultFormFields = {
    name: '',
    tier: null,
    integration_date: null,
    revenue_type: 0,
    revenue_share: '',
    commitment: ''
};

export const PublisherSchema = Yup.object().shape({
    name: Yup.string().required(),
    revenue_type: Yup.number().min(1, 'revenue type is required').required(),
    revenue_share: Yup.number().when('revenue_type', {
        is: REVENUE_SHARE,
        then: Yup.number().min(1, 'revenue share must be greater than 0').max(100, 'revenue share must be less than or equal to 100').required(),
    }),
    commitment: Yup.string().when('revenue_type', {
        is: COMMITMENT,
        then: Yup.string().required(),
    })
});