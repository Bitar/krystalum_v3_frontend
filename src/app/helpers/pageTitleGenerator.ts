import {PageTypes} from "./variables";

const APP_NAME = process.env.REACT_APP_THEME_NAME
const SEPARATOR = '|'

export const generatePageTitle = (module: string, type: string, name?: string) => {
    switch (type) {
        case PageTypes.INDEX:
            return index(module);
        case PageTypes.CREATE:
            return create(module);
        case PageTypes.EDIT:
            return edit(module, name);
        case PageTypes.SHOW:
            return show(module, name);
        case PageTypes.REPORT:
            return report(module, name);
        default:
            return index(module)
    }
}

const index = (module: string) => {
    return `${module} ${SEPARATOR} ${APP_NAME}`
};

const create = (module: string) => {
    return `Create ${SEPARATOR} ${module} ${SEPARATOR} ${APP_NAME}`
};

const edit = (module: string, name: string | undefined) => {
    return `Edit ${name} ${SEPARATOR} ${module} ${SEPARATOR} ${APP_NAME}`
};

const show = (module: string, name: string | undefined) => {
    return `${name} ${SEPARATOR} ${module} ${SEPARATOR} ${APP_NAME}`
};

const report = (module: string, name: string | undefined) => {
    return `${name} ${SEPARATOR} Report ${SEPARATOR} ${module} ${SEPARATOR} ${APP_NAME}`
};