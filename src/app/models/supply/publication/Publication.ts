import {Response} from '../../../../_metronic/helpers';
import {AdServer} from '../../misc/AdServer';
import {Language} from '../../misc/Language';
import {Technology} from '../../misc/Technology';
import {RevenueType} from '../Options';
import {Publisher} from '../publisher/Publisher';
import {PublicationFormat} from './PublicationFormat';
import {PublicationInfo} from './PublicationInfo';
import {PublicationVertical} from './PublicationVertical';

export type Publication = {
    id: number,
    unique_identifier: string,
    name: string,
    publisher: Publisher,
    live_date: Date,
    is_archived: number, // i.e. not sending inventory
    is_deal_pmp: number, // if 1 => deal based, else if 0 => tag based
    revenueType: RevenueType,
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