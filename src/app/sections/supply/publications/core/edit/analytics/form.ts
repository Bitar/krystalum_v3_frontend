import * as Yup from 'yup';
import {PublicationAnalytic} from '../../../../../../models/supply/publication/PublicationAnalytic';

export interface PublicationAnalyticFormFields {
    type: string,
    geo_type: string,
    geo_id: number,
    device_id: number,
    value: number
}

export const defaultPublicationAnalyticFormFields = {
    type: 'unique_users',
    geo_type: '',
    geo_id: 0,
    device_id: 0,
    value: 0
};

export interface AnalyticsFilterFields {
    type?: string
}

export const defaultAnalyticsFilterFields = {
    type: 'unique_users'
}

export const PublicationAnalyticSchema = Yup.object().shape({
    // geo_type: Yup
    //     .string()
    //     .oneOf(Object.values(GEO_TYPE))
    //     .required(),
    // geo_id: Yup.number().min(1, 'geo is a required field').required(),
    // device_id: Yup.number().notRequired(),
    // value: Yup.number().min(1, 'value must be greater than 0').required()
});

export function fillEditForm(publicationAnalytic: PublicationAnalytic) {
    const form: PublicationAnalyticFormFields = {
        ...publicationAnalytic,
        type: publicationAnalytic.type.id,
        geo_type: publicationAnalytic.geoType.id,
        geo_id: publicationAnalytic.geo.id,
        device_id: publicationAnalytic.device.id || 0
    };

    return form;
}