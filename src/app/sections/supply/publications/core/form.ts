import * as Yup from 'yup';
import {Publication} from '../../../../models/supply/publication/Publication';
import {PUBLICATION_TYPE, REVENUE_TYPE} from '../../../../models/supply/Options';

export interface FormFields {
    name: string,
    unique_identifier: string,
    publisher_id: number,
    languages_ids: number[],
    live_date: Date | null,
    is_archived: number, // i.e. not sending inventory
    is_deal_pmp: number, // if 1 => deal based, else if 0 => tag based
    revenue_type: string,
    revenue_value: string,
    has_hi10: number, // if 1, then both 'hi10_to_display' and 'hi10_to_video' should be set to 0 /
    // if 0, then 'hi10_to_display' should be set to 1 and 'hi10_to_video' should be set to 0 by default,
    // unless the user specifies otherwise.
    hi10_to_display: number,
    hi10_to_video: number,
    types: string[], // this is for publication type (web, mobile application or both)
    description?: string | null,
    url?: string | null, // this will be filled in case the type is `website`
    ios_store_url?: string | null, // this will be filled in case the type is `mobile application` and is `ios`
    ios_bundle_id?: string | null, // this will be filled in case the type is `mobile application` and is `ios`
    ios_version?: string | null, // this will be filled in case the type is `mobile application` and is `ios`
    ios_application_type?: string | null, // this will be filled in case the type is `mobile application` and is `ios`
    android_store_url?: string | null, // this will be filled in case the type is `mobile application` and is `android`
    android_bundle_id?: string | null, // this will be filled in case the type is `mobile application` and is `android`
    android_version?: string | null, // this will be filled in case the type is `mobile application` and is `android`
    android_application_type?: string | null // this will be filled in case the type is `mobile application` and is `android`
}

export const defaultFormFields = {
    name: '',
    unique_identifier: '',
    publisher_id: 0,
    languages_ids: [],
    live_date: null,
    is_archived: 0,
    is_deal_pmp: 0,
    revenue_type: REVENUE_TYPE.SAME_AS_PUBLISHER,
    revenue_value: '',
    has_hi10: 1,
    hi10_to_display: 0,
    hi10_to_video: 0,
    types: [],
    url: '',
    ios_store_url: '',
    ios_bundle_id: '',
    ios_version: '',
    ios_application_type: '',
    android_store_url: '',
    android_bundle_id: '',
    android_version: '',
    android_application_type: ''
};

export const PublicationSchema = Yup.object().shape({
    name: Yup.string()
        .required(),
    publisher_id: Yup.number()
        .min(1, 'publisher is a required field')
        .required(),
    unique_identifier: Yup.string()
        .required()
        .matches(/^[A-Z]{3,4}$/, 'enter a 3 or 4 capital letters code'),
    languages_ids: Yup.array()
        .of(Yup.number())
        .required()
        .min(1, 'you must select at least one language'),
    live_date: Yup.date()
        .typeError('enter a valid date')
        .required('date is a required field'),
    has_hi10: Yup.boolean().required(),
    hi10_to_display: Yup.mixed().when('has_hi10', (hasHi10, hi10ToVideo) =>
        hasHi10 === 0 && hi10ToVideo === 0
            ? Yup.boolean().required()
            : Yup.boolean().notRequired()),
    hi10_to_video: Yup.mixed().when('has_hi10', (hasHi10, hi10ToDisplay) =>
        hasHi10 === 1 && hi10ToDisplay === 1
            ? Yup.boolean().required()
            : Yup.boolean().notRequired()),
    types: Yup.array()
        .min(1, 'select at least one publication type')
        .required(),
    url: Yup.string().when('types', {
        is: (types: string[]) => types.includes(PUBLICATION_TYPE.WEBSITE),
        then: Yup.string().url().required('publication url is required when the publication type is website'),
        otherwise: Yup.string().notRequired(),
    }),
    android_store_url: Yup.string().when('types', {
        is: (types: string[]) => types.includes(PUBLICATION_TYPE.ANDROID_APPLICATION),
        then: Yup.string().url().required('android store url is required when the publication type is android application'),
        otherwise: Yup.string().notRequired(),
    }),
    android_bundle_id: Yup.string().when('types', {
        is: (types: string[]) => types.includes(PUBLICATION_TYPE.ANDROID_APPLICATION),
        then: Yup.string().required('android bundle id is required when the publication type is android application'),
        otherwise: Yup.string().notRequired(),
    }),
    android_version: Yup.string().when('types', {
        is: (types: string[]) => types.includes(PUBLICATION_TYPE.ANDROID_APPLICATION),
        then: Yup.string().required('android version is required when the publication type is android application'),
        otherwise: Yup.string().notRequired(),
    }),
    android_application_type: Yup.string().when('types', {
        is: (types: string[]) => types.includes(PUBLICATION_TYPE.ANDROID_APPLICATION),
        then: Yup.string().required('android application type is required when the publication type is android application'),
        otherwise: Yup.string().notRequired(),
    }),
    ios_store_url: Yup.string().when('types', {
        is: (types: string[]) => types.includes(PUBLICATION_TYPE.IOS_APPLICATION),
        then: Yup.string().url().required('ios store url is required when the publication type is ios application'),
        otherwise: Yup.string().notRequired(),
    }),
    ios_bundle_id: Yup.string().when('types', {
        is: (types: string[]) => types.includes(PUBLICATION_TYPE.IOS_APPLICATION),
        then: Yup.string().required('ios bundle id is required when the publication type is ios application'),
        otherwise: Yup.string().notRequired(),
    }),
    ios_version: Yup.string().when('types', {
        is: (types: string[]) => types.includes(PUBLICATION_TYPE.IOS_APPLICATION),
        then: Yup.string().required('ios version is required when the publication type is ios application'),
        otherwise: Yup.string().notRequired(),
    }),
    ios_application_type: Yup.string().when('types', {
        is: (types: string[]) => types.includes(PUBLICATION_TYPE.IOS_APPLICATION),
        then: Yup.string().required('ios application type is required when the publication type is ios application'),
        otherwise: Yup.string().notRequired(),
    }),
    revenue_type: Yup.string().required(),
    revenue_value: Yup.mixed().when('revenue_type', (revenueType) =>
        revenueType === REVENUE_TYPE.REVENUE_SHARE
            ? Yup.number().min(1, 'revenue share must be greater than 0').max(100, 'revenue share must be less than or equal to 100').required()
            : (revenueType === REVENUE_TYPE.COMMITMENT ? Yup.string().required() : Yup.string().notRequired())
    )
});

export function fillEditForm(publication: Publication) {
    const {info, ...currentPublication} = publication

    // const form: FormFields = {
    //     ...currentPublication
    // };
    //
    // return form;
}