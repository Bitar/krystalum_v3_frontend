import * as Yup from 'yup';

export interface PublisherPaymentFormFields {
    beneficiary: string,
    account_number: string,
    swift_code: string,
    iban?: string | null,
    bank_name: string,
    bank_address?: string | null
}

export const defaultPublisherPaymentFormFields = {
    beneficiary: '',
    account_number: '',
    swift_code: '',
    iban: '',
    bank_name: '',
    bank_address: ''
};

export const PublisherPaymentSchema = Yup.object().shape({
    beneficiary: Yup.string().required(),
    account_number: Yup.string().required(),
    swift_code: Yup.string().required(),
    iban: Yup.string().notRequired(),
    bank_name: Yup.string().required(),
    bank_address: Yup.string().notRequired(),
});