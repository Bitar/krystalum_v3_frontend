import {Response} from '../../../../_metronic/helpers';
import {Publisher, PublisherCondensed} from '../publisher/Publisher';
import {PublicationInfo} from './PublicationInfo';
import {PublicationLanguage} from './PublicationLanguage';
import {Language} from '../../misc/Language';
import {PublicationFormat} from './PublicationFormat';
import {PublicationVertical} from './PublicationVertical';
import {REVENUE_TYPE} from '../../../enums/Supply/RevenueType';
import {PublicationAdServer} from './PublicationAdServer';
import {AdServer} from '../../misc/AdServer';
import {Technology} from '../../misc/Technology';

export type Publication = {
    id: number,
    unique_identifier: string,
    name: string,
    publisher: Publisher,
    live_date: Date,
    is_archived: number, // i.e. not sending inventory
    is_deal_pmp: number, // if 1 => deal based, else if 0 => tag based
    revenue_type: REVENUE_TYPE,
    revenue_value: string | null, // it can be null in case the revenue_type is 'same_as_publisher'
    has_hi10: number, // if 1, then both 'hi10_to_display' and 'hi10_to_video' should be set to 0 /
    // if 0, then 'hi10_to_display' should be set to 1 and 'hi10_to_video' should be set to 0 by default,
    // unless the user specifies otherwise.
    hi10_to_display: number,
    hi10_to_video: number,
    info: PublicationInfo,
    languages: Language[],

    formats?: PublicationFormat[],
    verticals?: PublicationVertical[],
    adServers?: AdServer[],
    technologies?: Technology[]
};

export type PublicationPaginate = Response<Publication[]>;

export type PublicationList = {
    data: Publication[]
}