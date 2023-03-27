import * as Yup from 'yup';
import {Advertiser} from '../../../../../../models/demand/Advertiser';

export interface AdvertiserInfoFormFields {
    name: string,
    hq_address?: string, // some advertisers don't have an info row
    hq_country_id?: number, // some advertisers don't have an info row
    industry_id?: number, // whether an advertiser has an info row or not, this field is optional
    trade_license?: File // whether an advertiser has an info row or not, this field is optional,
}

export const defaultAdvertiserInfoFormFields = {name: '', hq_address: '', hq_country_id: 0};

export const AdvertiserInfoSchema = Yup.object().shape({
    name: Yup.string().required(),
    hq_address: Yup.string().required(),
    hq_country_id: Yup.number().required(),
    industry_id: Yup.number().notRequired(),
    trade_license: Yup.mixed().notRequired()
});

export function fillEditForm(advertiser: Advertiser): AdvertiserInfoFormFields {
    let advertiserForm: AdvertiserInfoFormFields = {name: advertiser.name};

    if (advertiser.info) {
        advertiserForm.hq_address = advertiser.info.address;
        advertiserForm.hq_country_id = advertiser.info.country.id;

        if (advertiser.info.industry) {
            advertiserForm.industry_id = advertiser.info.industry.id;
        }

        advertiserForm.trade_license = undefined;
    } else {
        advertiserForm.hq_address = '';
    }

    return advertiserForm;
}