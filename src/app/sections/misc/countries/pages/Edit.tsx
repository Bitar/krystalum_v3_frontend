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
import {getCountry, updateCountry} from '../../../../requests/misc/Country';
import {CountrySchema} from '../core/form';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {defaultFormFields, FormFields} from "../core/form";
import {Country} from '../../../../models/misc/Country';


const CountryEdit: React.FC = () => {
    const [country, setCountry] = useState<Country|null>(null);

    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const krysApp = useKrysApp();

    const navigate = useNavigate();

    let {id} = useParams();

    useEffect(() => {
        if (id) {
            // get the country we need to edit from the database
            getCountry(parseInt(id)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch the country to edit, so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    navigate('/error/400');
                } else {
                    // we were able to fetch current country to edit
                    setCountry(response);
                    setForm(response);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if(country) {
            krysApp.setPageTitle(generatePageTitle(Sections.MISC_COUNTRIES, PageTypes.EDIT, country.name))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleEdit = () => {
        if(country) {
            // we need to update the country's data by doing API call with form
            updateCountry(country.id, form).then(response => {
                if (axios.isAxiosError(response)) {
                    // show errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error
                    setFormErrors([GenericErrorMessage]);
                } else {
                    // we got the booking country so we're good
                    krysApp.setAlert({message: new AlertMessageGenerator('country', Actions.EDIT, KrysToastType.SUCCESS).message, type: KrysToastType.SUCCESS})
                    navigate(`/misc/countries`);
                }
            });
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Country" />

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={CountrySchema} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        () => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter country name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Code" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter country code" name="code"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="code" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Currency" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter country currency" name="currency"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="currency" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Phone code" isRequired={true}/>

                                    <Field className="form-control fs-base" type="number"
                                           placeholder="Enter country phone code" name="phone_code"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="phone_code" className="mt-2"/>
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/misc/countries'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default CountryEdit;
