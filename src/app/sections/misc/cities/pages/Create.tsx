import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Select from 'react-select';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {filterData} from '../../../../helpers/dataManipulation';
import {genericOnChangeHandler, genericSingleSelectOnChangeHandler} from '../../../../helpers/form';

import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {submitRequest} from '../../../../helpers/requests';
import {Sections} from '../../../../helpers/sections';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {Country} from '../../../../models/misc/Country';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {storeCity} from '../../../../requests/misc/City';
import {getAllCountries} from '../../../../requests/misc/Country';
import {CitySchema, defaultFormFields, FormFields} from '../core/form';

const CityCreate: React.FC = () => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [countries, setCountries] = useState<Country[]>([]);

    const navigate = useNavigate();
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_CITIES, PageTypes.CREATE))

        // get the countries
        submitRequest(getAllCountries, [], (response) => {
            setCountries(filterData(response, 'name', ['All Countries']));
        }, setFormErrors);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleCreate = (e: any) => {
        // send API request to create the city
        submitRequest(storeCity, [form], (response) => {
            // it's city for sure
            krysApp.setAlert({
                message: new AlertMessageGenerator('city', Actions.CREATE, KrysToastType.SUCCESS).message,
                type: KrysToastType.SUCCESS
            });

            navigate(`/misc/cities`);
        }, setFormErrors);
    };

    return (
        <KTCard>
            <KTCardHeader text="Create New City"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={CitySchema} onSubmit={handleCreate} enableReinitialize>
                    {
                        ({errors}) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter city name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Country" isRequired={true}/>

                                    <Select name="country_id"
                                            options={countries}
                                            getOptionLabel={(country) => country?.name}
                                            getOptionValue={(country) => country?.id.toString()}
                                            onChange={(e) => genericSingleSelectOnChangeHandler(e, form, setForm, 'country_id')}/>

                                    <div className="mt-3 text-danger">
                                        {errors?.country_id ? errors?.country_id : null}
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/misc/cities'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default CityCreate;