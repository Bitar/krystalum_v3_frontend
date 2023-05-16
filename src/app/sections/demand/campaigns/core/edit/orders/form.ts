import * as Yup from 'yup';
import {CampaignOrderFormatFormFields} from './formats/form';
import {Campaign} from '../../../../../../models/demand/Campaign';
import {BookingTypeEnum} from '../../../../../../enums/BookingTypeEnum';

export interface CampaignOrderFormFields {
    booking_order_number: string,
    formats: CampaignOrderFormatFormFields[]
}

export const defaultCampaignOrderFormFields = {
    booking_order_number: '',
    formats: []
};

export const getCampaignOrderSchema = (campaign: Campaign | null) => {
    const campaignBOBasedValidation = (value: any | undefined, context: any) => {
        if (campaign && campaign.bookingType.id === BookingTypeEnum.BO) {
            // in case the campaign is a BO, then the field is VALID if it's set
            return value !== undefined && value !== null;
        } else {
            // if the campaign is TD, then this field is not required
            return true;
        }
    };

    const campaignTDBasedValidation = (value: any | undefined, context: any) => {
        if (campaign && campaign.bookingType.id === BookingTypeEnum.TD) {
            // in case the campaign is a BO, then the field is VALID if it's set
            return value !== undefined && value !== null && (value instanceof Array && value.length >= 1);
        } else {
            // if the campaign is TD, then this field is not required
            return true;
        }
    };

    return Yup.object().shape({
        booking_order_number: Yup.string().test(
            'campaign-booking-type-based-validation',
            'this field is required',
            campaignBOBasedValidation
        ),
        formats: Yup.array().test(
            'campaign-booking-type-based-validation',
            'You need to add at least one format',
            campaignTDBasedValidation
        )
    });
}