import {Response} from '../../../../_metronic/helpers';

export type ContactType = {
    id: string,
    name: string
};

export type ContactTypeList = {
    data: ContactType[]
}

export type PublisherContact = {
    id: number,
    contactType: ContactType,
    detail: string
};

export type PublisherContactPaginate = Response<PublisherContact[]>;
