import * as Yup from 'yup';
import {PublicationAnalytic} from '../../../../../../models/supply/publication/PublicationAnalytic';
import {GEO_TYPE} from '../../../../../../enums/Supply/GeoType';
import {ANALYTIC_TYPE} from '../../../../../../enums/Supply/AnalyticType';
import {PublicationFixedCpm} from '../../../../../../models/supply/publication/PublicationFixedCpm';

export interface PublicationFixedCpmFormFields {
    format_id: number,
    geo_type: string,
    geo_id: number,
    price: number,
    currency_id: number
}

export const defaultPublicationFixedCpmFormFields = {
    format_id: 0,
    geo_type: '',
    geo_id: 0,
    price: 0,
    currency_id: 0,
};

export const PublicationFixedCpmSchema = Yup.object().shape({
    format_id: Yup.number().min(1, 'format is a required field').required(),
    geo_type: Yup
        .string()
        .oneOf(Object.values(GEO_TYPE))
        .required(),
    geo_id: Yup.number().min(1, 'geo is a required field').required(),
    price: Yup.number().min(1, 'price must be greater than 0').required(),
    currency_id: Yup.number().min(1, 'currency is a required field').required(),
});

export function fillEditForm(publicationFixedCpm: PublicationFixedCpm) {
    const form: PublicationFixedCpmFormFields = {
        ...publicationFixedCpm,
        format_id: publicationFixedCpm.format.id,
        geo_type: publicationFixedCpm.geoType.id,
        geo_id: publicationFixedCpm.geo.id,
        currency_id: publicationFixedCpm.currency.id,
    };

    return form;
}