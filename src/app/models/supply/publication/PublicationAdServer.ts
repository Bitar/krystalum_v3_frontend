import {Response} from '../../../../_metronic/helpers';
import {AdServer} from '../../misc/AdServer';

export type PublicationAdServer = {
    id: number,
    adServer: AdServer,
};

export type PublicationAdServerPaginate = Response<PublicationAdServer[]>;
