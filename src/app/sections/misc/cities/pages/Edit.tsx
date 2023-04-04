import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {
    GenericErrorMessage,
    genericOnChangeHandler,
} from '../../../../helpers/form';
import {extractErrors} from '../../../../helpers/requests';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {City} from '../../../../models/misc/City';
import {getCity, updateCity} from '../../../../requests/misc/City';
import {Country} from '../../../../models/misc/Country';
import {getAllCountries} from '../../../../requests/misc/Country';
import {CitySchema, defaultFormFields, FormFields} from '../core/form';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {filterData} from '../../../../helpers/dataManipulation';
import SingleSelect from '../../../../components/forms/SingleSelect';

const CityEdit: React.FC = () => {
    const [city, setCity] = useState<City|null>(null);
    const [isResourceLoaded, setIsResourceLoaded] = useState<boolean>(false)

    const [form, setForm] = useState<FormFields>(defaultFormFields)
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [countries, setCountries] = useState<Country[]>([]);

    const krysApp = useKrysApp();

    const navigate = useNavigate();

    let {id} = useParams();

    useEffect(() => {
        if (id) {
            // get the city we need to edit from the database
            getCity(parseInt(id)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch the city to edit, so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    navigate('/error/400');
                } else {
                    // we were able to fetch current city to edit
                    setCity(response);

                    const {country, ...currentCity} = response;

                    setForm({...currentCity, country_id: country.id});
                }
            });

            // get the countries
            getAllCountries().then(response => {
                if (axios.isAxiosError(response)) {
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    setFormErrors([GenericErrorMessage])
                } else {
                    // if we were able to get the list of countries, then we fill our state with them
                    if (response.data) {
                        setCountries(filterData(response.data, 'name', ['All Countries']));
                    }
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if(city) {
            krysApp.setPageTitle(generatePageTitle(Sections.MISC_CITIES, PageTypes.EDIT, city.name))

            setIsResourceLoaded(true);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [city]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleEdit = (e: any) => {
        if(city) {
            // we need to update the city's data by doing API call with form
            updateCity(city.id, form).then(response => {
                if (axios.isAxiosError(response)) {
                    // show errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error
                    setFormErrors([GenericErrorMessage]);
                } else {
                    // we got the booking city so we're good
                    krysApp.setAlert({
                        message: new AlertMessageGenerator('city', Actions.EDIT, KrysToastType.SUCCESS).message,
                        type: KrysToastType.SUCCESS
                    })
                    navigate(`/misc/cities`);
                }
            });
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit City" />

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={CitySchema} onSubmit={handleEdit}
                        enableReinitialize>
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

                                    <SingleSelect isResourceLoaded={isResourceLoaded} options={countries} defaultValue={city?.country} form={form} setForm={setForm} name='country_id' />

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

export default CityEdit;
