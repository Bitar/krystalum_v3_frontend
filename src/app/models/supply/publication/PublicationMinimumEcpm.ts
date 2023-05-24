import {Response} from '../../../../_metronic/helpers';
import {GeoTypeEnum} from '../../../enums/Supply/GeoTypeEnum';
import {Country} from '../../misc/Country';
import {Currency} from '../../misc/Currency';
import {Format} from '../../misc/Format';
import {Region} from '../../misc/Region';
import {GeoType} from '../Options';

export type PublicationMinimumEcpm = {
    id: number,
    format: Format,
    geoType: GeoType,
    geo: Region | Country,
    rate: number,
    currency: Currency
};

export type PublicationMinimumEcpmPaginate = Response<PublicationMinimumEcpm[]>;
