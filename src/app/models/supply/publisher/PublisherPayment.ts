import {Response} from '../../../../_metronic/helpers';

export type PublisherPayment = {
    id: number,
    beneficiary: string,
    account_number: string,
    swift_code: string,
    iban: string | null,
    bank_name: string,
    bank_address: string | null
};

export type PublisherPaymentPaginate = Response<PublisherPayment[]>;
