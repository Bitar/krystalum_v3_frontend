import * as Yup from 'yup';
import {Campaign} from '../../../../models/demand/Campaign';
import {AdvertiserTypeEnum} from '../../../../enums/AdvertiserTypeEnum';

export interface FormFields {
    name: string,
    booking_type_id: number | string,
    buy_type_id?: number,
    seat_id?: string,
    revenue_country_id: number | string,
    advertiser_type: string,
    advertiser_id: number | string,
    agency_id?: number,
    region_id?: number,
    objectives_ids?: number[],
    objectives?: string[],
    is_owner_demand?: number,
    user_id?: number
}

export const defaultFormFields = {
    name: '',
    booking_type_id: '',
    seat_id: '',
    revenue_country_id: '',
    advertiser_type: '',
    advertiser_id: '',
    is_owner_demand: 1
};


export const getCampaignSchema = (isDemandUser: boolean) => {
    const roleBasedValidation = (value: any | undefined, context: any) => {
        if (isDemandUser) {
            // the field is valid if it's set
            return value !== undefined && value !== null;
        } else {
            // if the user is not demand then we don't care about this field
            return true;
        }
    };

    return Yup.object().shape({
        name: Yup.string().required(),
        booking_type_id: Yup.number().required(),
        buy_type_id: Yup.number().when("booking_type_id", {
            is: 2, // TD
            then: Yup.number().required("You must select a buy type if the campaign is a TD")
        }),
        seat_id: Yup.string().when("booking_type_id", {
            is: 2, // TD
            then: Yup.string().required("You must enter a seat ID if the campaign is a TD")
        }),
        revenue_country_id: Yup.number().required(),
        advertiser_type: Yup.string().required(),
        advertiser_id: Yup.number().required(),
        agency_id: Yup.number().when("advertiser_type", {
            is: 'with_agency',
            then: Yup.number().required("You must select an agency when advertiser type is 'with agency'")
        }),
        region_id: Yup.number().when("advertiser_type", {
            is: 'with_publisher' || 'direct_client',
            then: Yup.number().required("You must select a region when advertiser type is not 'with agency'")
        }),
        objectives_ids: Yup.array().of(Yup.number()).notRequired(),
        objectives: Yup.array().of(Yup.string()).notRequired(),
        is_owner_demand: Yup.number().test(
            'role-based-validation',
            'this field is required',
            roleBasedValidation
        ),
        user_id: Yup.number().test(
            'role-based-validation',
            'You must select a user as owner',
            roleBasedValidation
        )
    });
}

export function fillEditForm(campaign: Campaign): FormFields {
    let campaignForm: FormFields = {
        name: campaign.name,
        booking_type_id: campaign.bookingType.id,
        revenue_country_id: campaign.revenueCountry.id,
        advertiser_type: campaign.advertiser_type,
        advertiser_id: campaign.advertiser.id,
    };

    if(campaign.buyType){
        campaignForm.buy_type_id = campaign.buyType.id;
    }

    if(campaign.seat_id) {
        campaignForm.seat_id = campaign.seat_id;
    }

    if(campaign.advertiser_type === AdvertiserTypeEnum.WITH_AGENCY) {
        // set the agency_id
        campaignForm.agency_id = campaign.agency?.id;
    } else if(campaign.advertiser_type === AdvertiserTypeEnum.DIRECT_CLIENT) {
        // set the region_id
        campaignForm.region_id = campaign.region?.id
    }

    if(campaign.objectives) {
        campaignForm.objectives_ids = campaign.objectives.map((objective) => objective.id);
    }

    if(campaign.owner) {
        campaignForm.user_id = campaign.owner.id;
    }

    // TODO add case with publisher

    return campaignForm;
}