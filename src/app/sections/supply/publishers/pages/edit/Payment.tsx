import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Select from 'react-select';

import {KTCard, KTCardBody, QUERIES} from '../../../../../../_metronic/helpers';

import FormErrors from '../../../../../components/forms/FormErrors';
import {
    GenericErrorMessage,
    genericOnChangeHandler,
    genericSingleSelectOnChangeHandler
} from '../../../../../helpers/form';
import {extractErrors} from '../../../../../helpers/requests';
import {AlertMessageGenerator} from '../../../../../helpers/alertMessageGenerator';
import {Actions, KrysToastType} from '../../../../../helpers/variables';
import {useKrysApp} from '../../../../../modules/general/KrysApp';
import {Publisher} from '../../../../../models/supply/publisher/Publisher';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import KrysFormLabel from '../../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../../components/forms/KrysFormFooter';
import KrysIndex from '../../partials/KrysIndex';
import {defaultFormFields, FormFields, PaymentSchema} from '../../core/edit/payment/form';
import {getPublisherPayments, storePublisherPayment} from '../../../../../requests/supply/publisher/PublisherPayment';
import {PublisherPaymentsColumns} from '../../core/edit/payment/TableColumns';

interface Props {
    publisher: Publisher | null
}

const PublisherPayment: React.FC<Props> = ({publisher}) => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const krysApp = useKrysApp();

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleCreate = (e: any) => {
        // send API request to create the publisher payment
        storePublisherPayment(publisher, form).then(response => {
                if (axios.isAxiosError(response)) {
                    // we need to show the errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error message
                    setFormErrors([GenericErrorMessage])
                } else {
                    // we were able to store the publisher payment
                    krysApp.setAlert({
                        message: new AlertMessageGenerator('publisher payment details', Actions.CREATE, KrysToastType.SUCCESS).message,
                        type: KrysToastType.SUCCESS
                    });
                }
            }
        );
    };

    return (
        <KTCard className="card-bordered border-1">
            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={PaymentSchema} onSubmit={handleCreate}
                        enableReinitialize>
                    <Form onChange={onChangeHandler}>
                        <div className="mb-7">
                            <KrysFormLabel text="Beneficiary" isRequired={true}/>

                            <Field className="form-control fs-6" type="text"
                                   placeholder="Enter the beneficiary" name="beneficiary"/>

                            <div className="mt-1 text-danger">
                                <ErrorMessage name="beneficiary" className="mt-2"/>
                            </div>
                        </div>

                        <div className="mb-7">
                            <KrysFormLabel text="Account number" isRequired={true}/>

                            <Field className="form-control fs-6" type="text"
                                   placeholder="Enter the account number" name="account_number"/>

                            <div className="mt-1 text-danger">
                                <ErrorMessage name="account_number" className="mt-2"/>
                            </div>
                        </div>

                        <div className="mb-7">
                            <KrysFormLabel text="Swift code" isRequired={true}/>

                            <Field className="form-control fs-6" type="text"
                                   placeholder="Enter the swift code" name="swift_code"/>

                            <div className="mt-1 text-danger">
                                <ErrorMessage name="swift_code" className="mt-2"/>
                            </div>
                        </div>

                        <div className="mb-7">
                            <KrysFormLabel text="IBAN" isRequired={false}/>

                            <Field className="form-control fs-6" type="text"
                                   placeholder="Enter the iban" name="iban"/>

                            <div className="mt-1 text-danger">
                                <ErrorMessage name="iban" className="mt-2"/>
                            </div>
                        </div>

                        <div className="mb-7">
                            <KrysFormLabel text="Bank name" isRequired={true}/>

                            <Field className="form-control fs-6" type="text"
                                   placeholder="Enter the bank name" name="bank_name"/>

                            <div className="mt-1 text-danger">
                                <ErrorMessage name="bank_name" className="mt-2"/>
                            </div>
                        </div>


                        <div className="mb-7">
                            <KrysFormLabel text="Bank address" isRequired={false}/>

                            <Field className="form-control fs-6" type="text"
                                   placeholder="Enter the bank address" name="bank_address"/>

                            <div className="mt-1 text-danger">
                                <ErrorMessage name="bank_address" className="mt-2"/>
                            </div>
                        </div>

                        <KrysFormFooter cancelUrl={'/supply/publishers'}/>
                    </Form>
                </Formik>

                <div className="separator separator-dashed my-10"></div>

                <KrysIndex queryId={QUERIES.PUBLISHER_PAYMENTS_LIST}
                           requestFunction={getPublisherPayments}
                           columnsArray={PublisherPaymentsColumns}
                           table={'borderless'}
                           cardBodyClassNames={'p-0'}></KrysIndex>
            </KTCardBody>
        </KTCard>
    );
}

export default PublisherPayment;