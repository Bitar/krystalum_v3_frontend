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
    REPORT = 'report'
}

export enum FileFormats {
    EXCEL_SPREADSHEET = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    WORD_DOCUMENT = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    POWER_POINT_PRESENTATION = 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    PDF_DOCUMENT = 'application/pdf'
}