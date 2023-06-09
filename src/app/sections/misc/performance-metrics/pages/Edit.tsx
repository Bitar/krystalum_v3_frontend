import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {genericOnChangeHandler} from '../../../../helpers/form';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {getErrorPage, submitRequest} from '../../../../helpers/requests';
import {Sections} from '../../../../helpers/sections';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {PerformanceMetric} from '../../../../models/misc/PerformanceMetric';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {getPerformanceMetric, updatePerformanceMetric} from '../../../../requests/misc/PerformanceMetric';
import {defaultFormFields, FormFields, PerformanceMetricSchema} from '../core/form';


const PerformanceMetricEdit: React.FC = () => {
    const [performanceMetric, setPerformanceMetric] = useState<PerformanceMetric | null>(null);

    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const krysApp = useKrysApp();

    const navigate = useNavigate();

    let {id} = useParams();

    useEffect(() => {
        if (id) {
            // get the performance metric we need to edit from the database
            submitRequest(getPerformanceMetric, [parseInt(id)], (response) => {
                let errorPage = getErrorPage(response);

                if (errorPage) {
                    navigate(errorPage);
                } else {
                    // we were able to fetch current performance metric to edit
                    setPerformanceMetric(response);

                    const {title, ...currentPerformanceMetric} = response

                    if (title !== null) {
                        setForm({...currentPerformanceMetric, title: title});
                    } else {
                        setForm({...currentPerformanceMetric, title: ''});
                    }
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (performanceMetric) {
            krysApp.setPageTitle(generatePageTitle(Sections.MISC_PERFORMANCE_METRICS, PageTypes.EDIT, performanceMetric.name))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleEdit = (e: any) => {
        if (performanceMetric) {
            // we need to update the performance metrics data by doing API call with form
            submitRequest(updatePerformanceMetric, [performanceMetric.id, form], (response) => {
                // we got the updated performance metric so we're good
                krysApp.setAlert({
                    message: new AlertMessageGenerator('performance metric', Actions.EDIT, KrysToastType.SUCCESS).message,
                    type: KrysToastType.SUCCESS
                });

                navigate(`/misc/performance-metrics`);
            }, setFormErrors);
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Performance Metric"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={PerformanceMetricSchema} onSubmit={handleEdit}
                        enableReinitialize>
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

export default PerformanceMetricEdit;