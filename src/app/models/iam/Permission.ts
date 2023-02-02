import {ID, Response} from '../../../_metronic/helpers';

export type Permission = {
    id: ID,
    name: string
}

export type PermissionPaginate = Response<Permission[]>