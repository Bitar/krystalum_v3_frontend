import {ID, Response} from '../../../_metronic/helpers';

export type AdServer = {
    id: ID,
    name: string
};

export type AdServerPaginate = Response<AdServer[]>;

export type AdServerList = {
    data: AdServer[]
}

export const defaultAdServer: AdServer = {id: 0, name: ""};