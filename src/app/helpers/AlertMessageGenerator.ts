import {Actions, KrysToastType} from "./variables";
import {GenericErrorMessage} from './form';

type AlertFunctionType = {
    [key: string]: (module: string) => string;
};

const ActionTexts: { [key in Actions]: string } = {
    [Actions.CREATE]: 'create',
    [Actions.EDIT]: 'edit',
    [Actions.FILTER]: 'filter',
    [Actions.EXPORT]: 'export',
    [Actions.SELECT]: 'select',
};

export class AlertMessageGenerator {
    module: string;
    action: number;
    type: string;
    message: string;

    constructor(module: string, action: number, type: KrysToastType) {
        this.module = module;
        this.action = action;
        this.type = type;

        this.message = messages[(ActionTexts as any)[this.action]][this.type](this.module);
    }
}

export const messages: { [alert: string]: AlertFunctionType } = {
    create: {
        success: (module) => {
            return `Success! The ${module} was created.`
        },
        error: (module) => {
            return GenericErrorMessage;
        },
    },
    edit: {
        success: (module) => {
            return `Success! The ${module} was updated.`
        },
        error: (module) => {
            return GenericErrorMessage;
        },
    },
    export: {
        success: (module) => {
            return 'Success! Your exported file is ready to download.';
        },
        pending: (module) => {
            return 'Attention! The report will be sent to your email once it\'s ready.';
        },
        error: (module) => {
            return GenericErrorMessage;
        },
    },
};