import {Response} from '../../../../_metronic/helpers';
import {User} from '../../iam/User';

export type PublisherAccountManager = {
    id: number,
    name: string,
    email: string,
    assignment_date: Date,
    status: number
};

export type PublisherAccountManagerPaginate = Response<PublisherAccountManager[]>;
