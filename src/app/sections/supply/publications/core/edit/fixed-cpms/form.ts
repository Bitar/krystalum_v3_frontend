import * as Yup from 'yup';
import {GEO_TYPE} from '../../../../../../enums/Supply/GeoType';
import {PublicationFixedCpm} from '../../../../../../models/supply/publication/PublicationFixedCpm';

export interface PublicationFixedCpmFormFields {
    format_ids: number[],
    geo_type: string,
    geo_ids: number[],
    price: number,
    currency_id: number
}

export const defaultPublicationFixedCpmFormFields = {
    format_ids: [],
    geo_type: '',
    geo_ids: [],
    price: 0,
    currency_id: 236,
};

export interface PublicationFixedCpmEditFormFields {
    format_id: number,
    geo_type: string,
    geo_id: number,
    price: number,
    currency_id: number
}

export const defaultPublicationFixedCpmEditFormFields = {
    format_id: [],
    geo_type: '',
    geo_id: 0,
    price: 0,
    currency_id: 0,
};

export const publicationFixedCpmSchema = (isEdit: boolean) => {
    let schema = {
        geo_type: Yup
            .string()
            .oneOf(Object.values(GEO_TYPE))
            .required(),
        ...(isEdit ? {
            format_id: Yup.number().required().min(1, 'format is a required field'),
            geo_id: Yup.number().min(1, 'geo is a required field').required(),
        } : {
            format_ids: Yup.array().of(Yup.number()).required().min(1, 'You must select at least one format'),
            geo_ids: Yup.array().of(Yup.number()).required().min(1, 'You must select at least one geo'),
        }),
        price: Yup.number().min(1, 'price must be greater than 0').required(),
        currency_id: Yup.number().min(1, 'currency is a required field').required(),
    };

    return Yup.object().shape(schema);
}

export function fillEditForm(publicationFixedCpm: PublicationFixedCpm) {
    const form: PublicationFixedCpmEditFormFields = {
        ...publicationFixedCpm,
        format_id: publicationFixedCpm.format.id,
        geo_type: publicationFixedCpm.geoType.id,
        geo_id: publicationFixedCpm.geo.id,
        currency_id: publicationFixedCpm.currency.id,
    };

    return form;
}