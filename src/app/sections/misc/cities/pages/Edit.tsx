import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {GenericErrorMessage, genericMultiSelectOnChangeHandler, genericOnChangeHandler} from '../../../../helpers/form';
import {extractErrors} from '../../../../helpers/requests';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {Actions, PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {generateSuccessMessage} from '../../../../helpers/alerts';
import {Sections} from '../../../../helpers/sections';
import {City, defaultCity} from '../../../../models/misc/City';
import {getCity, updateCity} from '../../../../requests/misc/City';
import Select from 'react-select';
import {Country} from '../../../../models/misc/Country';
import {getAllCountries} from '../../../../requests/misc/Country';
import {CitySchema} from '../core/form';

const CityEdit: React.FC = () => {
    const [city, setCity] = useState<City>(defaultCity);
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
                        setCountries(response.data);
                    }
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_CITIES, PageTypes.EDIT, city.name))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [city]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, city, setCity);
    };

    const multiSelectChangeHandler = (e: any) => {
        genericMultiSelectOnChangeHandler(e, city, setCity, 'country');
    };

    const handleEdit = (e: any) => {
        // we need to update the city's data by doing API call with form
        updateCity(city).then(response => {
            if (axios.isAxiosError(response)) {
                // show errors
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                // show generic error
                setFormErrors([GenericErrorMessage]);
            } else {
                // we got the booking city so we're good
                krysApp.setAlert({message: generateSuccessMessage('city', Actions.EDIT), type: 'success'})
                navigate(`/misc/cities`);
            }
        });
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit City" icon="fa-solid fa-pencil" icon_style="fs-3 text-warning"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={city} validationSchema={CitySchema} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        (formik) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-6" type="text"
                                           placeholder="Enter city name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Country" isRequired={true}/>

                                    <Select name="country"
                                            options={countries}
                                            getOptionLabel={(country) => country?.name}
                                            getOptionValue={(country) => country?.id ? country?.id.toString() : ''}
                                            onChange={multiSelectChangeHandler}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="country" className="mt-2"/>
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