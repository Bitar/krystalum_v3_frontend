import {Response} from '../../../_metronic/helpers';

export type Audience = {
    id: number,
    name: string
};

export type AudiencePaginate = Response<Audience[]>;

export type AudienceList = {
    data: Audience[]
}

export const defaultAudience: Audience = {id: 0, name: ''};