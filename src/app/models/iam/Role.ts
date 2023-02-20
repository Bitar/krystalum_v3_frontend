import {Permission} from './Permission';
import {ID, Response} from '../../../_metronic/helpers';

export type Role = {
    id: ID,
    name: string,
    permissions: Permission[]
}

export type RoleList = {
    data: Role[]
}

export type RolePaginate = Response<Role[]>

export const defaultRole: Role = {id: 0, name: "", permissions: []};