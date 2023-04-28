import * as Yup from 'yup';
import {PublicationAnalytic} from '../../../../../../models/supply/publication/PublicationAnalytics';
import {ANALYTICS_TYPE, GEO_TYPE} from '../../../../../../models/supply/Options';

export interface PublicationAnalyticFormFields {
    type: ANALYTICS_TYPE | string,
    geo_type: GEO_TYPE | string,
    geo_id: number,
    device_id: number,
    value: number
}

export const defaultPublicationAnalyticFormFields = {
    type: ANALYTICS_TYPE.UNIQUE_USERS,
    geo_type: '',
    geo_id: 0,
    device_id: 0,
    value: 0
};

export const PublicationAnalyticSchema = Yup.object().shape({
    geo_type: Yup
        .string()
        .oneOf(Object.values(GEO_TYPE))
        .required(),
    geo_id: Yup.number().min(1, 'geo is a required field').required(),
    device_id: Yup.number().notRequired(),
    value: Yup.number().min(1, 'value must be greater than 0').required()
});

export function fillEditForm(publicationAnalytic: PublicationAnalytic) {
    const form: PublicationAnalyticFormFields = {
        ...publicationAnalytic,
        geo_type: publicationAnalytic.geoType,
        geo_id: publicationAnalytic.geo.id,
        device_id: publicationAnalytic.device.id || 0
    };

    return form;
}