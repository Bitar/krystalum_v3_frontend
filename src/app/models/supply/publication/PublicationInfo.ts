import {PUBLICATION_TYPE} from '../Options';

export type PublicationInfo = {
    id: number,
    type: PUBLICATION_TYPE,
    description: string | null,
    url: string | null, // this will be filled in case the type is `website`
    ios_store_url: string, // this will be filled in case the type is `mobile application` and is `ios`
    ios_bundle_id: string, // this will be filled in case the type is `mobile application` and is `ios`
    ios_version: string, // this will be filled in case the type is `mobile application` and is `ios`
    ios_application_type: string, // this will be filled in case the type is `mobile application` and is `ios`
    android_store_url: string, // this will be filled in case the type is `mobile application` and is `android`
    android_bundle_id: string, // this will be filled in case the type is `mobile application` and is `android`
    android_version: string, // this will be filled in case the type is `mobile application` and is `android`
    android_application_type: string // this will be filled in case the type is `mobile application` and is `android`
};