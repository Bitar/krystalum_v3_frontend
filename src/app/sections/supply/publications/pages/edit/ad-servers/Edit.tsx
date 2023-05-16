import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import {Form, Formik} from 'formik';

import {KTCard, KTCardBody} from '../../../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../../../_metronic/helpers/components/KTCardHeader';

import {usePublication} from '../../../core/PublicationContext';
import {useKrysApp} from '../../../../../../modules/general/KrysApp';
import {PublicationAdServer} from '../../../../../../models/supply/publication/PublicationAdServer';
import {extractErrors} from '../../../../../../helpers/requests';
import {GenericErrorMessage, genericOnChangeHandler} from '../../../../../../helpers/form';
import {generatePageTitle} from '../../../../../../helpers/pageTitleGenerator';
import {Actions, KrysToastType, PageTypes} from '../../../../../../helpers/variables';
import {Sections} from '../../../../../../helpers/sections';
import {AlertMessageGenerator} from '../../../../../../helpers/AlertMessageGenerator';
import FormErrors from '../../../../../../components/forms/FormErrors';
import KrysFormFooter from '../../../../../../components/forms/KrysFormFooter';
import KrysFormLabel from '../../../../../../components/forms/KrysFormLabel';
import SingleSelect from '../../../../../../components/forms/SingleSelect';
import {
    getPublicationAdServer,
    updatePublicationAdServer
} from '../../../../../../requests/supply/publication/PublicationAdServer';
import {filterData} from '../../../../../../helpers/dataManipulation';
import {
    defaultPublicationAdServerEditFormFields,
    PublicationAdServerEditFormFields,
    publicationAdServerSchema
} from '../../../core/edit/ad-servers/form';
import {AdServer} from '../../../../../../models/misc/AdServer';
import {getAllAdServers} from '../../../../../../requests/misc/AdServer';

const PublicationAdServerEdit: React.FC = () => {
    const {publication} = usePublication();

    // get the publication and publication ad_server id
    const {cid} = useParams();

    const krysApp = useKrysApp();
    const navigate = useNavigate();

    const [publicationAdServer, setPublicationAdServer] = useState<PublicationAdServer | null>(null);
    const [form, setForm] = useState<PublicationAdServerEditFormFields>(defaultPublicationAdServerEditFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [adServers, setAdServers] = useState<AdServer[]>([]);

    const [isResourceLoaded, setIsResourceLoaded] = useState<boolean>(false)

    useEffect(() => {
        if (publication && cid) {
            // get the publication ad server we need to edit from the database
            getPublicationAdServer(publication, parseInt(cid)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch to edit so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    navigate('/error/400');
                } else {
                    // we were able to fetch current publication ad server to edit
                    setPublicationAdServer(response);

                    // we also set the form to be the publication ad server details
                    const {adServer, ...currentPublicationAdServer} = response;

                    setForm({...currentPublicationAdServer, ad_server_id: adServer.id});
                }
            });

            // get the ad servers
            getAllAdServers().then(response => {
                if (axios.isAxiosError(response)) {
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    setFormErrors([GenericErrorMessage])
                } else {
                    // if we were able to get the list of ad servers, then we fill our state with them
                    if (response.data) {
                        const excludedAdServersNames: string[] = publication.adServers ? publication.adServers?.map((adServer) => adServer.name) : [];

                        setAdServers(filterData(response.data, 'name', excludedAdServersNames));
                    }
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publication, cid]);

    useEffect(() => {
        if (publicationAdServer) {
            setIsResourceLoaded(true);

            krysApp.setPageTitle(generatePageTitle(Sections.SUPPLY_PUBLICATION_AD_SERVERS, PageTypes.EDIT, publicationAdServer.adServer.name))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publicationAdServer]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleEdit = () => {
        if (publication && publicationAdServer) {
            // we need to update the publication ad server's data by doing API call with form
            updatePublicationAdServer(publication, publicationAdServer.id, form).then(response => {
                if (axios.isAxiosError(response)) {
                    // show errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error
                    setFormErrors([GenericErrorMessage]);
                } else {
                    // we got the updated publication ad server so we're good
                    krysApp.setAlert({
                        message: new AlertMessageGenerator('publication ad server', Actions.EDIT, KrysToastType.SUCCESS).message,
                        type: KrysToastType.SUCCESS
                    })

                    navigate(`/supply/publications/${publication.id}/edit`);
                }
            });
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Publication Ad Server"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={publicationAdServerSchema(true)} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        ({errors}) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Ad Server" isRequired={true}/>

                                    <SingleSelect isResourceLoaded={isResourceLoaded} options={adServers}
                                                  defaultValue={publicationAdServer?.adServer} form={form}
                                                  setForm={setForm} name="ad_server_id" isClearable={true}
                                                  showHierarchy={true}/>

                                    <div className="mt-1 text-danger">
                                        {errors?.ad_server_id ? errors?.ad_server_id : null}
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={`/supply/publications/${publication?.id}/edit`}/>
                            </Form>
                        )}
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default PublicationAdServerEdit;