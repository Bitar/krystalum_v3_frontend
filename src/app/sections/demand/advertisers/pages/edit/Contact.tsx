import React, {useState} from 'react';
import {KTCard, KTCardBody, QUERIES} from '../../../../../../_metronic/helpers';
import FormErrors from '../../../../../components/forms/FormErrors';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {
    defaultUpdateContactsFormFields, UpdateContactsFormFields,
    UpdateContactsSchema
} from '../../core/form';
import KrysFormLabel from '../../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../../components/forms/KrysFormFooter';
import {GenericErrorMessage, genericOnChangeHandler} from '../../../../../helpers/form';
import {useAdvertiser} from '../../core/AdvertiserContext';
import axios from 'axios';
import {extractErrors} from '../../../../../helpers/requests';
import {AlertMessageGenerator} from '../../../../../helpers/alertMessageGenerator';
import {Actions, KrysToastType} from '../../../../../helpers/variables';
import {getAdvertiserContacts, storeAdvertiserContact} from '../../../../../requests/demand/AdvertiserContact';
import {useKrysApp} from '../../../../../modules/general/KrysApp';
import {KTCardHeader} from '../../../../../../_metronic/helpers/components/KTCardHeader';
import KrysInnerTable from '../../../../../components/tables/KrysInnerTable';
import {AdvertiserContactsColumns} from '../../core/edit/contacts/TableColumns';
import KrysTableSearchFilter from '../../../../../components/tables/KrysTableSearchFilter';

const AdvertiserContactEdit: React.FC = () => {
    const {advertiser} = useAdvertiser();

    const [form, setForm] = useState<UpdateContactsFormFields>(defaultUpdateContactsFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const krysApp = useKrysApp();

    const onChangeHandler = (e: any) => {
        // in case of multi select, the element doesn't have a name because
        // we get only a list of values from the select and not an element with target value and name
        genericOnChangeHandler(e, form, setForm);
    };

    const handleCreate = (e: any) => {
        if (advertiser) {
            // send API request to create the advertiser
            storeAdvertiserContact(advertiser, form).then(response => {
                    if (axios.isAxiosError(response)) {
                        // we need to show the errors
                        setFormErrors(extractErrors(response));
                    } else if (response === undefined) {
                        // show generic error message
                        setFormErrors([GenericErrorMessage])
                    } else {
                        // we were able to store the advertiser
                        krysApp.setAlert({
                            message: new AlertMessageGenerator('advertiser contact', Actions.CREATE, KrysToastType.SUCCESS).message,
                            type: KrysToastType.SUCCESS
                        });

                        // TODO we need to refresh the table

                        // we need to clear the form data
                        setForm(defaultUpdateContactsFormFields);
                    }
                }
            );
        }
    };

    return (
        <KTCard className='card-bordered border-1'>
            <KTCardHeader text='Add New Contact'/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={UpdateContactsSchema} onSubmit={handleCreate}
                        enableReinitialize>
                    {
                        (formik) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Contact person name" isRequired={false}/>

                                    <Field className="form-control fs-6" type="text"
                                           placeholder="Enter full name of contact person" name="contact_name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="contact_name" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Agency name" isRequired={false}/>

                                    <Field className="form-control fs-6" type="text"
                                           placeholder="Enter agency name" name="agency_name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="agency_name" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Contact information" isRequired={true}/>

                                    <Field className="form-control fs-6" type="text"
                                           placeholder="E.g. email address, phone number, physical address"
                                           name="contact_info"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="contact_info" className="mt-2"/>
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/demand/advertisers'}/>
                            </Form>
                        )
                    }
                </Formik>

                <div className="separator separator-dashed my-10"></div>

                {
                    advertiser ? <KrysInnerTable
                        slug="advertiser-contacts"
                        queryId={QUERIES.ADVERTISER_CONTACTS_LIST}
                        requestFunction={getAdvertiserContacts}
                        requestId={advertiser.id} columnsArray={AdvertiserContactsColumns}
                    ></KrysInnerTable> : <></>
                }

            </KTCardBody>
        </KTCard>
    );
};

export default AdvertiserContactEdit;