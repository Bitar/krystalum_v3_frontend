import * as Yup from 'yup';
import {FormatSplitField} from './formatSplitField';
import {FormatKpiField} from './formatKpiField';

export interface CampaignOrderFormatFormFields {
    format_id: number | string,
    format_name: string,
    buying_model_id?: number | string,
    buying_model_name?: string,
    cost?: number | string,
    cost_currency_id?: number | string,
    cost_currency_name?: string,
    start_date: string,
    end_date?: string,
    regions_ids?: number[],
    regions_names?: string[],
    countries_ids?: number[],
    countries_names?: string[],
    cities_ids?: number[],
    cities_names?: string[],
    performance_metric_id?: number | string,
    target?: number | string,
    booked_amount: number | string,
    booked_currency_id: number | string,
    booked_currency_name: string,
    splits?: FormatSplitField[],
    kpis?: FormatKpiField[]
}

export const defaultCampaignOrderFormatFormFields = {
    format_id: '',
    format_name: '',
    buying_model_id: '',
    buying_model_name: '',
    cost: '',
    cost_currency_id: 236,
    cost_currency_name: '',
    start_date: '',
    end_date: '',
    regions_ids: [],
    regions_names: [],
    countries_ids: [],
    countries_names: [],
    cities_ids: [],
    cities_names: [],
    performance_metric_id: '',
    target: '',
    booked_amount: '',
    booked_currency_id: 236,
    booked_currency_name: '',
    splits: [],
    kpis: []
};

// TODO finish the validation based on required
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