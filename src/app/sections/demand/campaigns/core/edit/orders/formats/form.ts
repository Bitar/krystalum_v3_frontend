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
    kpis?: FormatKpiField[],
    kpi_meta?: string
}

export const defaultCampaignOrderFormatFormFields = {
    format_id: '',
    format_name: '',
    buying_model_id: '',
    buying_model_name: '',
    cost: '',
    cost_currency_id: 236,
    cost_currency_name: 'USD',
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
    booked_currency_name: 'USD',
    splits: [],
    kpis: [],
    kpi_meta: ''
};

export const getCampaignOrderFormatSchema = (hasBuyingModels: boolean, isAlwaysOn: boolean) => {
    const formatTypeBasedValidation = (value: any | undefined, context: any) => {
        if (hasBuyingModels) {
            // if the format has buying models, then the validation should pass if the field is set
            return value !== undefined && value !== null;
        } else {
            // if the format doesnt have buying models, then this field is not required so we just return true
            return true;
        }
    };

    const buyTypeBasedValidation = (value: any | undefined, context: any) => {
        if (!isAlwaysOn) {
            // if the format is NOT always on, then the validation should pass if the field is set (i.e. the field is required)
            return value !== undefined && value !== null;
        } else {
            // if the format is always on, then we don't have any validation on this field
            return true;
        }
    };

    return Yup.object().shape({
        format_id: Yup.number().required(),
        buying_model_id: Yup.number().test(
            'format-type-based-validation',
            'this field is required',
            formatTypeBasedValidation
        ),
        cost: Yup.number().test(
            'format-type-based-validation',
            'this field is required',
            formatTypeBasedValidation
        ),
        cost_currency_id: Yup.number().test(
            'format-type-based-validation',
            'this field is required',
            formatTypeBasedValidation
        ),
        start_date: Yup.string().required(),
        end_date: Yup.string().test(
            'buy-type-based-validation',
            'this field is required',
            buyTypeBasedValidation
        ),
        performance_metric_id: Yup.number().test(
            'format-type-based-validation',
            'this field is required',
            formatTypeBasedValidation
        ),
        target: Yup.number().test(
            'format-type-based-validation',
            'this field is required',
            formatTypeBasedValidation
        ),
        booked_amount: Yup.number().required(),
        booked_currency_id: Yup.number().required()
    });
}