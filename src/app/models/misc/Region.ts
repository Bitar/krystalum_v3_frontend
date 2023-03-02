import {ID, Response} from "../../../_metronic/helpers";

export type Region = {
    id: ID,
    name: string,
};

export type RegionPaginate = Response<Region[]>;

export type RegionList = {
    data: Region[]
}

export const defaultRegion: Region = {id: 0, name: ''};

