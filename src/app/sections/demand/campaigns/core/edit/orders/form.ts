import * as Yup from 'yup';
import {CampaignOrderFormatFormFields} from './formats/form';

export interface CampaignOrderFormFields {
    booking_order_number: string,
    formats: CampaignOrderFormatFormFields[]
}

export const defaultCampaignOrderFormFields = {
    booking_order_number: '',
    formats: []
};

export const CampaignOrderSchema = Yup.object().shape({
    booking_order_number: Yup.string().required()
});