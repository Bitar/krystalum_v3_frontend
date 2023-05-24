import {Response} from '../../../../_metronic/helpers';
import {PublisherContactTypeEnum} from '../../../enums/Supply/PublisherContactTypeEnum';
import {ContactType} from '../Options';

export type PublisherContact = {
    id: number,
    contactType: ContactType,
    detail: string
};

export type PublisherContactPaginate = Response<PublisherContact[]>;
