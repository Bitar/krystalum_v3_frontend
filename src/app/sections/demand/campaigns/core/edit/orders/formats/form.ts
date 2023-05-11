import * as Yup from 'yup';
import {FormatSplitField} from './formatSplitField';

export interface CampaignOrderFormatFormFields {
    format_id: number | string,
    buying_model_id?: number | string,
    cost?: number | string,
    cost_currency_id?: number | string,
    start_date: string,
    end_date?: string,
    regions_ids?: number[],
    countries_ids?: number[],
    cities_ids?: number[],
    performance_metric_id?: number | string,
    target?: number | string,
    booked_amount: number | string,
    booked_currency_id: number | string,
    splits?: FormatSplitField[]
}

export const defaultCampaignOrderFormatFormFields = {
    format_id: '',
    buying_model_id: '',
    cost: '',
    cost_currency_id: 236,
    start_date: '',
    end_date: '',
    regions_ids: [],
    countries_ids: [],
    cities_ids: [],
    performance_metric_id: '',
    target: '',
    booked_amount: '',
    booked_currency_id: 236,
    splits: []
};

export const CampaignOrderFormatSchema = Yup.object().shape({
    format_id: Yup.number().required(),
    buying_model_id: Yup.number().required(), // required IF the format_id is not masthead,
    cost: Yup.number().required(), // required IF the format_id is not masthead,
    cost_currency_id: Yup.number().required(), // required IF the format_id is not masthead,
    start_date: Yup.string().required(),
    end_date: Yup.string().required(), // required IF the campaign buy type is not ALWAYS ON
    performance_metric_id: Yup.number().required(), // required IF the format_id is not masthead,
    target: Yup.number().required(), // required IF the format_id is not masthead,
    booked_amount: Yup.number().required(),
    booked_currency_id: Yup.number().required()
});