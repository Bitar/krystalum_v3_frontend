import * as Yup from 'yup';

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