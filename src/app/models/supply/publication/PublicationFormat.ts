import {Response} from '../../../../_metronic/helpers';
import {FormatType} from '../Options';
import {Format} from '../../misc/Format';

export type PublicationFormat = {
    id: number,
    format: Format,
    type: FormatType
};

export type PublicationFormatPaginate = Response<PublicationFormat[]>;
