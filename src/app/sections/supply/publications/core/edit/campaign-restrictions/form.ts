import * as Yup from 'yup';
import {GeoTypeEnum} from '../../../../../../enums/Supply/GeoTypeEnum';
import {DEFAULT_CAMPAIGN_RESTRICTION_TYPE} from '../../../../../../helpers/settings';
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
    requirement_ids?: number[];
}

export const defaultPublicationCampaignRestrictionFormFields = {
    type: DEFAULT_CAMPAIGN_RESTRICTION_TYPE.id,
    geo_type: '',
    geo_ids: [],
    format_ids: []
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
        format_ids: Yup.array().of(Yup.number()).required().min(1, 'You must select at least one format'),
        geo_ids: Yup.array().of(Yup.number()).required().min(1, 'You must select at least one geo')
    };

    return Yup.object().shape(schema);
}

export function fillEditForm(publicationCampaignRestriction: PublicationCampaignRestriction) {
    const form: PublicationCampaignRestrictionFormFields = {
        ...publicationCampaignRestriction,
        type: publicationCampaignRestriction.type.id,
        geo_type: publicationCampaignRestriction.geos[0].geoType.id,
        geo_ids: publicationCampaignRestriction.geos.map(geo => geo.geo.id),
        format_ids: publicationCampaignRestriction.formats.map(format => format.id),
        campaign_type_ids: publicationCampaignRestriction.campaignTypes?.map(campaignType => campaignType.id),
        website_page_ids: publicationCampaignRestriction.websitePages?.map(websitePage => websitePage.id),
        requirement_ids: publicationCampaignRestriction.requirements?.map(requirement => requirement.id),
    };

    return form;
}