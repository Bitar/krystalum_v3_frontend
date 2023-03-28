import KrysTable from '../components/tables/KrysTable';
import KrysBorderlessTable from '../components/tables/KrysBorderlessTable';

export enum Actions {
    CREATE = 1,
    EDIT,
    FILTER,
    EXPORT
}

export enum PageTypes {
    INDEX = 'index',
    CREATE = 'create',
    EDIT = 'edit',
    SHOW = 'show',
    REPORT = 'report',
    ERROR = 'error',
    ARCHIVED = 'archived',
}

export enum KrysToastType {
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
    PENDING = 'pending',
}