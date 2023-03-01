import {ActionTexts, KrysToastType} from "./variables";
import {GenericErrorMessage} from './form';

type AlertFunctionType = {
    [key: string]: (module: string) => string;
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
        error: (module) => {
            return GenericErrorMessage;
        },
    },
};