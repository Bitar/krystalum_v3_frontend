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
import {PublisherContactsColumns} from '../../core/edit/contact/TableColumns';
import {ContactSchema, defaultFormFields, FormFields} from '../../core/edit/contact/form';
import {
    getContactTypes,
    getPublisherContacts,
    storePublisherContact
} from '../../../../../requests/supply/publisher/PublisherContact';
import {ContactType} from '../../../../../models/supply/publisher/PublisherContact';
import {
    useQueryResponse
} from '../../../../../modules/table/QueryResponseProvider';
import KrysInnerTable from '../../../../../components/tables/KrysInnerTable';
import SearchFilter from '../../partials/SearchFilter';

interface Props {
    publisher: Publisher | null
}

const PublisherContact: React.FC<Props> = ({publisher}) => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [contactTypes, setContactTypes] = useState<ContactType[]>([]);

    const krysApp = useKrysApp();
    const {refetch} = useQueryResponse()

    useEffect(() => {
        if (publisher) {
            // get the contact types
            getContactTypes(publisher).then(response => {
                if (axios.isAxiosError(response)) {
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    setFormErrors([GenericErrorMessage])
                } else {
                    // if we were able to get the list of contact types, then we fill our state with them
                    if (response.data) {
                        setContactTypes(response.data);
                    }
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publisher]);


    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const selectChangeHandler = (e: any, key: string) => {
        genericSingleSelectOnChangeHandler(e, form, setForm, key);
    };

    const handleCreate = (e: any) => {
        // send API request to create the publisher contact
        storePublisherContact(publisher, form).then(response => {
                if (axios.isAxiosError(response)) {
                    // we need to show the errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error message
                    setFormErrors([GenericErrorMessage])
                } else {
                    // we were able to store the publisher contact
                    krysApp.setAlert({
                        message: new AlertMessageGenerator('publisher contact details', Actions.CREATE, KrysToastType.SUCCESS).message,
                        type: KrysToastType.SUCCESS
                    });

                    refetch();
                }
            }
        );
    };

    return (
        <KTCard className="card-bordered border-1">
            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={ContactSchema} onSubmit={handleCreate}
                        enableReinitialize>
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
                                    placeholder="Select a contact type"/>

                            <div className="mt-1 text-danger">
                                <ErrorMessage name="type" className="mt-2"/>
                            </div>
                        </div>

                        <div className="mb-7">
                            <KrysFormLabel text="Contact detail" isRequired={true}/>

                            <Field className="form-control fs-6" type="text"
                                   placeholder="Enter contact detail (address, email address or phone)" name="detail"/>

                            <div className="mt-1 text-danger">
                                <ErrorMessage name="detail" className="mt-2"/>
                            </div>
                        </div>

                        <KrysFormFooter cancelUrl={'/supply/publishers'}/>
                    </Form>
                </Formik>

                <div className="separator separator-dashed my-10"></div>

                {
                    publisher &&
                    <KrysInnerTable
                        SearchFilterComponent={SearchFilter}
                        queryId={QUERIES.PUBLISHER_CONTACTS_LIST}
                                    requestFunction={getPublisherContacts}
                                    requestId={publisher.id} columnsArray={PublisherContactsColumns}
                    ></KrysInnerTable>
                }
            </KTCardBody>
        </KTCard>
    );
}

export default PublisherContact;