import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik} from 'formik';

import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {defaultFormFields, FormFields, KpiSchema} from '../core/form';
import {GenericErrorMessage, genericMultiSelectOnChangeHandler, genericOnChangeHandler} from '../../../../helpers/form';

import {extractErrors} from '../../../../helpers/requests';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {storeKpi} from '../../../../requests/misc/Kpi';
import KrysCheckbox from '../../../../components/forms/KrysCheckbox';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {getAllPerformanceMetrics} from "../../../../requests/misc/PerformanceMetric";
import {PerformanceMetric} from "../../../../models/misc/PerformanceMetric";
import Select from "react-select";


const KpiCreate: React.FC = () => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);

    const navigate = useNavigate();
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_KPIS, PageTypes.CREATE));

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

    const handleCreate = (e: any) => {
        // send API request to create the kpi
        storeKpi(form).then(response => {
                if (axios.isAxiosError(response)) {
                    // we need to show the errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error message
                    setFormErrors([GenericErrorMessage])
                } else {
                    // it's kpi for sure

                    krysApp.setAlert({
                        message: new AlertMessageGenerator('kpi', Actions.CREATE, KrysToastType.SUCCESS).message,
                        type: KrysToastType.SUCCESS
                    });

                    navigate(`/misc/kpis`);
                }
            }
        );
    };

    const multiSelectChangeHandler = (e: any) => {
        genericMultiSelectOnChangeHandler(e, form, setForm, 'performance_metric_ids');
    };

    return (
        <KTCard>
            <KTCardHeader text="Create New KPI" />

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

                                    <KrysCheckbox name="is_rate"
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

                                    <KrysCheckbox name="is_conversion" onChangeHandler={(e) => {
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