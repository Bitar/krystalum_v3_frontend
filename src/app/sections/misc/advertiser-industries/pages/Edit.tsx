import React, {useEffect, useState} from 'react';
import {AdvertiserIndustrySchema, defaultFormFields, FormFields} from '../core/form';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {GenericErrorMessage, genericOnChangeHandler} from '../../../../helpers/form';
import {extractErrors} from '../../../../helpers/requests';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../components/forms/FormErrors';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {getAdvertiserIndustry, updateAdvertiserIndustry} from '../../../../requests/misc/AdvertiserIndustry';
import {AlertMessageGenerator} from "../../../../helpers/alertMessageGenerator";

const AdvertiserIndustryEdit: React.FC = () => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const krysApp = useKrysApp();

    const navigate = useNavigate();

    let {id} = useParams();

    useEffect(() => {
        if (id) {
            // get the permission we need to edit from the database
            getAdvertiserIndustry(parseInt(id)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch the permission to edit so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    navigate('/error/400');
                } else {
                    // we were able to fetch current permission to edit
                    setForm(response);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_ADVERTISER_INDUSTRIES, PageTypes.EDIT, form.name))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleEdit = (e: any) => {
        // we need to update the permission's data by doing API call with form
        updateAdvertiserIndustry(form).then(response => {
            if (axios.isAxiosError(response)) {
                // show errors
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                // show generic error
                setFormErrors([GenericErrorMessage]);
            } else {
                // we got the updated advertiser industries so we're good
                krysApp.setAlert({
                    message: new AlertMessageGenerator('advertiser industry', Actions.EDIT, KrysToastType.SUCCESS).message,
                    type: KrysToastType.SUCCESS
                })
                navigate(`/misc/advertiser-industries`);
            }
        });
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Advertiser Industry" icon="fa-solid fa-pencil" icon_style="fs-3 text-warning"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={AdvertiserIndustrySchema} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        (formik) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-6" type="text"
                                           placeholder="Enter advertiser industry name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/misc/advertiser-industries'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default AdvertiserIndustryEdit;