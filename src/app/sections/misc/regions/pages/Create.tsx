import React, {useEffect, useState} from "react";
import {KTCard, KTCardBody} from "../../../../../_metronic/helpers";
import {KTCardHeader} from "../../../../../_metronic/helpers/components/KTCardHeader";
import FormErrors from "../../../../components/forms/FormErrors";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {defaultFormFields, RegionSchema, FormFields} from "../core/form";
import KrysFormLabel from "../../../../components/forms/KrysFormLabel";
import KrysFormFooter from "../../../../components/forms/KrysFormFooter";
import {useNavigate} from "react-router-dom";
import {useKrysApp} from "../../../../modules/general/KrysApp";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {Sections} from "../../../../helpers/sections";
import {Actions, KrysToastType, PageTypes} from "../../../../helpers/variables";
import {
    GenericErrorMessage,
    genericMultiSelectOnChangeHandler,
    genericOnChangeHandler,
} from "../../../../helpers/form";
import axios from "axios";
import {extractErrors} from "../../../../helpers/requests";
import {storeRegion} from "../../../../requests/misc/Region";
import Select from "react-select";
import {Country} from "../../../../models/misc/Country";
import {getAllCountries} from "../../../../requests/misc/Country";
import {AlertMessageGenerator} from "../../../../helpers/alertMessageGenerator";

const RegionCreate: React.FC = () => {

    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);

    const navigate = useNavigate();
    const krysApp = useKrysApp();


    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_REGIONS, PageTypes.CREATE))

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

        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, []);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleCreate = (e: any) => {
        // send API request to create the region
        storeRegion(form).then(response => {
                if (axios.isAxiosError(response)) {
                    // we need to show the errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error message
                    setFormErrors([GenericErrorMessage])
                } else {
                    krysApp.setAlert({
                        message: new AlertMessageGenerator('region', Actions.CREATE, KrysToastType.SUCCESS).message,
                        type: KrysToastType.SUCCESS
                    })
                    navigate(`/misc/regions`);
                }
            }
        );
    };

    const multiSelectChangeHandler = (e: any, key: any) => {
        genericMultiSelectOnChangeHandler(e, form, setForm, key);
    };

    return (
        <KTCard>
            <KTCardHeader text="Create New Region" icon="fa-regular fa-plus" icon_style="fs-3 text-success"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={RegionSchema} onSubmit={handleCreate} enableReinitialize>
                    {
                        () => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-6" type="text"
                                           placeholder="Enter Region name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>
                                <div className="mb-7">
                                    <KrysFormLabel text="Country"/>
                                    <Select isMulti name="countries"
                                            options={countries}
                                            getOptionLabel={(country) => country?.name}
                                            getOptionValue={(country) => country?.id ? country?.id.toString() : '0'}
                                            onChange={(e) => multiSelectChangeHandler(e, 'countries')}
                                            placeholder="Select one or more countries"
                                    />

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="country" className="mt-2"/>
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/misc/regions'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>)
}

export default RegionCreate;