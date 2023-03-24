import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {defaultFormFields, FormFields, BuyingModelSchema} from '../core/form';
import {GenericErrorMessage, genericMultiSelectOnChangeHandler, genericOnChangeHandler} from '../../../../helpers/form';
import {extractErrors} from '../../../../helpers/requests';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import FormErrors from '../../../../components/forms/FormErrors';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {storeBuyingModel} from '../../../../requests/misc/BuyingModel';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import Select from "react-select";
import {PerformanceMetric} from "../../../../models/misc/PerformanceMetric";
import {getAllPerformanceMetrics} from "../../../../requests/misc/PerformanceMetric";

const BuyingModelCreate: React.FC = () => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);

    const navigate = useNavigate();
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_BUYING_MODELS, PageTypes.CREATE))

        getAllPerformanceMetrics().then(response => {
            if (axios.isAxiosError(response)) {
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                setFormErrors([GenericErrorMessage])
            } else if (response.data) {
                // if we were able to get the list of performance metrics, then we fill our state with them
                setPerformanceMetrics(response.data);
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const multiSelectChangeHandler = (e: any) => {
        genericMultiSelectOnChangeHandler(e, form, setForm, 'performance_metric_ids');
    };

    const handleCreate = (e: any) => {
        // send API request to create the booking type
        storeBuyingModel(form).then(response => {
                if (axios.isAxiosError(response)) {
                    // we need to show the errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error message
                    setFormErrors([GenericErrorMessage])
                } else {
                    // it's booking type for sure
                    krysApp.setAlert({message: new AlertMessageGenerator('buying model', Actions.CREATE, KrysToastType.SUCCESS).message, type: KrysToastType.SUCCESS})
                    navigate(`/misc/buying-models`);
                }
            }
        );
    };

    return (
        <KTCard>
            <KTCardHeader text="Create New Buying Model" icon="fa-regular fa-plus" icon_style="fs-3 text-success"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={BuyingModelSchema} onSubmit={handleCreate} enableReinitialize>
                    {
                        () => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-6" type="text"
                                           placeholder="Enter buying model name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Corresponding metrics" isRequired={true}/>

                                    <Select isMulti name="performance_metric_ids"
                                            options={performanceMetrics}
                                            getOptionLabel={(performanceMetric) => performanceMetric.name}
                                            getOptionValue={(performanceMetric) => performanceMetric.id.toString()}
                                            onChange={multiSelectChangeHandler}
                                            placeholder="Select one or more performance metrics"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="performance_metric_ids" className="mt-2"/>
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/misc/buying-models'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default BuyingModelCreate;