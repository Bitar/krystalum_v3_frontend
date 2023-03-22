import * as Yup from 'yup';

export interface CreateFormFields {
    name: string
}

export const defaultCreateFormFields = {name: ''};

export interface UpdateInfoFormFields {
    name: string,
    hq_address?: string, // some advertisers don't have an info row
    hq_country_id?: number, // some advertisers don't have an info row
    industry_id?: number, // whether an advertiser has an info row or not, this field is optional
    trade_license?: File // whether an advertiser has an info row or not, this field is optional
}

export const defaultUpdateInfoFormFields = {name: '', hq_address: '', hq_country_id: 0};

export const CreateAdvertiserSchema = Yup.object().shape({
    name: Yup.string().required()
});

export const UpdateAdvertiserSchema = Yup.object().shape({
    name: Yup.string().required(),
    hq_address: Yup.string().required(),
    hq_country_id: Yup.number().required(),
    industry_id: Yup.number().notRequired(),
    trade_license: Yup.mixed().notRequired()
});