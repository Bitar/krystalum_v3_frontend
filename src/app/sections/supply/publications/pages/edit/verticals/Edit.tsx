import axios from 'axios';
import {Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {KTCard, KTCardBody} from '../../../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../../../components/forms/FormErrors';
import KrysFormFooter from '../../../../../../components/forms/KrysFormFooter';
import KrysFormLabel from '../../../../../../components/forms/KrysFormLabel';
import KrysSwitch from '../../../../../../components/forms/KrysSwitch';
import SingleSelect from '../../../../../../components/forms/SingleSelect';
import {AlertMessageGenerator} from '../../../../../../helpers/AlertMessageGenerator';
import {filterData} from '../../../../../../helpers/dataManipulation';
import {GenericErrorMessage, genericOnChangeHandler} from '../../../../../../helpers/form';
import {generatePageTitle} from '../../../../../../helpers/pageTitleGenerator';
import {extractErrors} from '../../../../../../helpers/requests';
import {Sections} from '../../../../../../helpers/sections';
import {Actions, KrysToastType, PageTypes} from '../../../../../../helpers/variables';
import {Vertical} from '../../../../../../models/misc/Vertical';
import {PublicationVertical} from '../../../../../../models/supply/publication/PublicationVertical';
import {useKrysApp} from '../../../../../../modules/general/KrysApp';
import {
    getPublicationVertical,
    updatePublicationVertical
} from '../../../../../../requests/supply/publication/PublicationVertical';
import {
    defaultPublicationVerticalEditFormFields,
    PublicationVerticalEditFormFields,
    publicationVerticalSchema
} from '../../../core/edit/verticals/form';
import {usePublication} from '../../../core/PublicationContext';

const PublicationVerticalEdit: React.FC = () => {
    const {cid} = useParams();

    const {publication, verticals} = usePublication();
    const krysApp = useKrysApp();

    const navigate = useNavigate();

    const [form, setForm] = useState<PublicationVerticalEditFormFields>(defaultPublicationVerticalEditFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [isResourceLoaded, setIsResourceLoaded] = useState<boolean>(false)

    const [publicationVertical, setPublicationVertical] = useState<PublicationVertical | null>(null);
    const [filteredVerticals, setFilteredVerticals] = useState<Vertical[]>([]);

    useEffect(() => {
        if (publication && cid) {
            // get the publication vertical we need to edit from the database
            getPublicationVertical(publication, parseInt(cid)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch to edit so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    navigate('/error/400');
                } else {
                    // we were able to fetch current publication vertical to edit
                    setPublicationVertical(response);

                    // we also set the form to be the publication vertical details
                    const {vertical, ...currentPublicationVertical} = response;

                    setForm({...currentPublicationVertical, vertical_id: vertical.id});
                }
            });

            const excludedVerticalsNames: string[] = publication.verticals ? publication.verticals?.map((vertical) => vertical.vertical.name) : [];

            setFilteredVerticals(filterData(verticals, 'name', excludedVerticalsNames));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publication, cid]);

    useEffect(() => {
        if (publicationVertical) {
            setIsResourceLoaded(true);

            krysApp.setPageTitle(generatePageTitle(Sections.SUPPLY_PUBLICATION_VERTICALS, PageTypes.EDIT, `${publication?.name} - ${publicationVertical.vertical.name}`))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publicationVertical]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleEdit = () => {
        if (publication && publicationVertical) {
            // we need to update the publication vertical's data by doing API call with form
            updatePublicationVertical(publication, publicationVertical.id, form).then(response => {
                if (axios.isAxiosError(response)) {
                    // show errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error
                    setFormErrors([GenericErrorMessage]);
                } else {
                    // we got the updated publication vertical so we're good
                    krysApp.setAlert({
                        message: new AlertMessageGenerator('publication vertical', Actions.EDIT, KrysToastType.SUCCESS).message,
                        type: KrysToastType.SUCCESS
                    })

                    navigate(`/supply/publications/${publication.id}/edit`);
                }
            });
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Publication Vertical"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={publicationVerticalSchema(true)} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        ({errors}) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Vertical" isRequired={true}/>

                                    <SingleSelect isResourceLoaded={isResourceLoaded} options={filteredVerticals}
                                                  defaultValue={publicationVertical?.vertical} form={form}
                                                  setForm={setForm} name="vertical_id" isClearable={true}
                                                  showHierarchy={true}/>

                                    <div className="mt-1 text-danger">
                                        {errors?.vertical_id ? errors?.vertical_id : null}
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Is primary?" isRequired={true}/>

                                    <KrysSwitch name="is_primary" onChangeHandler={(e) => {
                                        e.stopPropagation();
                                        setForm({...form, is_primary: Number(!form.is_primary)});
                                    }} defaultValue={Boolean(form.is_primary)} disabled={Boolean(form.is_primary)}/>

                                    {
                                        Boolean(publicationVertical?.is_primary) ?
                                            <div className="mb-4">
                                                <span className="text-muted">Since this vertical is already set as the primary vertical, it cannot be changed to false until you set another vertical as the primary one.</span>
                                            </div> : <></>
                                    }

                                    <div className="mt-1 text-danger">
                                        {errors?.is_primary ? errors?.is_primary : null}
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

export default PublicationVerticalEdit;