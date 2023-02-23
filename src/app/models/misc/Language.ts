import {ID, Response} from '../../../_metronic/helpers';

export type Language = {
    id: ID,
    name: string
};

export type LanguagePaginate = Response<Language[]>;

export type LanguageList = {
    data: Language[]
}

export const defaultLanguage: Language = {id: 0, name: ''};