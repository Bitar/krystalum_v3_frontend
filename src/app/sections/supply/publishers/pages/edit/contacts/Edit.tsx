import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik} from 'formik';

import {usePublisher} from '../../../core/PublisherContext';
import {ContactType, PublisherContact} from '../../../../../../models/supply/publisher/PublisherContact';
import {useKrysApp} from '../../../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../../../helpers/sections';
import {Actions, KrysToastType, PageTypes} from '../../../../../../helpers/variables';
import {getContactTypes} from '../../../../../../requests/supply/Options';
import {extractErrors} from '../../../../../../helpers/requests';
import {
    GenericErrorMessage,
    genericOnChangeHandler
} from '../../../../../../helpers/form';
import {
    getPublisherContact,
    updatePublisherContact
} from '../../../../../../requests/supply/publisher/PublisherContact';
import {
    defaultPublisherContactFormFields,
    PublisherContactFormFields,
    PublisherContactSchema
} from '../../../core/edit/contacts/form';
import {KTCard, KTCardBody} from '../../../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../../../_metronic/helpers/components/KTCardHeader';
import {AlertMessageGenerator} from '../../../../../../helpers/AlertMessageGenerator';
import FormErrors from '../../../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../../../components/forms/KrysFormFooter';
import SingleSelect from '../../../../../../components/forms/SingleSelect';
import {getPublisher} from '../../../../../../requests/supply/publisher/Publisher';


const PublisherContactEdit: React.FC = () => {
    const {publisher, setPublisher} = usePublisher();

    const [publisherContact, setPublisherContact] = useState<PublisherContact | null>(null);
    const [form, setForm] = useState<PublisherContactFormFields>(defaultPublisherContactFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [isResourceLoaded, setIsResourceLoaded] = useState<boolean>(false)

    const [contactTypes, setContactTypes] = useState<ContactType[]>([]);

    const krysApp = useKrysApp();
    const navigate = useNavigate();

    // get the publisher and publisher contacts id
    let {id, cid} = useParams();

    useEffect(() => {
        if (!publisher && id) {
            // get the publisher we need to edit from the database
            getPublisher(parseInt(id)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch the publisher to edit so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    // unknown error occurred
                    navigate('/error/400');
                } else {
                    setPublisher(response);
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cid]);

    useEffect(() => {
        if (publisher && cid) {
            // get the publisher contacts we need to edit from the database
            getPublisherContact(publisher, parseInt(cid)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch the advertiser contacts to edit so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    navigate('/error/400');
                } else {
                    // we were able to fetch current publisher contacts to edit
                    setPublisherContact(response);

                    // we also set the form to be the publisher's contacts details
                    const {contactType, ...currentPublisherContact} = response;

                    setForm({...currentPublisherContact, type: contactType?.id});
                }
            });

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
        genericOnChangeHandler(e, form, setForm);
    };

    useEffect(() => {
        if (publisherContact) {
            setIsResourceLoaded(true);

            krysApp.setPageTitle(generatePageTitle(Sections.SUPPLY_PUBLISHER_CONTACTS, PageTypes.EDIT, publisherContact.contactType?.name))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publisherContact]);

    const handleEdit = () => {
        if (publisher && publisherContact) {
            // we need to update the contacts's data by doing API call with form
            updatePublisherContact(publisher, publisherContact.id, form).then(response => {
                if (axios.isAxiosError(response)) {
                    // show errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error
                    setFormErrors([GenericErrorMessage]);
                } else {
                    // we got the updated publisher contacts so we're good
                    krysApp.setAlert({
                        message: new AlertMessageGenerator('publisher contacts', Actions.EDIT, KrysToastType.SUCCESS).message,
                        type: KrysToastType.SUCCESS
                    })

                    navigate(`/supply/publishers/${publisher.id}/edit`);
                }
            });
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Publisher Contact"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={PublisherContactSchema} onSubmit={handleEdit}
                        enableReinitialize>
                    <Form onChange={onChangeHandler}>
                        <div className="mb-7">
                            <KrysFormLabel text="Contact type" isRequired={true}/>

                            <SingleSelect isResourceLoaded={isResourceLoaded} options={contactTypes}
                                          defaultValue={publisherContact?.contactType} form={form}
                                          setForm={setForm} name="type" isClearable={true}/>

                            <div className="mt-1 text-danger">
                                <ErrorMessage name="type" className="mt-2"/>
                            </div>
                        </div>

                        <div className="mb-7">
                            <KrysFormLabel text="Contact detail" isRequired={true}/>

                            <Field className="form-control fs-base" type="text"
                                   placeholder="Enter contact detail (address, email address or phone)" name="detail"/>

                            <div className="mt-1 text-danger">
                                <ErrorMessage name="detail" className="mt-2"/>
                            </div>
                        </div>

                        <KrysFormFooter cancelUrl={`/supply/publishers/${publisher?.id}/edit`}/>
                    </Form>
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default PublisherContactEdit;