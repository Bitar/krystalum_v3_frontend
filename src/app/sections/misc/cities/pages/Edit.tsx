import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import SingleSelect from '../../../../components/forms/SingleSelect';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {filterData} from '../../../../helpers/dataManipulation';
import {genericOnChangeHandler,} from '../../../../helpers/form';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {getErrorPage, submitRequest} from '../../../../helpers/requests';
import {Sections} from '../../../../helpers/sections';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {City} from '../../../../models/misc/City';
import {Country} from '../../../../models/misc/Country';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {getCity, updateCity} from '../../../../requests/misc/City';
import {getAllCountries} from '../../../../requests/misc/Country';
import {CitySchema, defaultFormFields, FormFields} from '../core/form';

const CityEdit: React.FC = () => {
    const [city, setCity] = useState<City | null>(null);
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
            submitRequest(getCity, [parseInt(id)], (response) => {
                let errorPage = getErrorPage(response);

                if (errorPage) {
                    navigate(errorPage);
                } else {
                    // we were able to fetch current city to edit
                    setCity(response);

                    const {country, ...currentCity} = response;

                    setForm({...currentCity, country_id: country.id});
                }
            });

            // get the countries
            submitRequest(getAllCountries, [], (response) => {
                setCountries(filterData(response, 'name', ['All Countries']));
            }, setFormErrors);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (city) {
            krysApp.setPageTitle(generatePageTitle(Sections.MISC_CITIES, PageTypes.EDIT, city.name))

            setIsResourceLoaded(true);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [city]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleEdit = (e: any) => {
        if (city) {
            // we need to update the city's data by doing API call with form
            submitRequest(updateCity, [city.id, form], (response) => {
                // we got the booking city so we're good
                krysApp.setAlert({
                    message: new AlertMessageGenerator('city', Actions.EDIT, KrysToastType.SUCCESS).message,
                    type: KrysToastType.SUCCESS
                });

                navigate(`/misc/cities`);
            }, setFormErrors);
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit City"/>

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

                                    <SingleSelect isResourceLoaded={isResourceLoaded} options={countries}
                                                  defaultValue={city?.country} form={form} setForm={setForm}
                                                  name='country_id'/>

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
