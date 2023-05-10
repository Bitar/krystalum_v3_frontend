/* Types */

export type ContactType = {
    id: string, // this column is of type string because the enum we receive from the API is represented as a string
    name: string
};

export type ContactTypeList = {
    data: ContactType[]
}

export type AnalyticType = {
    id: string, // this column is of type string because the enum we receive from the API is represented as a string
    // i.e. {id: 'unique_users', name: 'Unique users'}
    name: string
};

export type AnalyticTypeList = {
    data: AnalyticType[]
}

export type GeoType = {
    id: string,
    name: string
};

export type GeoTypeList = {
    data: GeoType[]
}

export type FormatType = {
    id: string, // this column is of type string because the enum we receive from the API is represented as a string
    name: string
};

export type FormatTypeList = {
    data: FormatType[]
}

export const defaultAnalyticsType = {id: 'unique_users', name: 'Unique users'}

/* Enums */

/* This Enum defines the possible types of revenue that can be used in the project. */
export enum REVENUE_TYPE {
    SAME_AS_PUBLISHER = 'same_as_publisher',
    REVENUE_SHARE = 'revenue_share',
    COMMITMENT = 'commitment'
}

/* This Enum defines the possible publication types that can be used in the project. */
export enum PUBLICATION_TYPE {
    WEBSITE = 'website',
    MOBILE_APPLICATION = 'mobile_application',
    IOS_APPLICATION = 'ios_application',
    ANDROID_APPLICATION = 'android_application',
    BOTH = 'both',
}

/* This Enum defines the possible publication types that can be used in the project. */
export enum APPLICATION_TYPE {
    FREE = 'free',
    PAID = 'paid'
}

/* This Enum defines the possible geo types that can be used in the project. */
export enum GEO_TYPE {
    COUNTRY = 'App\\Models\\Misc\\Country',
    REGION = 'App\\Models\\Misc\\Region'
}