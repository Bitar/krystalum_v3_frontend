import {Response} from '../../../../_metronic/helpers';
import {ANALYTICS_TYPE, GEO_TYPE} from '../Options';
import {Region} from '../../misc/Region';
import {Country} from '../../misc/Country';
import {Device} from '../../misc/Device';

export type PublicationAnalytic = {
    id: number,
    type: ANALYTICS_TYPE,
    geoType: GEO_TYPE,
    geo: Region | Country,
    device: Device,
    value: number
};

export type PublicationAnalyticPaginate = Response<PublicationAnalytic[]>;
