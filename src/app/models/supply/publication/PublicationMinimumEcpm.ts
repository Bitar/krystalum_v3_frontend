import {Response} from '../../../../_metronic/helpers';
import {GeoType} from '../Options';
import {Region} from '../../misc/Region';
import {Country} from '../../misc/Country';
import {Format} from '../../misc/Format';
import {Currency} from '../../misc/Currency';

export type PublicationMinimumEcpm = {
    id: number,
    format: Format,
    geoType: GeoType,
    geo: Region | Country,
    rate: number,
    currency: Currency
};

export type PublicationMinimumEcpmPaginate = Response<PublicationMinimumEcpm[]>;
