import {Currency} from '../models/misc/Currency';
import {
    AnalyticType,
    CampaignRestrictionType,
    PublicationEditOptions,
    PublicationOptions, PublisherOptions
} from '../models/supply/Options';

export const DEFAULT_CURRENCY: Currency = {
    id: 236,
    currency: 'USD (United States)'
}
export const DEFAULT_ANALYTIC_TYPE: AnalyticType = {
    id: 'unique_users',
    name: 'Unique users'
}

export const DEFAULT_CAMPAIGN_RESTRICTION_TYPE: CampaignRestrictionType = {
    id: 'requires_creative_approval',
    name: 'Required creative approval'
}

export const DEFAULT_PUBLISHER_OPTIONS: PublisherOptions = {
    contactTypes: [], countries: [], regions: [], revenueTypes: [], tiers: []
}

export const DEFAULT_PUBLICATION_OPTIONS: PublicationOptions = {
    adServers: [],
    analyticTypes: [],
    applicationTypes: [],
    countries: [],
    formatTypes: [],
    formats: [],
    geoTypes: [],
    languages: [],
    regions: [],
    restrictionTypes: [],
    revenueTypes: [],
    technologies: [],
    types: [],
    verticals: []
}

export const DEFAULT_PUBLICATION_EDIT_OPTIONS: PublicationEditOptions = {
    campaignRestrictionRequirements: [], campaignTypes: [], currencies: [], devices: [], websitePages: []
}