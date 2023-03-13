import {Response} from '../../../_metronic/helpers';
import {defaultRegion, Region} from '../misc/Region';
import {TradingDesk} from './TradingDesk';

export type HoldingGroup = {
    id: number,
    name: string,
    region: Region,
    tradingDesk?: TradingDesk | null
};

export type HoldingGroupPaginate = Response<HoldingGroup[]>;

export type HoldingGroupList = {
    data: HoldingGroup[]
}

export const defaultHoldingGroup: HoldingGroup = {id: 0, name: "", region: defaultRegion};