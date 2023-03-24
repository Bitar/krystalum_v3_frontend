import {Response} from '../../../_metronic/helpers';

export type Objective = {
    id: number,
    name: string
};

export type ObjectivePaginate = Response<Objective[]>;

export type ObjectiveList = {
    data: Objective[]
}