import * as Yup from 'yup';

export interface FormFields {
    name: string
}

export const defaultFormFields = {name: ''};

export const TradingDeskSchema = Yup.object().shape({
    name: Yup.string().required()
});