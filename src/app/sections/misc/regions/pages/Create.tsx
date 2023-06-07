import {ErrorMessage, Field, Form, Formik} from "formik";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Select from "react-select";
import {KTCard, KTCardBody} from "../../../../../_metronic/helpers";
import {KTCardHeader} from "../../../../../_metronic/helpers/components/KTCardHeader";
import FormErrors from "../../../../components/forms/FormErrors";
import KrysFormFooter from "../../../../components/forms/KrysFormFooter";
import KrysFormLabel from "../../../../components/forms/KrysFormLabel";
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {genericMultiSelectOnChangeHandler, genericOnChangeHandler,} from "../../../../helpers/form";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {submitRequest} from "../../../../helpers/requests";
import {Sections} from "../../../../helpers/sections";
import {Actions, KrysToastType, PageTypes} from "../../../../helpers/variables";
import {Country} from "../../../../models/misc/Country";
import {useKrysApp} from "../../../../modules/general/KrysApp";
import {getAllCountries} from "../../../../requests/misc/Country";
import {storeRegion} from "../../../../requests/misc/Region";
import {defaultFormFields, FormFields, RegionSchema} from "../core/form";

const RegionCreate: React.FC = () => {

    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);

    const navigate = useNavigate();
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_REGIONS, PageTypes.CREATE))

        submitRequest(getAllCountries, [], (response) => {
            setCountries(response);
        }, setFormErrors);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleCreate = (e: any) => {
        // send API request to create the region
        submitRequest(storeRegion, [form], (response) => {
            krysApp.setAlert({
                message: new AlertMessageGenerator('region', Actions.CREATE, KrysToastType.SUCCESS).message,
                type: KrysToastType.SUCCESS
            });

            navigate(`/misc/regions`);
        }, setFormErrors);
    };

    const multiSelectChangeHandler = (e: any, key: any) => {
        genericMultiSelectOnChangeHandler(e, form, setForm, key);
    };

    return (
        <KTCard>
            <KTCardHeader text="Create New Region"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={RegionSchema} onSubmit={handleCreate} enableReinitialize>
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
                                    <KrysFormLabel text="Country"/>
                                    <Select isMulti name="countries"
                                            options={countries}
                                            getOptionLabel={(country) => country?.name}
                                            getOptionValue={(country) => country?.id ? country?.id.toString() : '0'}
                                            onChange={(e) => multiSelectChangeHandler(e, 'countries')}
                                            placeholder="Select one or more countries"
                                    />

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
        </KTCard>)
}

export default RegionCreate;