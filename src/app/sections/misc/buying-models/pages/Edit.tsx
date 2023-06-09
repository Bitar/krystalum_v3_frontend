import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Select from 'react-select';

import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {genericMultiSelectOnChangeHandler, genericOnChangeHandler} from '../../../../helpers/form';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {getErrorPage, submitRequest} from '../../../../helpers/requests';
import {Sections} from '../../../../helpers/sections';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {BuyingModel} from "../../../../models/misc/BuyingModel";
import {PerformanceMetric} from "../../../../models/misc/PerformanceMetric";
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {getBuyingModel, updateBuyingModel} from '../../../../requests/misc/BuyingModel';
import {getAllPerformanceMetrics} from "../../../../requests/misc/PerformanceMetric";
import {BuyingModelSchema, defaultFormFields, FormFields} from '../core/form';

const BuyingModelEdit: React.FC = () => {
    const [buyingModel, setBuyingModel] = useState<BuyingModel | null>(null);
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [selectedPerformanceMetrics, setSelectedPerformanceMetrics] = useState<PerformanceMetric[]>([]);

    const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);

    const krysApp = useKrysApp();
    const navigate = useNavigate();

    let {id} = useParams();

    useEffect(() => {
        if (id) {
            // get the buying model we need to edit from the database
            submitRequest(getBuyingModel, [parseInt(id)], (response) => {
                let errorPage = getErrorPage(response);

                if (errorPage) {
                    navigate(errorPage);
                } else {
                    // we were able to fetch current buying model to edit
                    setBuyingModel(response);

                    krysApp.setPageTitle(generatePageTitle(Sections.MISC_BUYING_MODELS, PageTypes.EDIT, response.name))

                    const {performanceMetrics, ...currentBuyingModel} = response

                    setForm({
                        ...currentBuyingModel,
                        performance_metric_ids: performanceMetrics.map((metric: PerformanceMetric) => metric.id)
                    });

                    setSelectedPerformanceMetrics(performanceMetrics);
                }
            });

            // get the performance metrics, so we can edit the kpi's metrics
            submitRequest(getAllPerformanceMetrics, [], (response) => {
                // if we were able to get the list of performance metrics, then we fill our state with them
                setPerformanceMetrics(response);
            }, setFormErrors);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleEdit = () => {
        if (buyingModel) {
            // we need to update the buying model's data by doing API call with form
            submitRequest(updateBuyingModel, [buyingModel.id, form], (response) => {
                // we got the buying model so we're good
                krysApp.setAlert({
                    message: new AlertMessageGenerator('buying model', Actions.EDIT, KrysToastType.SUCCESS).message,
                    type: KrysToastType.SUCCESS
                });

                navigate(`/misc/buying-models`);
            }, setFormErrors);
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Buying Model"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={BuyingModelSchema} onSubmit={handleEdit}
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

                                    <Select isMulti name={'performance_metric_ids'} value={selectedPerformanceMetrics}
                                            options={performanceMetrics}
                                            getOptionLabel={(instance) => instance.name}
                                            getOptionValue={(instance) => instance.id.toString()}
                                            placeholder={`Select one or more metrics`}
                                            onChange={(e) => {
                                                genericMultiSelectOnChangeHandler(e, form, setForm, 'performance_metric_ids');

                                                setSelectedPerformanceMetrics(e as PerformanceMetric[]);
                                            }
                                            }/>

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

export default BuyingModelEdit;
