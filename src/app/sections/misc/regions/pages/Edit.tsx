import {ErrorMessage, Field, Form, Formik} from "formik";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Select from 'react-select';
import {KTCard, KTCardBody} from "../../../../../_metronic/helpers";
import {KTCardHeader} from "../../../../../_metronic/helpers/components/KTCardHeader";
import FormErrors from "../../../../components/forms/FormErrors";
import KrysFormFooter from "../../../../components/forms/KrysFormFooter";
import KrysFormLabel from "../../../../components/forms/KrysFormLabel";
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {genericMultiSelectOnChangeHandler, genericOnChangeHandler,} from "../../../../helpers/form";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {getErrorPage, submitRequest} from "../../../../helpers/requests";
import {Sections} from "../../../../helpers/sections";
import {Actions, KrysToastType, PageTypes} from "../../../../helpers/variables";
import {Country} from "../../../../models/misc/Country";
import {Region} from "../../../../models/misc/Region";
import {useKrysApp} from "../../../../modules/general/KrysApp";
import {getAllCountries} from "../../../../requests/misc/Country";
import {getRegion, updateRegion} from "../../../../requests/misc/Region";
import {defaultFormFields, FormFields, RegionSchema} from "../core/form";

const RegionEdit: React.FC = () => {
    const [region, setRegion] = useState<Region | null>(null);
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);

    const navigate = useNavigate();
    const krysApp = useKrysApp();
    let {id} = useParams();

    useEffect(() => {
        if (id) {
            submitRequest(getAllCountries, [], (response) => {
                setCountries(response);
            }, setFormErrors);


            // get the permission we need to edit from the database
            submitRequest(getRegion, [parseInt(id)], (response) => {
                let errorPage = getErrorPage(response);

                if (errorPage) {
                    navigate(errorPage);
                } else {
                    // we were able to fetch current regions to edit
                    setRegion(response);

                    krysApp.setPageTitle(generatePageTitle(Sections.MISC_REGIONS, PageTypes.EDIT, response.name));

                    const {countries, ...currentRegion} = response

                    setForm({
                        ...currentRegion,
                        countries: countries.map((country: Country) => country.id),
                    });

                    setSelectedCountries(countries);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleEdit = () => {
        if (region) {
            submitRequest(updateRegion, [region.id, form], (response) => {
                // we update the region
                krysApp.setAlert({
                    message: new AlertMessageGenerator('region', Actions.EDIT, KrysToastType.SUCCESS).message,
                    type: KrysToastType.SUCCESS
                });

                navigate(`/misc/regions`);
            }, setFormErrors);
        }
    }


    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    return (
        <KTCard>
            <KTCardHeader text="Edit Region"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={RegionSchema} onSubmit={handleEdit} enableReinitialize>
                    {
                        () => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter Region name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>
                                <div className="mb-7">
                                    <KrysFormLabel text="Countries" isRequired={false}/>

                                    <Select isMulti name={'countries'} value={selectedCountries}
                                            options={countries}
                                            getOptionLabel={(instance) => instance.name}
                                            getOptionValue={(instance) => instance.id.toString()}
                                            placeholder={`Select one or more countries`}
                                            isClearable={true}
                                            onChange={(e) => {
                                                genericMultiSelectOnChangeHandler(e, form, setForm, 'countries');
                                                setSelectedCountries(e as Country[]);
                                            }
                                            }/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="countries" className="mt-2"/>
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/misc/regions'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default RegionEdit;