import * as Yup from 'yup';

export interface FormFields {
    name: string,
    region_id: number | string,
    trading_desk_id?: number
}

export const defaultFormFields = {name: '', region_id: ''};

export const HoldingGroupSchema = Yup.object().shape({
    name: Yup.string().required(),
    region_id: Yup.number().required(),
    trading_desk_id: Yup.number().notRequired()
});