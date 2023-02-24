import {Actions} from './variables';

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
    return `Success! The ${module} was created.`
};

const edit = (module: string) => {
    return `Success! The ${module} was updated.`
};