import {Response} from '../../../../_metronic/helpers';

export type ContactType = {
    id: number,
    name: string
};

export type ContactTypeList = {
    data: ContactType[]
}

export type PublisherContact = {
    id: number,
    type: ContactType,
    detail: string
};

export type PublisherContactPaginate = Response<PublisherContact[]>;
