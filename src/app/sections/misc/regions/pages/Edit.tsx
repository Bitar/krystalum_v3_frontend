import React, {useEffect, useState} from "react";
import {KTCard, KTCardBody} from "../../../../../_metronic/helpers";
import {KTCardHeader} from "../../../../../_metronic/helpers/components/KTCardHeader";
import FormErrors from "../../../../components/forms/FormErrors";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {defaultFormFields, FormFields, RegionSchema} from "../core/form";
import KrysFormLabel from "../../../../components/forms/KrysFormLabel";
import KrysFormFooter from "../../../../components/forms/KrysFormFooter";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {Sections} from "../../../../helpers/sections";
import {Actions, PageTypes} from "../../../../helpers/variables";
import {getRegion,updateRegion} from "../../../../requests/misc/Region";
import axios from "axios";
import {extractErrors} from "../../../../helpers/requests";
import {
    GenericErrorMessage,
    genericOnChangeHandler,
} from "../../../../helpers/form";
import {getAllCountries} from "../../../../requests/misc/Country";
import {Country} from "../../../../models/misc/Country";
import {Region} from "../../../../models/misc/Region";
import {useNavigate, useParams} from "react-router-dom";
import {useKrysApp} from "../../../../modules/general/KrysApp";
import {AlertMessageGenerator} from "../../../../helpers/alertMessageGenerator";
import {KrysToastType} from '../../../../helpers/variables';
import MultiSelect from "../../../../components/forms/MultiSelect";

const RegionEdit: React.FC = () => {
    const [region, setRegion] = useState<Region|null>(null);
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [isResourceLoaded, setIsResourceLoaded] = useState<boolean>(false);

    const navigate = useNavigate();
    const krysApp = useKrysApp();
    let {id} = useParams();

    useEffect(() => {
        if (id) {
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


            // get the permission we need to edit from the database
            getRegion(parseInt(id)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch the permission to edit so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    navigate('/error/400');
                } else {
                    // we were able to fetch current regions to edit
                    setRegion(response);

                    const {countries, ...currentRegion} = response

                    setForm({
                        ...currentRegion,
                        countries: response.countries.map(country => country.id),
                    });
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (region) {
            setIsResourceLoaded(true);

            krysApp.setPageTitle(generatePageTitle(Sections.MISC_REGIONS, PageTypes.EDIT))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [region]);


    const handleEdit = () => {
        updateRegion(form).then(response => {
            if (axios.isAxiosError(response)) {
                // show errors
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                // show generic error
                setFormErrors([GenericErrorMessage]);
            } else {
                // we update the region
                krysApp.setAlert({
                    message: new AlertMessageGenerator('region', Actions.EDIT, KrysToastType.SUCCESS).message,
                    type: KrysToastType.SUCCESS
                })
                navigate(`/misc/regions`);
            }
        });
    }


    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    return (
        <KTCard>
            <KTCardHeader text="Edit Region" icon="fa-regular fa-plus" icon_style="fs-3 text-success"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={RegionSchema} onSubmit={handleEdit} enableReinitialize>
                    {
                        (formik) => (
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
                                    <KrysFormLabel text="Countries" isRequired={true}/>

                                    <MultiSelect isResourceLoaded={isResourceLoaded} options={countries}
                                                 defaultValue={region?.countries} form={form} setForm={setForm}
                                                 name={'countries'}/>

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