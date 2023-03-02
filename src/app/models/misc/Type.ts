import {ID, Response} from "../../../_metronic/helpers";
import {Country} from "./Country";

export type Type = {
    id: ID,
    name: string,
};

export type TypePaginate = Response<Type[]>;

export type TypeList = {
    data: Type[]
}
