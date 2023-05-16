import {Response} from '../../../../_metronic/helpers';
import {GeoType} from '../Options';
import {Region} from '../../misc/Region';
import {Country} from '../../misc/Country';
import {Format} from '../../misc/Format';

export type PublicationFixedCpm = {
    id: number,
    format: Format,
    geoType: GeoType,
    geo: Region | Country,
    price: number,
    currency: Country
};

export type PublicationFixedCpmPaginate = Response<PublicationFixedCpm[]>;
