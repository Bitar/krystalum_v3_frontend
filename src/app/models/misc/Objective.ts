import {ID, Response} from '../../../_metronic/helpers';

export type Objective = {
    id: ID,
    name: string
};

export type ObjectivePaginate = Response<Objective[]>;

export type ObjectiveList = {
    data: Objective[]
}

export const defaultObjective: Objective = {id: 0, name: ""};