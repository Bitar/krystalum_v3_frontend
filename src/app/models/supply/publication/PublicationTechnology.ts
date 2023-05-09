import {Response} from '../../../../_metronic/helpers';
import {Technology} from '../../misc/Technology';

export type PublicationTechnology = {
    id: number,
    technology: Technology,
};

export type PublicationTechnologyPaginate = Response<PublicationTechnology[]>;
