import {ID, Response} from "../../../_metronic/helpers";

export type Region = {
    id: ID,
    name: string,
    type:string,
    countries:[],

    regions:[]
};

export type RegionPaginate = Response<Region[]>;

export type RegionList = {
    data: Region[]
}

export const defaultRegion: Region = {id: 0, name: '',countries:[],regions:[],type:''};
/*Types For Regions ['Countries','Regions','Both']*/

export type Type = {
    id: ID,
    name: string,
};


export type TypeList = {
    data: Type[]
}

