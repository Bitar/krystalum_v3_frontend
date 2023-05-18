import * as Yup from 'yup';
import {PublicationAnalytic} from '../../../../../../models/supply/publication/PublicationAnalytic';
import {GEO_TYPE} from '../../../../../../enums/Supply/GeoType';
import {ANALYTIC_TYPE} from '../../../../../../enums/Supply/AnalyticType';
import {DEFAULT_ANALYTIC_TYPE} from '../../../../../../helpers/settings';

export interface PublicationAnalyticFormFields {
    type: string;
    geo_type: string;
    geo_id: number;
    device_id?: number | null;
    value: number;
}

export const defaultPublicationAnalyticFormFields = {
    type: DEFAULT_ANALYTIC_TYPE.id,
    geo_type: '',
    geo_id: 0,
    value: 0
};

export interface AnalyticsFilterFields {
    type?: string;
}

export const defaultAnalyticsFilterFields = {
    type: DEFAULT_ANALYTIC_TYPE.id
}

export const PublicationAnalyticSchema = Yup.object().shape({
    geo_type: Yup
        .string()
        .oneOf(Object.values(GEO_TYPE))
        .required(),
    geo_id: Yup.number().min(1, 'geo is a required field').required(),
    value: Yup.number().when('type', {
        is: (type: string) => type === ANALYTIC_TYPE.UNIQUE_USERS || type === ANALYTIC_TYPE.PAGE_VIEWS,
        then: Yup.number().integer().min(1, 'value must be greater than 0').required(),
        otherwise: Yup.number().min(1, 'value must be greater than 0').required(),
    }),

});

export function fillEditForm(publicationAnalytic: PublicationAnalytic) {
    const form: PublicationAnalyticFormFields = {
        ...publicationAnalytic,
        type: publicationAnalytic.type.id,
        geo_type: publicationAnalytic.geoType.id,
        geo_id: publicationAnalytic.geo.id
    };

    return form;
}