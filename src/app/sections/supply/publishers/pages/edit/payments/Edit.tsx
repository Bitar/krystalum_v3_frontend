import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import {Field, Form, Formik} from 'formik';

import {usePublisher} from '../../../core/PublisherContext';
import {useKrysApp} from '../../../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../../../helpers/sections';
import {Actions, KrysToastType, PageTypes} from '../../../../../../helpers/variables';
import {extractErrors} from '../../../../../../helpers/requests';
import {
    GenericErrorMessage,
    genericOnChangeHandler
} from '../../../../../../helpers/form';
import {KTCard, KTCardBody} from '../../../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../../../_metronic/helpers/components/KTCardHeader';
import {AlertMessageGenerator} from '../../../../../../helpers/AlertMessageGenerator';
import FormErrors from '../../../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../../../components/forms/KrysFormFooter';
import {
    getPublisherPayment,
    updatePublisherPayment
} from '../../../../../../requests/supply/publisher/PublisherPayment';
import {PublisherPayment} from '../../../../../../models/supply/publisher/PublisherPayment';
import {
    defaultPublisherPaymentFormFields, fillEditForm,
    PublisherPaymentFormFields,
    PublisherPaymentSchema
} from '../../../core/edit/payments/form';


const PublisherPaymentEdit: React.FC = () => {
    const {publisher} = usePublisher();
    // get the publisher and publisher payments id
    const {cid} = useParams();

    const [publisherPayment, setPublisherPayment] = useState<PublisherPayment | null>(null);
    const [form, setForm] = useState<PublisherPaymentFormFields>(defaultPublisherPaymentFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const krysApp = useKrysApp();
    const navigate = useNavigate();

    useEffect(() => {
        if (publisher && cid) {
            // get the publisher payments we need to edit from the database
            getPublisherPayment(publisher, parseInt(cid)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch the advertiser contacts to edit, so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    navigate('/error/400');
                } else {
                    // we were able to fetch current publisher payments to edit
                    setPublisherPayment(response);

                    // we also set the form to be the publisher's payments details
                    setForm(fillEditForm(response));
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publisher, cid]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    useEffect(() => {
        if (publisherPayment) {
            krysApp.setPageTitle(generatePageTitle(Sections.SUPPLY_PUBLISHER_PAYMENTS, PageTypes.EDIT, publisherPayment.beneficiary))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publisherPayment]);

    const handleEdit = () => {
        if (publisher && publisherPayment) {
            // we need to update the payment's data by doing API call with form
            updatePublisherPayment(publisher, publisherPayment.id, form).then(response => {
                if (axios.isAxiosError(response)) {
                    // show errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error
                    setFormErrors([GenericErrorMessage]);
                } else {
                    // we got the updated publisher contacts so we're good
                    krysApp.setAlert({
                        message: new AlertMessageGenerator('publisher payments', Actions.EDIT, KrysToastType.SUCCESS).message,
                        type: KrysToastType.SUCCESS
                    })

                    navigate(`/supply/publishers/${publisher.id}/edit`);
                }
            });
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Publisher Payment"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={PublisherPaymentSchema} onSubmit={handleEdit}
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

                                <KrysFormFooter cancelUrl={`/supply/publishers/${publisher?.id}/edit`}/>
                            </Form>
                        )}
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default PublisherPaymentEdit;