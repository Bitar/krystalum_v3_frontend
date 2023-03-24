import {Response} from '../../../_metronic/helpers';

export type Audience = {
    id: number,
    name: string
};

export type AudiencePaginate = Response<Audience[]>;

export type AudienceList = {
    data: Audience[]
}