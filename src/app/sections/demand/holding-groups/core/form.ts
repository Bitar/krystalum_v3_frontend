import * as Yup from 'yup';
import {Region} from '../../../../models/misc/Region';
import {TradingDesk} from '../../../../models/demand/TradingDesk';

export interface FormFields {
    name: string,
    region: Region | null,
    trading_desk?: TradingDesk
}

export const defaultFormFields = {name: '', region: null};

export const HoldingGroupSchema = Yup.object().shape({
    name: Yup.string().required(),
    region: Yup.object().required(),
    trading_desk: Yup.object().notRequired()
});