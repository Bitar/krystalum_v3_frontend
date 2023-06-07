import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Select from "react-select";
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysSwitch from '../../../../components/forms/KrysSwitch';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {genericMultiSelectOnChangeHandler, genericOnChangeHandler} from '../../../../helpers/form';

import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';

import {submitRequest} from '../../../../helpers/requests';
import {Sections} from '../../../../helpers/sections';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {PerformanceMetric} from "../../../../models/misc/PerformanceMetric";
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {storeKpi} from '../../../../requests/misc/Kpi';
import {getAllPerformanceMetrics} from "../../../../requests/misc/PerformanceMetric";
import {defaultFormFields, FormFields, KpiSchema} from '../core/form';


const KpiCreate: React.FC = () => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);

    const navigate = useNavigate();
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_KPIS, PageTypes.CREATE));

        submitRequest(getAllPerformanceMetrics, [], (response) => {
            setPerformanceMetrics(response);
        }, setFormErrors);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleCreate = (e: any) => {
        // send API request to create the kpi
        submitRequest(storeKpi, [form], (response) => {
            // it's kpi for sure
            krysApp.setAlert({
                message: new AlertMessageGenerator('kpi', Actions.CREATE, KrysToastType.SUCCESS).message,
                type: KrysToastType.SUCCESS
            });

            navigate(`/misc/kpis`);
        }, setFormErrors);
    };

    const multiSelectChangeHandler = (e: any) => {
        genericMultiSelectOnChangeHandler(e, form, setForm, 'performance_metric_ids');
    };

    return (
        <KTCard>
            <KTCardHeader text="Create New KPI"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={KpiSchema} onSubmit={handleCreate} enableReinitialize>
                    {
                        (formik) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter KPI name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Is this KPI a rate?" isRequired={true}/>

                                    <KrysSwitch name="is_rate"
                                                onChangeHandler={(e) => {
                                                    e.stopPropagation();
                                                    setForm({...form, is_rate: Number(!form.is_rate)});
                                                }}
                                                defaultValue={Boolean(form.is_rate)}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="is_rate" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Is this a conversion KPI?" isRequired={true}/>

                                    <KrysSwitch name="is_conversion" onChangeHandler={(e) => {
                                        e.stopPropagation();
                                        setForm({...form, is_conversion: Number(!form.is_conversion)});
                                    }} defaultValue={Boolean(form.is_conversion)}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="is_conversion" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Corresponding metric" isRequired={true}/>

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

                                <KrysFormFooter cancelUrl={'/misc/kpis'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default KpiCreate;