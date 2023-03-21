import React, {useMemo, useState} from 'react';
import axios from 'axios';
import Select from 'react-select';

import {KTCard, KTCardBody, QUERIES} from '../../../../../../_metronic/helpers';

import FormErrors from '../../../../../components/forms/FormErrors';
import {GenericErrorMessage, genericOnChangeHandler} from '../../../../../helpers/form';
import {extractErrors} from '../../../../../helpers/requests';
import {AlertMessageGenerator} from '../../../../../helpers/alertMessageGenerator';
import {Actions, KrysToastType} from '../../../../../helpers/variables';
import {useKrysApp} from '../../../../../modules/general/KrysApp';
import {useAuth} from '../../../../../modules/auth';
import {Publisher} from '../../../../../models/supply/Publisher';
import {ContactSchema, defaultFormFields, FormFields, PublisherSchema} from '../../core/form';
import {
    EXPORT_ENDPOINT,
    getPublisherContacts,
    getPublishers,
    storePublisherContact
} from '../../../../../requests/supply/Publisher';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import KrysFormLabel from '../../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../../components/forms/KrysFormFooter';
import {
    QueryResponseProvider,
    useQueryResponseData,
    useQueryResponseLoading
} from '../../../../../modules/table/QueryResponseProvider';
import {ListViewProvider} from '../../../../../modules/table/ListViewProvider';
import {KTCardHeader} from '../../../../../../_metronic/helpers/components/KTCardHeader';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../../components/misc/CardAction';
import PublisherIndexFilter from '../../partials/IndexFilter';
import {QueryRequestProvider} from '../../../../../modules/table/QueryRequestProvider';
import {PublishersColumns} from '../../core/TableColumns';
import KrysTable from '../../../../../components/tables/KrysTable';
import {PublisherContactsColumns} from '../../core/edit/ContactTableColumns';

interface Props {
    publisher: Publisher | null
}

const PublisherContact: React.FC<Props> = ({publisher}) => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const krysApp = useKrysApp();
    const {logout} = useAuth()

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleStoreContact = (e: any) => {
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
                }
            }
        );
    };

    return (
        <KTCard className="card-bordered border-1">
            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={ContactSchema} onSubmit={handleStoreContact}
                        enableReinitialize>
                    <Form onChange={onChangeHandler}>
                        <div className="mb-7">
                            <KrysFormLabel text="Contact type" isRequired={true}/>

                            <Select name="type"
                                // options={types}
                                // getOptionLabel={(type) => type?.name}
                                // getOptionValue={(type) => type?.id.toString()}
                                // onChange={(e) => {
                                //     selectChangeHandler(e, 'tier')
                                // }}
                                    placeholder="Select contact type"
                                    isClearable={true}/>

                            <div className="mt-1 text-danger">
                                <ErrorMessage name="type" className="mt-2"/>
                            </div>
                        </div>

                        <div className="mb-7">
                            <KrysFormLabel text="Contact detail" isRequired={true}/>

                            <Field className="form-control fs-6" type="text"
                                   placeholder="Enter contact detail (address, email address or phone)" name="name"/>

                            <div className="mt-1 text-danger">
                                <ErrorMessage name="name" className="mt-2"/>
                            </div>
                        </div>

                        <KrysFormFooter cancelUrl={'/supply/publishers'}/>
                    </Form>
                </Formik>

                <div className="separator separator-dashed my-10"></div>

                <QueryRequestProvider>
                    <QueryResponseProvider id={QUERIES.PUBLISHER_CONTACTS_LIST} requestFunction={getPublisherContacts}>
                        <ListViewProvider>
                            <PublisherTable/>
                        </ListViewProvider>
                    </QueryResponseProvider>
                </QueryRequestProvider>
            </KTCardBody>
        </KTCard>
    );
}

const PublisherTable = () => {
    const publisherContacts = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => publisherContacts, [publisherContacts]);
    const columns = useMemo(() => PublisherContactsColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={publisherContacts.length > 0 ? publisherContacts[0] : null}
                   isLoading={isLoading}/>
    )
}
export default PublisherContact;