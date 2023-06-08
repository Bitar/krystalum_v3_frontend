import {Type} from '../Options'

export type PublicationInfo = {
  id: number
  type: Type
  description: string | null
  url: string | null // this will be filled in case the type is `website`
  ios_store_url: string | null // this will be filled in case the type is `mobile application` and is `ios`
  ios_bundle_id: string | null // this will be filled in case the type is `mobile application` and is `ios`
  ios_version: string | null // this will be filled in case the type is `mobile application` and is `ios`
  ios_application_type: string | null // this will be filled in case the type is `mobile application` and is `ios`
  android_store_url: string | null // this will be filled in case the type is `mobile application` and is `android`
  android_bundle_id: string | null // this will be filled in case the type is `mobile application` and is `android`
  android_version: string | null // this will be filled in case the type is `mobile application` and is `android`
  android_application_type: string | null // this will be filled in case the type is `mobile application` and is `android`
}
