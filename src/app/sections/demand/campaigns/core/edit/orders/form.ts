import * as Yup from 'yup';

export interface CampaignOrderFormFields {
    booking_order_number: string
}

export const defaultCampaignOrderFormFields = {
    booking_order_number: ''
};

export const CampaignOrderSchema = Yup.object().shape({
    booking_order_number: Yup.string().required()
});