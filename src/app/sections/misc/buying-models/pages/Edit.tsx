import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {GenericErrorMessage, genericOnChangeHandler} from '../../../../helpers/form';
import {extractErrors} from '../../../../helpers/requests';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {getBuyingModel, updateBuyingModel} from '../../../../requests/misc/BuyingModel';
import {BuyingModelSchema, defaultFormFields, FormFields} from '../core/form';
import {AlertMessageGenerator} from "../../../../helpers/alertMessageGenerator";
import {PerformanceMetric} from "../../../../models/misc/PerformanceMetric";
import {getAllPerformanceMetrics} from "../../../../requests/misc/PerformanceMetric";
import MultiSelect from "../../../../components/forms/MultiSelect";
import {BuyingModel, defaultBuyingModel} from "../../../../models/misc/BuyingModel";


const BuyingModelEdit: React.FC = () => {
    const [buyingModel, setBuyingModel] = useState<BuyingModel|null>(null)
    const [form, setForm] = useState<FormFields>(defaultFormFields)
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [isResourceLoaded, setIsResourceLoaded] = useState<boolean>(false)

    const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);

    const krysApp = useKrysApp();

    const navigate = useNavigate();

    let {id} = useParams();

    useEffect(() => {
        if (id) {
            // get the buying model we need to edit from the database
            getBuyingModel(parseInt(id)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch the buying model to edit, so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    navigate('/error/400');
                } else {
                    // we were able to fetch current buying model to edit
                    setBuyingModel(response);


                    const {performanceMetrics, ...currentBuyingModel} = response

                    setForm({
                        ...currentBuyingModel,
                        performance_metric_ids: response.performanceMetrics.map(metric => metric.id)
                    });
                }
            });

            // get the performance metrics, so we can edit the kpi's metrics
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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if(buyingModel) {
            setIsResourceLoaded(true);

            krysApp.setPageTitle(generatePageTitle(Sections.MISC_BUYING_MODELS, PageTypes.EDIT, buyingModel.name))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [buyingModel]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleEdit = () => {
        // we need to update the buying model's data by doing API call with form
        updateBuyingModel(form).then(response => {
            if (axios.isAxiosError(response)) {
                // show errors
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                // show generic error
                setFormErrors([GenericErrorMessage]);
            } else {
                // we got the buying model so we're good
                krysApp.setAlert({
                    message: new AlertMessageGenerator('buying model', Actions.EDIT, KrysToastType.SUCCESS).message,
                    type: KrysToastType.SUCCESS
                })
                navigate(`/misc/buying-models`);
            }
        });
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Buying Model" icon="fa-solid fa-pencil" icon_style="fs-3 text-warning"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={BuyingModelSchema} onSubmit={handleEdit}
                        enableReinitialize>
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
                                    <KrysFormLabel text="Corresponding metric" isRequired={true}/>

                                    <MultiSelect isResourceLoaded={isResourceLoaded} options={performanceMetrics}
                                                 defaultValue={buyingModel?.performanceMetrics} form={form}
                                                 setForm={setForm} name={'performance_metric_ids'}/>

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
