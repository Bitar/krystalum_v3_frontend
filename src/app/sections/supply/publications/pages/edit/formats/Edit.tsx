import axios from 'axios';
import {Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {KTCard, KTCardBody} from '../../../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../../../components/forms/FormErrors';
import KrysFormFooter from '../../../../../../components/forms/KrysFormFooter';
import KrysFormLabel from '../../../../../../components/forms/KrysFormLabel';
import SingleSelect from '../../../../../../components/forms/SingleSelect';
import {AlertMessageGenerator} from '../../../../../../helpers/AlertMessageGenerator';
import {GenericErrorMessage, genericOnChangeHandler} from '../../../../../../helpers/form';
import {generatePageTitle} from '../../../../../../helpers/pageTitleGenerator';
import {extractErrors} from '../../../../../../helpers/requests';
import {Sections} from '../../../../../../helpers/sections';
import {Actions, KrysToastType, PageTypes} from '../../../../../../helpers/variables';
import {FormatType} from '../../../../../../models/supply/Options';
import {PublicationFormat} from '../../../../../../models/supply/publication/PublicationFormat';
import {useKrysApp} from '../../../../../../modules/general/KrysApp';
import {getFormatTypes} from '../../../../../../requests/supply/Options';
import {
    getPublicationFormat,
    updatePublicationFormat
} from '../../../../../../requests/supply/publication/PublicationFormat';
import {
    defaultPublicationFormatEditFormFields,
    PublicationFormatEditFormFields,
    publicationFormatSchema,
} from '../../../core/edit/formats/form';
import {usePublication} from '../../../core/PublicationContext';

const PublicationFormatEdit: React.FC = () => {
    const {cid} = useParams();

    const {publication, formats} = usePublication();
    const krysApp = useKrysApp();

    const navigate = useNavigate();

    const [form, setForm] = useState<PublicationFormatEditFormFields>(defaultPublicationFormatEditFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [isResourceLoaded, setIsResourceLoaded] = useState<boolean>(false)

    const [publicationFormat, setPublicationFormat] = useState<PublicationFormat | null>(null);
    const [formatTypes, setFormatTypes] = useState<FormatType[]>([]);

    useEffect(() => {
        if (publication && cid) {
            // get the publication format we need to edit from the database
            getPublicationFormat(publication, parseInt(cid)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch to edit so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    navigate('/error/400');
                } else {
                    // we were able to fetch current publication format to edit
                    setPublicationFormat(response);

                    // we also set the form to be the publication format details
                    const {format, type, ...currentPublicationFormat} = response;

                    setForm({...currentPublicationFormat, format_id: format.id, type: type.id});
                }
            });

            // get the format types
            getFormatTypes().then(response => {
                if (axios.isAxiosError(response)) {
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    setFormErrors([GenericErrorMessage])
                } else {
                    // if we were able to get the list of format types, then we fill our state with them
                    if (response.data) {
                        setFormatTypes(response.data)
                    }
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publication, cid]);

    useEffect(() => {
        if (publicationFormat) {
            setIsResourceLoaded(true);

            krysApp.setPageTitle(generatePageTitle(Sections.SUPPLY_PUBLICATION_FORMATS, PageTypes.EDIT, `${publication?.name} - ${publicationFormat.format.name}`))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publicationFormat]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleEdit = () => {
        if (publication && publicationFormat) {
            // we need to update the publication format's data by doing API call with form
            updatePublicationFormat(publication, publicationFormat.id, form).then(response => {
                if (axios.isAxiosError(response)) {
                    // show errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error
                    setFormErrors([GenericErrorMessage]);
                } else {
                    // we got the updated publication formats so we're good
                    krysApp.setAlert({
                        message: new AlertMessageGenerator('publication format', Actions.EDIT, KrysToastType.SUCCESS).message,
                        type: KrysToastType.SUCCESS
                    })

                    navigate(`/supply/publications/${publication.id}/edit`);
                }
            });
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Publication Format"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={publicationFormatSchema(true)} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        ({errors}) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Format" isRequired={true}/>

                                    <SingleSelect isResourceLoaded={isResourceLoaded} options={formats}
                                                  defaultValue={publicationFormat?.format} form={form}
                                                  setForm={setForm} name="format_id" isClearable={true}
                                                  showHierarchy={true}/>

                                    <div className="mt-1 text-danger">
                                        {errors?.format_id ? errors?.format_id : null}
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Type" isRequired={true}/>

                                    <SingleSelect isResourceLoaded={isResourceLoaded} options={formatTypes}
                                                  defaultValue={publicationFormat?.type} form={form}
                                                  setForm={setForm} name="type" isClearable={true}/>

                                    <div className="mt-1 text-danger">
                                        {errors?.type ? errors?.type : null}
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

export default PublicationFormatEdit;