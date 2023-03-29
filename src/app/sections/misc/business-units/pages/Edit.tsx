import React, {useEffect, useState} from 'react';
import {BusinessUnitSchema, defaultFormFields, FormFields} from '../core/form';
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
import {getBusinessUnit, updateBusinessUnit} from '../../../../requests/misc/BusinessUnit';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {BusinessUnit} from '../../../../models/misc/BusinessUnit';


const BusinessUnitEdit: React.FC = () => {
    const [businessUnit, setBusinessUnit] = useState<BusinessUnit | null>(null);

    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const krysApp = useKrysApp();

    const navigate = useNavigate();

    let {id} = useParams();

    useEffect(() => {
        if (id) {
            // get the business unit we need to edit from the database
            getBusinessUnit(parseInt(id)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch the business unit to edit so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    navigate('/error/400');
                } else {
                    // we were able to fetch current business unit to edit
                    setBusinessUnit(response);
                    setForm(response);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (businessUnit) {
            krysApp.setPageTitle(generatePageTitle(Sections.MISC_BUSINESS_UNITS, PageTypes.EDIT, businessUnit.name))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleEdit = (e: any) => {
        if (businessUnit) {
            // we need to update the business units data by doing API call with form
            updateBusinessUnit(businessUnit.id, form).then(response => {
                if (axios.isAxiosError(response)) {
                    // show errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error
                    setFormErrors([GenericErrorMessage]);
                } else {
                    // we got the updated business unit so we're good
                    krysApp.setAlert({
                        message: new AlertMessageGenerator('business unit', Actions.EDIT, KrysToastType.SUCCESS).message,
                        type: KrysToastType.SUCCESS
                    })

                    navigate(`/misc/business-units`);
                }
            });
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Business Unit" />

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={BusinessUnitSchema} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        (formik) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter business unit name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/misc/business-units'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default BusinessUnitEdit;