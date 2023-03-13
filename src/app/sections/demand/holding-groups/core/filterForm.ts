import * as Yup from 'yup';

export interface FilterFields {
    name?: string,
    regions?: number[],
    trading_desks?: number[]
}

export const defaultFilterFields = {name: '', regions: [], tradingDesks: []}

export const FilterSchema = Yup.object().shape({
    name: Yup.string().notRequired(),
    regions: Yup.array().of(Yup.number()).notRequired(),
    trading_desks: Yup.array().of(Yup.number()).notRequired()
});