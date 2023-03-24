import {Response} from '../../../_metronic/helpers';

export type Vertical = {
    id: number,
    name: string,
    parent: Vertical | null
};

export type VerticalPaginate = Response<Vertical[]>;

export type VerticalList = {
    data: Vertical[]
}