import {Response} from '../../../_metronic/helpers';

export type Permission = {
    id: number,
    name: string
};

export type PermissionPaginate = Response<Permission[]>;

export type PermissionList = {
    data: Permission[]
}

export const defaultPermission: Permission = {id: 0, name: ""};