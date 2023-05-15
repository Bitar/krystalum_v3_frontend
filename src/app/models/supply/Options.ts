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

export type ApplicationType = {
    id: string, // this column is of type string because the enum we receive from the API is represented as a string
    name: string
};

export type ApplicationTypeList = {
    data: ApplicationType[]
}

export type FormatType = {
    id: string, // this column is of type string because the enum we receive from the API is represented as a string
    name: string
};

export type FormatTypeList = {
    data: FormatType[]
}

export type Type = {
    id: string, // this column is of type string because the enum we receive from the API is represented as a string
    name: string
};

export type TypeList = {
    data: Type[]
}

export type RevenueType = {
    id: string, // this column is of type string because the enum we receive from the API is represented as a string
    name: string
};

export type RevenueTypeList = {
    data: RevenueType[]
}

export const defaultAnalyticsType = {id: 'unique_users', name: 'Unique users'}