import {Actions, PageTypes} from "./variables";

export const generateSuccessMessage = (module: string, type: number) => {
    switch (type) {
        case Actions.CREATE:
            return create(module);
        case Actions.EDIT:
            return edit(module);
        default:
            return ''
    }
}

const create = (module: string) => {
    return `The ${module} was created.`
};

const edit = (module: string) => {
    return `The ${module} was updated.`
};