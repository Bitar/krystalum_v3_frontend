import {AdServer} from '../misc/AdServer';
import {CampaignRestrictionRequirement} from '../misc/CampaignRestrictionRequirement';
import {CampaignType} from '../misc/CampaignType';
import {Country} from '../misc/Country';
import {Currency} from '../misc/Currency';
import {Device} from '../misc/Device';
import {Format} from '../misc/Format';
import {Language} from '../misc/Language';
import {Region} from '../misc/Region';
import {Technology} from '../misc/Technology';
import {Tier} from '../misc/Tier';
import {Vertical} from '../misc/Vertical';
import {WebsitePage} from '../misc/WebsitePage';

export type ContactType = {
    id: string, // this column is of type string because the enum we receive from the API is represented as a string
    name: string
};

export type AnalyticType = {
    id: string, // this column is of type string because the enum we receive from the API is represented as a string
    // i.e. {id: 'unique_users', name: 'Unique users'}
    name: string
};

export type GeoType = {
    id: string,
    name: string
};

export type ApplicationType = {
    id: string, // this column is of type string because the enum we receive from the API is represented as a string
    name: string
};

export type FormatType = {
    id: string, // this column is of type string because the enum we receive from the API is represented as a string
    name: string
};

export type Type = {
    id: string, // this column is of type string because the enum we receive from the API is represented as a string
    name: string
};

export type RevenueType = {
    id: string, // this column is of type string because the enum we receive from the API is represented as a string
    name: string
};

export type CampaignRestrictionType = {
    id: string, // this column is of type string because the enum we receive from the API is represented as a string
    name: string
};

export type PublisherOptions = {
    countries: Country[]
    regions: Region[],
    tiers: Tier[]
};

export type PublicationOptions = {
    adServers: AdServer[],
    countries: Country[]
    formats: Format[],
    languages: Language[],
    technologies: Technology[],
    regions: Region[],
    verticals: Vertical[],
};

export type PublicationEditOptions = {
    campaignRestrictionRequirements: CampaignRestrictionRequirement[],
    campaignTypes: CampaignType[],
    currencies: Currency[],
    devices: Device[],
    websitePages: WebsitePage[]
};