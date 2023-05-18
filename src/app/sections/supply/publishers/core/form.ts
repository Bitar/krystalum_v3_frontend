import * as Yup from 'yup';
import {REVENUE_TYPE} from '../../../../enums/Supply/RevenueType';
import {Publisher} from '../../../../models/supply/publisher/Publisher';

export interface FormFields {
    name: string;
    tier_id?: number | null;
    integration_date?: Date | null;
    revenue_type: string;
    revenue_value: string | null;
    email?: string | null;
    hq_address?: string | null;
    hq_country_id?: number | null;
}

export const defaultFormFields = {
    name: '',
    revenue_type: '',
    revenue_value: '',
    email: '',
    hq_address: ''
};

export const PublisherSchema = Yup.object().shape({
    name: Yup.string().required(),
    tier_id: Yup.number().notRequired(),
    revenue_type: Yup.string().required(),
    revenue_value: Yup.mixed().when('revenue_type', (revenueType) =>
        revenueType === REVENUE_TYPE.REVENUE_SHARE
            ? Yup.number().min(1, 'revenue share must be greater than 0').max(100, 'revenue share must be less than or equal to 100').required()
            : (revenueType === REVENUE_TYPE.COMMITMENT ? Yup.string().required() : Yup.string().notRequired())
    ),
    email: Yup.string().notRequired().email(),
    hq_address: Yup.string().notRequired(),
    hq_country_id: Yup.number().notRequired(),
});

export function fillEditForm(publisher: Publisher) {
    const {tier, info, accountManager, ...currentPublisher} = publisher

    const form: FormFields = {
        ...currentPublisher,
        revenue_value: publisher.revenue_value || '',
        email: info?.email || '',
        hq_address: info?.hq_address || '',
        hq_country_id: info?.hq_country?.id,
    };

    return form;
}