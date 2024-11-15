import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {defaultFormFields, FormFields, PerformanceMetricSchema} from '../core/form';
import {GenericErrorMessage, genericOnChangeHandler} from '../../../../helpers/form';
import {extractErrors} from '../../../../helpers/requests';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import FormErrors from '../../../../components/forms/FormErrors';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {storePerformanceMetric} from '../../../../requests/misc/PerformanceMetric';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";

const PerformanceMetricCreate: React.FC = () => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const navigate = useNavigate();
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_PERFORMANCE_METRICS, PageTypes.CREATE))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleCreate = (e: any) => {
        // send API request to create the performance metric
        storePerformanceMetric(form).then(response => {
                if (axios.isAxiosError(response)) {
                    // we need to show the errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error message
                    setFormErrors([GenericErrorMessage])
                } else {
                    // it's performance metric for sure
                    krysApp.setAlert({
                        message: new AlertMessageGenerator('performance metric', Actions.CREATE, KrysToastType.SUCCESS).message,
                        type: KrysToastType.SUCCESS
                    })

                    navigate(`/misc/performance-metrics`);
                }
            }
        );
    };

    return (
        <KTCard>
            <KTCardHeader text="Create New Performance Metric" icon="fa-regular fa-plus"
                          icon_style="fs-3 text-success"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={PerformanceMetricSchema} onSubmit={handleCreate}>
                    {
                        (formik) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter performance metric name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Title" isRequired={false}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter name of target related to metric" name="title"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="title" className="mt-2"/>
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/misc/performance-metrics'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default PerformanceMetricCreate;