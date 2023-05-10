import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import Select from 'react-select';
import {Field, Form, Formik} from 'formik';

import {KTCard, KTCardBody, QUERIES} from '../../../../../../../_metronic/helpers';

import {usePublisher} from '../../../core/PublisherContext';
import {
    defaultPublisherContactFormFields,
    PublisherContactFormFields,
    PublisherContactSchema
} from '../../../core/edit/contacts/form';
import {useKrysApp} from '../../../../../../modules/general/KrysApp';
import {getContactTypes} from '../../../../../../requests/supply/Options';
import {extractErrors} from '../../../../../../helpers/requests';
import {
    GenericErrorMessage,
    genericOnChangeHandler,
    genericSingleSelectOnChangeHandler
} from '../../../../../../helpers/form';
import {
    getPublisherContacts,
    storePublisherContact
} from '../../../../../../requests/supply/publisher/PublisherContact';
import {AlertMessageGenerator} from '../../../../../../helpers/AlertMessageGenerator';
import {Actions, KrysToastType} from '../../../../../../helpers/variables';
import {KTCardHeader} from '../../../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../../../components/forms/KrysFormFooter';
import KrysInnerTable from '../../../../../../components/tables/KrysInnerTable';
import {PublisherContactsColumns} from '../../../core/edit/contacts/TableColumns';
import {ContactType} from '../../../../../../models/supply/Options';

const PublisherContactCreate: React.FC = () => {
    const {publisher} = usePublisher();
    const krysApp = useKrysApp();

    const [form, setForm] = useState<PublisherContactFormFields>(defaultPublisherContactFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [contactTypes, setContactTypes] = useState<ContactType[]>([]);

    const [refreshTable, setRefreshTable] = useState<boolean>(false);

    const contactTypesSelectRef = useRef<any>(null);

    useEffect(() => {
        if (publisher) {
            // get the contacts types
            getContactTypes().then(response => {
                if (axios.isAxiosError(response)) {
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    setFormErrors([GenericErrorMessage])
                } else {
                    // if we were able to get the list of contacts types, then we fill our state with them
                    if (response.data) {
                        setContactTypes(response.data);
                    }
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publisher]);

    const onChangeHandler = (e: any) => {
        // as long as we are updating the create form, we should set the table refresh to false
        setRefreshTable(false);

        genericOnChangeHandler(e, form, setForm);
    };

    const selectChangeHandler = (e: any, key: string) => {
        genericSingleSelectOnChangeHandler(e, form, setForm, key);
    };

    const handleCreate = () => {
        if (publisher) {
            // send API request to create the publisher contacts
            storePublisherContact(publisher, form).then(response => {
                    if (axios.isAxiosError(response)) {
                        // we need to show the errors
                        setFormErrors(extractErrors(response));
                    } else if (response === undefined) {
                        // show generic error message
                        setFormErrors([GenericErrorMessage])
                    } else {
                        // we were able to store the publisher contacts
                        krysApp.setAlert({
                            message: new AlertMessageGenerator('publisher contacts details', Actions.CREATE, KrysToastType.SUCCESS).message,
                            type: KrysToastType.SUCCESS
                        });

                        // now that we have a new record successfully we need to refresh the table
                        setRefreshTable(true);

                        // clear the selected values from dropdown
                        contactTypesSelectRef.current?.clearValue();

                        // we need to clear the form data
                        setForm(defaultPublisherContactFormFields);

                        // we need to clear the form data
                        setFormErrors([]);
                    }
                }
            );
        }
    };

    return (
        <KTCard className="card-bordered border-1">
            <KTCardHeader text="Add New Contact"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={PublisherContactSchema} onSubmit={handleCreate}
                        enableReinitialize>
                    {
                        ({errors}) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Contact type" isRequired={true}/>

                                    <Select name="type"
                                            options={contactTypes}
                                            getOptionLabel={(contactType) => contactType.name}
                                            getOptionValue={(contactType) => contactType.id.toString()}
                                            onChange={(e) => {
                                                selectChangeHandler(e, 'type')
                                            }}
                                            placeholder="Select a contact type"
                                            isClearable={true}
                                            ref={contactTypesSelectRef}/>

                                    <div className="mt-1 text-danger">
                                        {errors?.type ? errors?.type : null}
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Contact detail" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter contact detail (address, email address or phone)"
                                           name="detail"/>

                                    <div className="mt-1 text-danger">
                                        {errors?.detail ? errors?.detail : null}
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
                        slug="publisher-contacts"
                        queryId={QUERIES.PUBLISHER_CONTACTS_LIST}
                        requestFunction={getPublisherContacts}
                        requestId={publisher.id}
                        columnsArray={PublisherContactsColumns}
                    ></KrysInnerTable>
                }
            </KTCardBody>
        </KTCard>
    );
}

export default PublisherContactCreate;