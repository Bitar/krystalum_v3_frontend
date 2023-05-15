import {Response} from '../../../../_metronic/helpers';
import {AnalyticType, GeoType} from '../Options';
import {Region} from '../../misc/Region';
import {Country} from '../../misc/Country';
import {Device} from '../../misc/Device';

export type PublicationAnalytic = {
    id: number,
    type: AnalyticType,
    geoType: GeoType,
    geo: Region | Country,
    device: Device,
    value: number
};

export type PublicationAnalyticPaginate = Response<PublicationAnalytic[]>;
