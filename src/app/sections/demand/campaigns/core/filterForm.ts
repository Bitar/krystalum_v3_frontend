export interface FilterFields {
    name?: string,
    unique_identifiers?: string[],
    agencies?: number[],
    advertisers?: number[],
    booking_types?: number[],
    buy_types?: number[],
    countries?: number[],
    owners?: number[],
    advertiser_regions?: number[]
}

// we had to put unique_identifiers = [] part of the default so we're able to safely
// reset the tag input field
export const defaultFilterFields = {name: '', unique_identifiers: []}