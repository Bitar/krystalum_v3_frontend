import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik} from 'formik';

import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {defaultFormFields, FormFields, KpiSchema} from '../core/form';
import {GenericErrorMessage, genericOnChangeHandler, genericSelectOnChangeHandler} from '../../../../helpers/form';
import {extractErrors} from '../../../../helpers/requests';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {storeKpi} from '../../../../requests/misc/Kpi';
import KrysCheckbox from '../../../../components/forms/KrysCheckbox';
import {AlertMessageGenerator} from "../../../../helpers/alertMessageGenerator";

const KpiCreate: React.FC = () => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const navigate = useNavigate();
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_KPIS, PageTypes.CREATE));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeHandler = (e: any) => {
        const name: string = e.target.name;

        if (name !== 'is_rate' && name !== 'is_conversion') {
            genericOnChangeHandler(e, form, setForm);
        }
    };

    const selectChangeHandler = (e: any) => {
        genericSelectOnChangeHandler(e, form, setForm, 'metric');
    };

    const handleCreate = (e: any) => {
        // send API request to create the permission
        storeKpi(form).then(response => {
                if (axios.isAxiosError(response)) {
                    // we need to show the errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error message
                    setFormErrors([GenericErrorMessage])
                } else {
                    // it's permission for sure
                    krysApp.setAlert({
                        message: new AlertMessageGenerator('kpi', Actions.CREATE, KrysToastType.SUCCESS).message,
                        type: KrysToastType.SUCCESS
                    })
                    navigate(`/misc/kpis`);
                }
            }
        );
    };

    return (
        <KTCard>
            <KTCardHeader text="Create New KPI" icon="fa-regular fa-plus" icon_style="fs-3 text-success"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={KpiSchema} onSubmit={handleCreate}>
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
                                                  onChangeHandler={() => setForm({...form, is_rate: !form.is_rate})}
                                                  defaultValue={form.is_rate}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="is_rate" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Is this a conversion KPI?" isRequired={true}/>

                                    <KrysCheckbox name="is_conversion" onChangeHandler={() => setForm({
                                        ...form,
                                        is_conversion: !form.is_conversion
                                    })}
                                                  defaultValue={form.is_conversion}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="is_conversion" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Corresponding metric" isRequired={true}/>

                                    {/*<Select isMulti={false} name="metric" defaultValue={defaultMetric}*/}
                                    {/*        placeholder={"Select one or more permissions"}*/}
                                    {/*        options={metrics}*/}
                                    {/*        getOptionLabel={(metric) => metric?.name}*/}
                                    {/*        getOptionValue={(metric) => metric?.id ? metric?.id.toString() : ''}*/}
                                    {/*        onChange={selectChangeHandler}/>*/}

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="metrics" className="mt-2"/>
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