import {Response} from "../../../_metronic/helpers";

export type Region = {
    id: number,
    name: string,
    countries: any[],

};

export type RegionPaginate = Response<Region[]>;

export type RegionList = {
    data: Region[]
}

export const defaultRegion: Region = {id: 0, name: '', countries: []};

