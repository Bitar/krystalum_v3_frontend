import {ID, Response} from '../../../_metronic/helpers'
import {Role} from './Role';

export type User = {
    id: ID,
    name: string,
    email: string,
    image?: string,
    roles: Role[]
}

export type UserPaginate = Response<User[]>;
