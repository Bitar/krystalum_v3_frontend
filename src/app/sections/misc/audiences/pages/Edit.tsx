import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {GenericErrorMessage, genericOnChangeHandler} from '../../../../helpers/form';
import {extractErrors} from '../../../../helpers/requests';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {Audience, defaultAudience} from '../../../../models/misc/Audience';
import {getAudience, updateAudience} from '../../../../requests/misc/Audience';
import {AudienceSchema} from '../core/form';
import {AlertMessageGenerator} from "../../../../helpers/alertMessageGenerator";


const AudienceEdit: React.FC = () => {
    const [audience, setAudience] = useState<Audience>(defaultAudience);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const krysApp = useKrysApp();

    const navigate = useNavigate();

    let {id} = useParams();

    useEffect(() => {
        if (id) {
            // get the audience we need to edit from the database
            getAudience(parseInt(id)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch the audience to edit, so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    navigate('/error/400');
                } else {
                    // we were able to fetch current audience to edit
                    setAudience(response);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_AUDIENCES, PageTypes.EDIT, audience.name))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [audience]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, audience, setAudience);
    };

    const handleEdit = (e: any) => {
        // we need to update the audience's data by doing API call with form
        updateAudience(audience).then(response => {
            if (axios.isAxiosError(response)) {
                // show errors
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                // show generic error
                setFormErrors([GenericErrorMessage]);
            } else {
                // we got the audience so we're good
                krysApp.setAlert({message: new AlertMessageGenerator('audience', Actions.EDIT, KrysToastType.SUCCESS).message, type: KrysToastType.SUCCESS})
                navigate(`/misc/audiences`);
            }
        });
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Audience" icon="fa-solid fa-pencil" icon_style="fs-3 text-warning"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={audience} validationSchema={AudienceSchema} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        () => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-6" type="text"
                                           placeholder="Enter audience name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/misc/audiences'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default AudienceEdit;
