import {Response} from '../../../../_metronic/helpers';
import {PublisherCondensed} from '../publisher/Publisher';
import {PublicationInfo} from './PublicationInfo';
import {REVENUE_TYPE} from '../Options';

export type Publication = {
    id: number,
    unique_identifier: string,
    name: string,
    publisher: PublisherCondensed,
    live_date: Date,
    is_archived: boolean, // i.e. not sending inventory
    is_deal_pmp: boolean, // if 1 => deal based, else if 0 => tag based
    revenue_type: REVENUE_TYPE,
    revenue_value: string | null,
    has_hi10: boolean, // if 1, then both 'hi10_to_display' and 'hi10_to_video' should be set to 0 /
    // if 0, then 'hi10_to_display' should be set to 1 and 'hi10_to_video' should be set to 0 by default,
    // unless the user specifies otherwise.
    hi10_to_display: boolean,
    hi10_to_video: boolean,
    info: PublicationInfo
};

export type PublicationPaginate = Response<Publication[]>;

export type PublicationList = {
    data: Publication[]
}