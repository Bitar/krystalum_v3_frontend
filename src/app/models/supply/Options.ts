/*
    This Enum defines the possible types of revenue that can be used in the project.
*/
export enum REVENUE_TYPE {
    SAME_AS_PUBLISHER = 'same_as_publisher',
    REVENUE_SHARE = 'revenue_share',
    COMMITMENT = 'commitment'
}

/*
    This Enum defines the possible publication types that can be used in the project.
*/
export enum PUBLICATION_TYPE {
    WEBSITE = 'website',
    MOBILE_APPLICATION = 'mobile_application',
    IOS_APPLICATION = 'ios_application',
    ANDROID_APPLICATION = 'android_application',
    BOTH = 'both',
}

/*
    This Enum defines the possible publication types that can be used in the project.
*/
export enum APPLICATION_TYPE {
    FREE = 'free',
    PAID = 'paid'
}

/*
    This Enum defines the possible publication analytics types that can be used in the project.
*/
export enum ANALYTICS_TYPE {
    UNIQUE_USERS = 'unique_users',
    PAGE_VIEWS = 'page_views',
    BOUNCE_RATE = 'bounce_rate',
    AVERAGE_SESSIONS_DURATION = 'average_sessions_duration'
}

/*
    This Enum defines the possible geo types that can be used in the project.
*/
export enum GEO_TYPE {
    COUNTRY = 'App\\Models\\Misc\\Country',
    REGION = 'App\\Models\\Misc\\Region'
}