import {Response} from '../../../../_metronic/helpers';
import {Format} from '../../misc/Format';
import {FormatType} from '../Options';

export type PublicationFormat = {
    id: number,
    format: Format,
    type: FormatType
};

export type PublicationFormatPaginate = Response<PublicationFormat[]>;
