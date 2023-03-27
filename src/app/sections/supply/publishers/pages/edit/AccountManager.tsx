import React, {useEffect, useRef, useState} from 'react';
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
import {AlertMessageGenerator} from '../../../../../helpers/AlertMessageGenerator';
import {Actions, KrysToastType} from '../../../../../helpers/variables';
import {useKrysApp} from '../../../../../modules/general/KrysApp';
import {ErrorMessage, Form, Formik} from 'formik';
import KrysFormLabel from '../../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../../components/forms/KrysFormFooter';
import {defaultFormFields, FormFields} from '../../core/edit/payment/form';
import {
    getAccountManagers,
    getPublisherAccountManagers,
    storePublisherAccountManager
} from '../../../../../requests/supply/publisher/PublisherAccountManager';
import {AccountManagerSchema} from '../../core/edit/account-manager/form';
import {User} from '../../../../../models/iam/User';
import {usePublisher} from '../../core/PublisherContext';
import {KTCardHeader} from '../../../../../../_metronic/helpers/components/KTCardHeader';
import KrysInnerTable from '../../../../../components/tables/KrysInnerTable';
import {PublisherAccountManagersColumns} from '../../core/edit/account-manager/TableColumns';

const PublisherAccountManager: React.FC = () => {
    const {publisher, refetchOptions, setRefetchOptions} = usePublisher();

    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [refreshTable, setRefreshTable] = useState<boolean>(false);

    const [accountManagers, setAccountManagers] = useState<User[]>([]);

    const accountManagersSelectRef = useRef<any>(null);

    const krysApp = useKrysApp();

    useEffect(() => {
        if (publisher) {
            setRefetchOptions(false);

            // get the users (account managers)
            getAccountManagers(publisher).then(response => {
                if (axios.isAxiosError(response)) {
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    setFormErrors([GenericErrorMessage])
                } else {
                    // if we were able to get the list of s (account managers), then we fill our state with them
                    if (response.data) {
                        setAccountManagers(response.data);
                    }
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publisher, refetchOptions]); // I added the refetchOptions here in order to update the contact
    // types dropdown when a new publisher contact type is stored or deleted

    const selectChangeHandler = (e: any, key: string) => {
        genericSingleSelectOnChangeHandler(e, form, setForm, key);
    };

    const onChangeHandler = (e: any) => {
        // as long as we are updating the create form, we should set the table refresh to false
        setRefreshTable(false);

        genericOnChangeHandler(e, form, setForm);
    };

    const handleCreate = (e: any) => {
        if (publisher) {
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

                        // now that we have a new record successfully we need to refresh the table
                        setRefreshTable(true);

                        // now that we have a new record successfully we need to refresh the contact types dropdown
                        setRefetchOptions(true);

                        // clear the selected values from dropdown
                        accountManagersSelectRef.current?.clearValue();

                        // we need to clear the form data
                        setForm(defaultFormFields);
                    }
                }
            );
        }
    };

    return (
        <KTCard className="card-bordered border-1">
            <KTCardHeader text="Add New Account Manager"/>

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
                                    placeholder="Select an account manager"
                                    isClearable={true}
                                    ref={accountManagersSelectRef}/>

                            <div className="mt-1 text-danger">
                                <ErrorMessage name="user_id" className="mt-2"/>
                            </div>
                        </div>

                        <KrysFormFooter cancelUrl={'/supply/publishers'}/>
                    </Form>
                </Formik>

                <div className="separator separator-dashed my-10"></div>

                {
                    publisher &&
                    <KrysInnerTable
                        doRefetch={refreshTable}
                        slug="publisher-account-managers"
                        queryId={QUERIES.PUBLISHER_ACCOUNT_MANAGERS_LIST}
                        requestFunction={getPublisherAccountManagers}
                        requestId={publisher.id}
                        columnsArray={PublisherAccountManagersColumns}
                    ></KrysInnerTable>
                }
            </KTCardBody>
        </KTCard>
    );
}

export default PublisherAccountManager;