import * as Yup from 'yup';
import {GeoTypeEnum} from '../../../../../../enums/Supply/GeoTypeEnum';
import {DEFAULT_ANALYTIC_TYPE, DEFAULT_CAMPAIGN_RESTRICTION_TYPE} from '../../../../../../helpers/settings';
import {
    PublicationCampaignRestriction
} from '../../../../../../models/supply/publication/PublicationCampaignRestriction';

export interface PublicationCampaignRestrictionFormFields {
    type: string;
    geo_type: string;
    geo_ids: number[];
    format_ids: number[];
    campaign_type_ids?: number[];
    website_page_ids?: number[];
    campaign_restriction_requirement_ids?: number[];
}

export const defaultPublicationCampaignRestrictionFormFields = {
    type: DEFAULT_CAMPAIGN_RESTRICTION_TYPE.id,
    geo_type: '',
    geo_ids: [],
    format_ids: []
};

export interface PublicationCampaignRestrictionEditFormFields extends Omit<PublicationCampaignRestrictionFormFields, 'format_ids' | 'geo_ids' | 'campaign_type_ids' | 'website_page_ids' | 'campaign_restriction_requirement_ids'> {
    geo_id: number;
    format_id: number;
    campaign_type_id?: number;
    website_page_id?: number;
    campaign_restriction_requirement_id?: number;
}

const {
    format_ids,
    geo_ids,
    ...defaultFields
} = defaultPublicationCampaignRestrictionFormFields;

export const defaultPublicationCampaignRestrictionEditFormFields: PublicationCampaignRestrictionEditFormFields = {
    geo_id: 0,
    format_id: 0,
    ...defaultFields
};

export interface CampaignRestrictionsFilterFields {
    type?: string;
}

export const defaultCampaignRestrictionsFilterFields = {
    type: DEFAULT_CAMPAIGN_RESTRICTION_TYPE.id
}

export const publicationCampaignRestrictionSchema = (isEdit: boolean) => {
    let schema = {
        geo_type: Yup
            .string()
            .oneOf(Object.values(GeoTypeEnum))
            .required(),
        ...(isEdit ? {
            format_id: Yup.number().required().min(1, 'format is a required field'),
            geo_id: Yup.number().min(1, 'geo is a required field').required(),
        } : {
            format_ids: Yup.array().of(Yup.number()).required().min(1, 'You must select at least one format'),
            geo_ids: Yup.array().of(Yup.number()).required().min(1, 'You must select at least one geo')
        })
    };

    return Yup.object().shape(schema);
}

// export function fillEditForm(publicationCampaignRestriction: PublicationCampaignRestriction) {
//     const form: PublicationCampaignRestrictionEditFormFields = {
//         ...publicationCampaignRestriction,
//         type: publicationCampaignRestriction.type.id,
//         geo_type: publicationCampaignRestriction.geoType.id,
//         geo_id: publicationCampaignRestriction.geo.id,
//         format_id: publicationCampaignRestriction.format.id,
//         campaign_type_id: publicationCampaignRestriction.campaignType?.id,
//         website_page_id: publicationCampaignRestriction.websitePage?.id,
//         campaign_restriction_requirement_id: publicationCampaignRestriction.campaignRestrictionRequirement?.id,
//     };
//
//     return form;
// }