import {ID, Response} from '../../../_metronic/helpers'
import {Role} from './Role';

export type User = {
    id: ID,
    name: string,
    password?: string,
    password_confirmation?: string,
    email: string,
    image?: string,
    roles: Role[]
}

export type UserList = {
    data: User[]
}

export type UserPaginate = Response<User[]>;

export const defaultUser: User = {id: 0, name: "", email: "", roles: []};
