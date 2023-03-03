export enum Actions {
    CREATE = 1,
    EDIT,
    FILTER,
    EXPORT
}

export const ActionTexts: { [key in Actions]: string } = {
    [Actions.CREATE]: 'create',
    [Actions.EDIT]: 'edit',
    [Actions.FILTER]: 'filter',
    [Actions.EXPORT]: 'export',
};

export enum PageTypes {
    INDEX = 'index',
    CREATE = 'create',
    EDIT = 'edit',
    SHOW = 'show',
    REPORT = 'report'
}

export enum KrysToastType {
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning'
}