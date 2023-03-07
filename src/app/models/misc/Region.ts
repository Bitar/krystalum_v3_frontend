import {Response} from "../../../_metronic/helpers";

export type Region = {
    id: number,
    name: string,
    type: Type | null,
    countries: any[],

    regions: any[]
};

export type RegionPaginate = Response<Region[]>;

export type RegionList = {
    data: Region[]
}

export const defaultRegion: Region = {id: 0, name: '', countries: [], regions: [], type: null};


/*Types For Regions ['Countries','Regions','Both']*/

export type Type = {
    id: number,
    name: string,
};


export type TypeList = {
    data: Type[]
}

