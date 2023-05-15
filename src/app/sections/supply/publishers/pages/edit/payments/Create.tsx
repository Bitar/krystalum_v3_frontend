import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Field, Form, Formik} from 'formik';

import {KTCard, KTCardBody, QUERIES} from '../../../../../../../_metronic/helpers';

import {usePublisher} from '../../../core/PublisherContext';
import {useKrysApp} from '../../../../../../modules/general/KrysApp';
import {extractErrors} from '../../../../../../helpers/requests';
import {
    GenericErrorMessage,
    genericOnChangeHandler
} from '../../../../../../helpers/form';
import {AlertMessageGenerator} from '../../../../../../helpers/AlertMessageGenerator';
import {Actions, KrysToastType} from '../../../../../../helpers/variables';
import {KTCardHeader} from '../../../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../../../components/forms/KrysFormFooter';
import KrysInnerTable from '../../../../../../components/tables/KrysInnerTable';
import {
    defaultPublisherPaymentFormFields,
    PublisherPaymentFormFields,
    PublisherPaymentSchema
} from '../../../core/edit/payments/form';
import {
    getPublisherPayments,
    storePublisherPayment
} from '../../../../../../requests/supply/publisher/PublisherPayment';
import {PublisherPaymentsColumns} from '../../../core/edit/payments/TableColumns';

const PublisherPaymentCreate: React.FC = () => {
    const {publisher} = usePublisher();

    const [form, setForm] = useState<PublisherPaymentFormFields>(defaultPublisherPaymentFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [refreshTable, setRefreshTable] = useState<boolean>(false);

    const krysApp = useKrysApp();

    useEffect(() => {
        if (publisher) {

        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publisher]);

    const onChangeHandler = (e: any) => {
        // as long as we are updating the create form, we should set the table refresh to false
        setRefreshTable(false);

        genericOnChangeHandler(e, form, setForm);
    };

    const handleCreate = () => {
        if (publisher) {
            // send API request to create the publisher payments
            storePublisherPayment(publisher, form).then(response => {
                    if (axios.isAxiosError(response)) {
                        // we need to show the errors
                        setFormErrors(extractErrors(response));
                    } else if (response === undefined) {
                        // show generic error message
                        setFormErrors([GenericErrorMessage])
                    } else {
                        // we were able to store the publisher payments
                        krysApp.setAlert({
                            message: new AlertMessageGenerator('publisher payments details', Actions.CREATE, KrysToastType.SUCCESS).message,
                            type: KrysToastType.SUCCESS
                        });

                        // now that we have a new record successfully we need to refresh the table
                        setRefreshTable(true);

                        // we need to clear the form data
                        setForm(defaultPublisherPaymentFormFields);

                        // we need to clear the form data
                        setFormErrors([]);
                    }
                }
            );
        }
    };

    return (
        <KTCard className="card-bordered border-1">
            <KTCardHeader text="Add New Payment"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={PublisherPaymentSchema} onSubmit={handleCreate}
                        enableReinitialize>
                    {
                        ({errors}) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Beneficiary" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter the beneficiary" name="beneficiary"/>

                                    <div className="mt-1 text-danger">
                                        {errors?.beneficiary ? errors?.beneficiary : null}
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Account number" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter the account number" name="account_number"/>

                                    <div className="mt-1 text-danger">
                                        {errors?.account_number ? errors?.account_number : null}
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Swift code" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter the swift code" name="swift_code"/>

                                    <div className="mt-1 text-danger">
                                        {errors?.swift_code ? errors?.swift_code : null}
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="IBAN" isRequired={false}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter the iban" name="iban"/>

                                    <div className="mt-1 text-danger">
                                        {errors?.iban ? errors?.iban : null}
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Bank name" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter the bank name" name="bank_name"/>

                                    <div className="mt-1 text-danger">
                                        {errors?.bank_name ? errors?.bank_name : null}
                                    </div>
                                </div>


                                <div className="mb-7">
                                    <KrysFormLabel text="Bank address" isRequired={false}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter the bank address" name="bank_address"/>

                                    <div className="mt-1 text-danger">
                                        {errors?.bank_address ? errors?.bank_address : null}
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/supply/publishers'}/>
                            </Form>
                        )}
                </Formik>

                <div className="separator separator-dashed my-10"></div>

                {
                    publisher &&
                    <KrysInnerTable
                        doRefetch={refreshTable}
                        slug="publisher-payments"
                        queryId={QUERIES.PUBLISHER_PAYMENTS_LIST}
                        requestFunction={getPublisherPayments}
                        requestId={publisher.id}
                        columnsArray={PublisherPaymentsColumns}
                    ></KrysInnerTable>
                }
            </KTCardBody>
        </KTCard>
    );
}

export default PublisherPaymentCreate;