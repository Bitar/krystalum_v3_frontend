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
import KrysIndex from '../../../../../components/tables/KrysIndex';
import {defaultFormFields, FormFields, PaymentSchema} from '../../core/edit/payment/form';
import {getPublisherPayments, storePublisherPayment} from '../../../../../requests/supply/publisher/PublisherPayment';
import {PublisherPaymentsColumns} from '../../core/edit/payment/TableColumns';
import {
    getPublisherAccountManagers,
    storePublisherAccountManager
} from '../../../../../requests/supply/publisher/PublisherAccountManager';
import {AccountManagerSchema} from '../../core/edit/account-manager/form';
import {PublisherAccountManagersColumns} from '../../core/edit/account-manager/TableColumns';
import {User} from '../../../../../models/iam/User';

interface Props {
    publisher: Publisher | null
}

const PublisherAccountManager: React.FC<Props> = ({publisher}) => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [accountManagers, setAccountManagers] = useState<User[]>([]);

    const krysApp = useKrysApp();

    const selectChangeHandler = (e: any, key: string) => {
        genericSingleSelectOnChangeHandler(e, form, setForm, key);
    };

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleCreate = (e: any) => {
        // send API request to create the publisher account manager
        storePublisherAccountManager(publisher, form).then(response => {
                if (axios.isAxiosError(response)) {
                    // we need to show the errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error message
                    setFormErrors([GenericErrorMessage])
                } else {
                    // we were able to store the publisher account manager
                    krysApp.setAlert({
                        message: new AlertMessageGenerator('publisher account manager', Actions.CREATE, KrysToastType.SUCCESS).message,
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

                <Formik initialValues={form} validationSchema={AccountManagerSchema} onSubmit={handleCreate}
                        enableReinitialize>
                    <Form onChange={onChangeHandler}>
                        <div className="mb-7">
                            <KrysFormLabel text="Account manager" isRequired={true}/>

                            <Select name="user_id"
                                    options={accountManagers}
                                    getOptionLabel={(accountManager) => accountManager.name}
                                    getOptionValue={(accountManager) => accountManager.id.toString()}
                                    onChange={(e) => {
                                        selectChangeHandler(e, 'user_id')
                                    }}
                                    placeholder="Select an account manager"/>

                            <div className="mt-1 text-danger">
                                <ErrorMessage name="user_id" className="mt-2"/>
                            </div>
                        </div>

                        <KrysFormFooter cancelUrl={'/supply/publishers'}/>
                    </Form>
                </Formik>

                <div className="separator separator-dashed my-10"></div>

                {/*<KrysIndex queryId={QUERIES.PUBLISHER_ACCOUNT_MANAGERS_LIST}*/}
                {/*           requestFunction={() => getPublisherAccountManagers(publisher)}*/}
                {/*           columnsArray={PublisherAccountManagersColumns}*/}
                {/*           table={'borderless'}*/}
                {/*           cardBodyClassNames={'p-0'}></KrysIndex>*/}
            </KTCardBody>
        </KTCard>
    );
}

export default PublisherAccountManager;