import * as Yup from 'yup';
import {defaultRegion, Region} from '../../../../models/misc/Region';
import {TradingDesk} from '../../../../models/demand/TradingDesk';

export interface FormFields {
    name: string,
    region: Region,
    tradingDesk?: TradingDesk | null
}

export const defaultFormFields = {name: '', region: defaultRegion, tradingDesk: null};

export const HoldingGroupSchema = Yup.object().shape({
    name: Yup.string().required(),
    region: Yup.object().required(),
    tradingDesk: Yup.object().notRequired()
});