import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysSwitch from '../../../../components/forms/KrysSwitch';
import MultiSelect from '../../../../components/forms/MultiSelect';
import {AlertMessageGenerator} from '../../../../helpers/AlertMessageGenerator';
import {genericOnChangeHandler} from '../../../../helpers/form';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {getErrorPage, submitRequest} from '../../../../helpers/requests';
import {Sections} from '../../../../helpers/sections';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {Kpi} from '../../../../models/misc/Kpi';
import {PerformanceMetric} from '../../../../models/misc/PerformanceMetric';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {getKpi, updateKpi} from '../../../../requests/misc/Kpi';
import {getAllPerformanceMetrics} from '../../../../requests/misc/PerformanceMetric';
import {defaultFormFields, FormFields, KpiSchema} from '../core/form';

const KpiEdit: React.FC = () => {
    const [kpi, setKpi] = useState<Kpi | null>(null);

    const [form, setForm] = useState<FormFields>(defaultFormFields)
    const [isResourceLoaded, setIsResourceLoaded] = useState<boolean>(false)

    const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const krysApp = useKrysApp();
    const navigate = useNavigate();

    let {id} = useParams();

    useEffect(() => {
        if (id) {
            // get the performance metrics so we can edit the kpi's metrics
            submitRequest(getAllPerformanceMetrics, [], (response) => {
                setPerformanceMetrics(response);
            }, setFormErrors);

            submitRequest(getKpi, [parseInt(id)], (response) => {
                let errorPage = getErrorPage(response);

                if (errorPage) {
                    navigate(errorPage);
                } else {
                    // we were able to fetch current kpi to edit
                    setKpi(response);

                    const {performanceMetrics, ...currentKpi} = response

                    setForm({
                        ...currentKpi,
                        performance_metric_ids: performanceMetrics.map((metric: PerformanceMetric) => metric.id)
                    });
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (kpi) {
            setIsResourceLoaded(true);

            krysApp.setPageTitle(generatePageTitle(Sections.MISC_KPIS, PageTypes.EDIT, kpi.name))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [kpi]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleEdit = (e: any) => {
        if (kpi) {
            // we need to update the kpi's data by doing API call with form
            submitRequest(updateKpi, [kpi.id, form], (response) => {
                // we got the updated kpi so we're good
                krysApp.setAlert({
                    message: new AlertMessageGenerator('kpi', Actions.EDIT, KrysToastType.SUCCESS).message,
                    type: KrysToastType.SUCCESS
                });

                navigate(`/misc/kpis`);
            }, setFormErrors);
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Kpi"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={KpiSchema} onSubmit={handleEdit} enableReinitialize>
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

                                    <MultiSelect isResourceLoaded={isResourceLoaded} options={performanceMetrics}
                                                 defaultValue={kpi?.performanceMetrics} form={form} setForm={setForm}
                                                 name={'performance_metric_ids'}/>

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
    );
}

export default KpiEdit;