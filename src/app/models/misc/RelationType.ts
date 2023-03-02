import {ID} from "../../../_metronic/helpers";

export type RelationType = {
    id: ID,
    name: string,
};


export type RelationTypeList = {
    data: RelationType[]
}