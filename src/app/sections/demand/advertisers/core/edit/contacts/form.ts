// Edit and Create Contact Forms
import * as Yup from 'yup';

export interface AdvertiserContactsFormFields {
    contact_name?: string,
    agency_name?: string,
    contact_info: string
}

export const defaultAdvertiserContactsFormFields = {contact_name: '', agency_name: '', contact_info: ''};

export const AdvertiserContactsSchema = Yup.object().shape({
    contact_name: Yup.string().notRequired(),
    agency_name: Yup.string().notRequired(),
    contact_info: Yup.string().required().max(255, 'You have exceeded the maximum length for contact info (255)')
});