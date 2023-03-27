import React, {useEffect, useState} from 'react';
import {defaultFormFields, FormFields, KpiSchema} from '../core/form';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {extractErrors} from '../../../../helpers/requests';
import {GenericErrorMessage, genericOnChangeHandler} from '../../../../helpers/form';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../components/forms/FormErrors';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {Kpi} from '../../../../models/misc/Kpi';
import {PerformanceMetric} from '../../../../models/misc/PerformanceMetric';
import {getAllPerformanceMetrics} from '../../../../requests/misc/PerformanceMetric';
import {getKpi, updateKpi} from '../../../../requests/misc/Kpi';
import KrysCheckbox from '../../../../components/forms/KrysCheckbox';
import {AlertMessageGenerator} from '../../../../helpers/AlertMessageGenerator';
import MultiSelect from '../../../../components/forms/MultiSelect';

const KpiEdit: React.FC = () => {
    const [kpi, setKpi] = useState<Kpi|null>(null);

    const [form, setForm] = useState<FormFields>(defaultFormFields)
    const [isResourceLoaded, setIsResourceLoaded] = useState<boolean>(false)

    const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const krysApp = useKrysApp();
    const navigate = useNavigate();

    let {id} = useParams();

    useEffect(() => {
        if(id) {
            // get the performance metrics so we can edit the kpi's metrics
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

            // get the kpi we need to edit from the database
            getKpi(parseInt(id)).then(response => {
                if(axios.isAxiosError(response)) {
                    // we were not able to fetch the kpi to edit so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if(response === undefined) {
                    navigate('/error/400');
                } else {
                    // we were able to fetch current kpi to edit
                    setKpi(response);

                    const {performanceMetrics, ...currentKpi} = response

                    setForm({...currentKpi, performance_metric_ids: response.performanceMetrics.map(metric => metric.id)});
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if(kpi) {
            setIsResourceLoaded(true);

            krysApp.setPageTitle(generatePageTitle(Sections.MISC_KPIS, PageTypes.EDIT, kpi.name))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [kpi]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleEdit = (e: any) => {
        if(kpi) {
            // we need to update the kpi's data by doing API call with form
            updateKpi(kpi.id, form).then(response => {
                if(axios.isAxiosError(response)) {
                    // show errors
                    setFormErrors(extractErrors(response));
                } else if(response === undefined) {
                    // show generic error
                    setFormErrors([GenericErrorMessage]);
                } else {
                    // we got the updated kpi so we're good
                    krysApp.setAlert({message: new AlertMessageGenerator('kpi', Actions.EDIT, KrysToastType.SUCCESS).message, type: KrysToastType.SUCCESS});

                    navigate(`/misc/kpis`);
                }
            });
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Kpi" icon="fa-solid fa-pencil" icon_style="fs-3 text-warning"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={KpiSchema} onSubmit={handleEdit} enableReinitialize>
                    {
                        (formik) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-6" type="text"
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

                                    <MultiSelect isResourceLoaded={isResourceLoaded} options={performanceMetrics} defaultValue={kpi?.performanceMetrics} form={form} setForm={setForm} name={'performance_metric_ids'} />

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