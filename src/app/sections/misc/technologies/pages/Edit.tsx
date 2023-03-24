import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik} from 'formik';

import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {GenericErrorMessage, genericOnChangeHandler} from '../../../../helpers/form';
import {extractErrors} from '../../../../helpers/requests';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {defaultFormFields, FormFields, TechnologySchema} from '../core/form';
import {getTechnology, updateTechnology} from '../../../../requests/misc/Technology';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {Technology} from '../../../../models/misc/Technology';


const TechnologyEdit: React.FC = () => {
    const [technology, setTechnology] = useState<Technology|null>(null);

    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const krysApp = useKrysApp();

    const navigate = useNavigate();

    let {id} = useParams();

    useEffect(() => {
        if (id) {
            // get the technology we need to edit from the database
            getTechnology(parseInt(id)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch the technology to edit so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    navigate('/error/400');
                } else {
                    // we were able to fetch current technology to edit
                    setTechnology(response);
                    setForm(response);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if(technology) {
            krysApp.setPageTitle(generatePageTitle(Sections.MISC_TECHNOLOGIES, PageTypes.EDIT, technology.name))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleEdit = (e: any) => {
        if(technology) {
            // we need to update the technology's data by doing API call with form
            updateTechnology(technology.id, form).then(response => {
                if (axios.isAxiosError(response)) {
                    // show errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error
                    setFormErrors([GenericErrorMessage]);
                } else {
                    // we got the updated technology so we're good
                    krysApp.setAlert({
                        message: new AlertMessageGenerator('technology', Actions.EDIT, KrysToastType.SUCCESS).message,
                        type: KrysToastType.SUCCESS
                    })

                    navigate(`/misc/technologies`);
                }
            });
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Technology" icon="fa-solid fa-pencil" icon_style="fs-3 text-warning"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={TechnologySchema} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        (formik) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-6" type="text"
                                           placeholder="Enter technology name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/misc/technologies'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default TechnologyEdit;