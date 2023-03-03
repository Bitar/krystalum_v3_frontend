import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {BusinessUnitSchema, defaultFormFields, FormFields} from '../core/form';
import {GenericErrorMessage, genericOnChangeHandler} from '../../../../helpers/form';
import {extractErrors} from '../../../../helpers/requests';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import FormErrors from '../../../../components/forms/FormErrors';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {storeBusinessUnit} from '../../../../requests/misc/BusinessUnit';
import {AlertMessageGenerator} from "../../../../helpers/alertMessageGenerator";

const BusinessUnitCreate: React.FC = () => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const navigate = useNavigate();
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_BUSINESS_UNITS, PageTypes.CREATE))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleCreate = (e: any) => {
        // send API request to create the permission
        storeBusinessUnit(form).then(response => {
                if (axios.isAxiosError(response)) {
                    // we need to show the errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error message
                    setFormErrors([GenericErrorMessage])
                } else {
                    // it's permission for sure
                    krysApp.setAlert({
                        message: new AlertMessageGenerator('business unit', Actions.CREATE, KrysToastType.SUCCESS).message,
                        type: KrysToastType.SUCCESS
                    })
                    navigate(`/misc/business-units`);
                }
            }
        );
    };

    return (
        <KTCard>
            <KTCardHeader text="Create New Business Unit" icon="fa-regular fa-plus" icon_style="fs-3 text-success"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={BusinessUnitSchema} onSubmit={handleCreate}>
                    {
                        (formik) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-6" type="text"
                                           placeholder="Enter business unit name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/misc/business-units'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default BusinessUnitCreate;