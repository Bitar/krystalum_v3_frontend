import {ID, Response} from '../../../_metronic/helpers';

export type Permission = {
    id: ID,
    name: string
};

export type PermissionPaginate = Response<Permission[]>;

export type PermissionList = {
    data: Permission[]
}

export const defaultPermission: Permission = {id: 0, name: ""};