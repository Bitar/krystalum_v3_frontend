import * as Yup from 'yup';
import {COMMITMENT, Publisher, REVENUE_SHARE} from '../../../../models/supply/publisher/Publisher';

export interface FormFields {
    name: string,
    tier_id?: number | null,
    integration_date?: Date | null,
    revenue_type: string,
    revenue_share?: number | string | null, // kept the string type here because we don't want to see revenue_share 0 as default
    // value in the form. However, we kept the revenue_share validation to be number to make sure that the string entered
    // is a valid number.
    commitment?: string | null,
    email?: string | null,
    hq_address?: string | null,
    hq_country_id?: number | null
}

export const defaultFormFields = {
    name: '',
    revenue_type: '',
    revenue_share: '',
    commitment: '',
    email: '',
    hq_address: ''
};

export const PublisherSchema = Yup.object().shape({
    name: Yup.string().required(),
    tier_id: Yup.number().notRequired(),
    revenue_type: Yup.string().required(),
    revenue_share: Yup.number().nullable().when('revenue_type', {
        is: REVENUE_SHARE,
        then: Yup.number().min(1, 'revenue share must be greater than 0').max(100, 'revenue share must be less than or equal to 100').required(),
    }),
    commitment: Yup.string().nullable().when('revenue_type', {
        is: COMMITMENT,
        then: Yup.string().required(),
    }),
    email: Yup.string().notRequired().email(),
    hq_address: Yup.string().notRequired(),
    hq_country_id: Yup.number().notRequired(),
});

export function fillEditForm(publisher: Publisher) {
    const form: FormFields = {
        ...publisher,
        revenue_share: publisher.revenue_share?.toString() || '',
        commitment: publisher.commitment || '',
        email: publisher.info?.email || '',
        hq_address: publisher.info?.hq_address || '',
        hq_country_id: publisher.info?.hq_country?.id,
    };

    return form;
}