import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import {Form, Formik} from 'formik';

import {KTCard, KTCardBody} from '../../../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../../../_metronic/helpers/components/KTCardHeader';

import {usePublication} from '../../../core/PublicationContext';
import {useKrysApp} from '../../../../../../modules/general/KrysApp';
import {PublicationTechnology} from '../../../../../../models/supply/publication/PublicationTechnology';
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
    getPublicationTechnology,
    updatePublicationTechnology
} from '../../../../../../requests/supply/publication/PublicationTechnology';
import {filterData} from '../../../../../../helpers/dataManipulation';
import {
    defaultPublicationTechnologyEditFormFields,
    PublicationTechnologyEditFormFields, publicationTechnologySchema
} from '../../../core/edit/technologies/form';
import {Technology} from '../../../../../../models/misc/Technology';
import {getAllTechnologies} from '../../../../../../requests/misc/Technology';

const PublicationTechnologyEdit: React.FC = () => {
    const {publication} = usePublication();

    // get the publication and publication ad_server id
    const {cid} = useParams();

    const krysApp = useKrysApp();
    const navigate = useNavigate();

    const [publicationTechnology, setPublicationTechnology] = useState<PublicationTechnology | null>(null);
    const [form, setForm] = useState<PublicationTechnologyEditFormFields>(defaultPublicationTechnologyEditFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [technologies, setTechnologies] = useState<Technology[]>([]);

    const [isResourceLoaded, setIsResourceLoaded] = useState<boolean>(false)

    useEffect(() => {
        if (publication && cid) {
            // get the publication technology we need to edit from the database
            getPublicationTechnology(publication, parseInt(cid)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch to edit so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    navigate('/error/400');
                } else {
                    // we were able to fetch current publication technology to edit
                    setPublicationTechnology(response);

                    // we also set the form to be the publication technology details
                    const {technology, ...currentPublicationTechnology} = response;

                    setForm({...currentPublicationTechnology, technology_id: technology.id});
                }
            });

            // get the technologies
            getAllTechnologies().then(response => {
                if (axios.isAxiosError(response)) {
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    setFormErrors([GenericErrorMessage])
                } else {
                    // if we were able to get the list of technologies, then we fill our state with them
                    if (response.data) {
                        const excludedTechnologiesNames: string[] = publication.technologies ? publication.technologies?.map((technology) => technology.name) : [];

                        setTechnologies(filterData(response.data, 'name', excludedTechnologiesNames));
                    }
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publication, cid]);

    useEffect(() => {
        if (publicationTechnology) {
            setIsResourceLoaded(true);

            krysApp.setPageTitle(generatePageTitle(Sections.SUPPLY_PUBLICATION_TECHNOLOGIES, PageTypes.EDIT, publicationTechnology.technology.name))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publicationTechnology]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleEdit = () => {
        if (publication && publicationTechnology) {
            // we need to update the publication technology's data by doing API call with form
            updatePublicationTechnology(publication, publicationTechnology.id, form).then(response => {
                if (axios.isAxiosError(response)) {
                    // show errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error
                    setFormErrors([GenericErrorMessage]);
                } else {
                    // we got the updated publication technology so we're good
                    krysApp.setAlert({
                        message: new AlertMessageGenerator('publication technology', Actions.EDIT, KrysToastType.SUCCESS).message,
                        type: KrysToastType.SUCCESS
                    })

                    navigate(`/supply/publications/${publication.id}/edit`);
                }
            });
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Publication Technology"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={publicationTechnologySchema(true)} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        ({errors}) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Technology" isRequired={true}/>

                                    <SingleSelect isResourceLoaded={isResourceLoaded} options={technologies}
                                                  defaultValue={publicationTechnology?.technology} form={form}
                                                  setForm={setForm} name="technology_id" isClearable={true}
                                                  showHierarchy={true}/>

                                    <div className="mt-1 text-danger">
                                        {errors?.technology_id ? errors?.technology_id : null}
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

export default PublicationTechnologyEdit;