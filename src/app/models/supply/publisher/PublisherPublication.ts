import {Response} from '../../../../_metronic/helpers';

export type PublisherAccountManager = {
    id: number,
    name: string
};

export type PublisherAccountManagerPaginate = Response<PublisherAccountManager[]>;
