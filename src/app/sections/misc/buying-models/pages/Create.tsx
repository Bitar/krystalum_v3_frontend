import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Select from "react-select";
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {genericMultiSelectOnChangeHandler, genericOnChangeHandler} from '../../../../helpers/form';

import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {submitRequest} from '../../../../helpers/requests';
import {Sections} from '../../../../helpers/sections';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {PerformanceMetric} from "../../../../models/misc/PerformanceMetric";
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {storeBuyingModel} from '../../../../requests/misc/BuyingModel';
import {getAllPerformanceMetrics} from "../../../../requests/misc/PerformanceMetric";
import {BuyingModelSchema, defaultFormFields, FormFields} from '../core/form';

const BuyingModelCreate: React.FC = () => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);

    const navigate = useNavigate();
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_BUYING_MODELS, PageTypes.CREATE))

        submitRequest(getAllPerformanceMetrics, [], (response) => {
            setPerformanceMetrics(response);
        }, setFormErrors);

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
        submitRequest(storeBuyingModel, [form], (response) => {
            // it's booking type for sure
            krysApp.setAlert({
                message: new AlertMessageGenerator('buying model', Actions.CREATE, KrysToastType.SUCCESS).message,
                type: KrysToastType.SUCCESS
            });

            navigate(`/misc/buying-models`);
        }, setFormErrors);
    };

    return (
        <KTCard>
            <KTCardHeader text="Create New Buying Model"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={BuyingModelSchema} onSubmit={handleCreate}
                        enableReinitialize>
                    {
                        () => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
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