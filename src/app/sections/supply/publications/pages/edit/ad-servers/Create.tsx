import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Form, Formik} from 'formik';
import Select from 'react-select';

import {KTCard, KTCardBody, QUERIES} from '../../../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../../../_metronic/helpers/components/KTCardHeader';

import {useKrysApp} from '../../../../../../modules/general/KrysApp';
import {extractErrors} from '../../../../../../helpers/requests';
import {
    GenericErrorMessage,
    genericOnChangeHandler, genericSingleSelectOnChangeHandler
} from '../../../../../../helpers/form';
import {AlertMessageGenerator} from '../../../../../../helpers/AlertMessageGenerator';
import {Actions, KrysToastType} from '../../../../../../helpers/variables';
import FormErrors from '../../../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../../../components/forms/KrysFormFooter';
import KrysInnerTable from '../../../../../../components/tables/KrysInnerTable';
import {
    getPublicationAdServers,
    storePublicationAdServer
} from '../../../../../../requests/supply/publication/PublicationAdServer';
import {usePublication} from '../../../core/PublicationContext';
import {
    defaultPublicationAdServerFormFields,
    PublicationAdServerFormFields,
    PublicationAdServerSchema
} from '../../../core/edit/ad-servers/form';
import {PublicationAdServersColumns} from '../../../core/edit/ad-servers/TableColumns';
import {getAllAdServers} from '../../../../../../requests/misc/AdServer';
import {AdServer} from '../../../../../../models/misc/AdServer';


const PublicationAdServerCreate: React.FC = () => {
    const {publication} = usePublication();

    const [form, setForm] = useState<PublicationAdServerFormFields>(defaultPublicationAdServerFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [refreshTable, setRefreshTable] = useState<boolean>(false);

    const [adServers, setAdServers] = useState<AdServer[]>([]);

    const krysApp = useKrysApp();

    useEffect(() => {
        if (publication) {
            // get the adServers
            getAllAdServers().then(response => {
                if (axios.isAxiosError(response)) {
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    setFormErrors([GenericErrorMessage])
                } else {
                    // if we were able to get the list of adServers, then we fill our state with them
                    if (response.data) {
                        setAdServers(response.data);
                    }
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publication]);

    const selectChangeHandler = (e: any, key: string) => {
        genericSingleSelectOnChangeHandler(e, form, setForm, key);
    };

    const onChangeHandler = (e: any) => {
        // as long as we are updating the create form, we should set the table refresh to false
        setRefreshTable(false);

        genericOnChangeHandler(e, form, setForm);
    };

    const handleCreate = () => {
        if (publication) {
            // send API request to create the publication payments
            storePublicationAdServer(publication, form).then(response => {
                    if (axios.isAxiosError(response)) {
                        // we need to show the errors
                        setFormErrors(extractErrors(response));
                    } else if (response === undefined) {
                        // show generic error message
                        setFormErrors([GenericErrorMessage])
                    } else {
                        // we were able to store the publication payments
                        krysApp.setAlert({
                            message: new AlertMessageGenerator('publication ad server', Actions.CREATE, KrysToastType.SUCCESS).message,
                            type: KrysToastType.SUCCESS
                        });

                        // now that we have a new record successfully we need to refresh the table
                        setRefreshTable(true);

                        // we need to clear the form data
                        setForm(defaultPublicationAdServerFormFields);

                        // we need to clear the form data
                        setFormErrors([]);
                    }
                }
            );
        }
    };

    return (
        <KTCard className="card-bordered border-1">
            <KTCardHeader text="Add New AdServer"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={PublicationAdServerSchema} onSubmit={handleCreate}
                        enableReinitialize>
                    {
                        ({errors}) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Ad server" isRequired={true}/>

                                    <Select name="ad_server_id"
                                            menuPlacement={'top'}
                                            options={adServers}
                                            getOptionLabel={(adServer) => adServer?.name}
                                            getOptionValue={(adServer) => adServer?.id.toString()}
                                            onChange={(e) => {
                                                selectChangeHandler(e, 'ad_server_id')
                                            }}
                                            placeholder="Select a ad server"
                                            isClearable={true}/>

                                    <div className="mt-1 text-danger">
                                        {errors?.ad_server_id ? errors?.ad_server_id : null}
                                    </div>
                                </div>

                                {/*TODO*/}

                                <KrysFormFooter cancelUrl={'/supply/publications'}/>
                            </Form>
                        )}
                </Formik>

                <div className="separator separator-dashed my-10"></div>

                {
                    publication &&
                    <KrysInnerTable
                        doRefetch={refreshTable}
                        slug="publication-ad-servers"
                        queryId={QUERIES.PUBLICATION_AD_SERVERS_LIST}
                        requestFunction={getPublicationAdServers}
                        requestId={publication.id}
                        columnsArray={PublicationAdServersColumns}
                    ></KrysInnerTable>
                }
            </KTCardBody>
        </KTCard>
    );
}

export default PublicationAdServerCreate;