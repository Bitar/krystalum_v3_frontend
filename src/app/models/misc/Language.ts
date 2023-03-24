import {Response} from '../../../_metronic/helpers';

export type Language = {
    id: number,
    name: string
};

export type LanguagePaginate = Response<Language[]>;

export type LanguageList = {
    data: Language[]
}