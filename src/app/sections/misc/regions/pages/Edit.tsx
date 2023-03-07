import React, {useEffect, useState} from "react";
import {KTCard, KTCardBody} from "../../../../../_metronic/helpers";
import {KTCardHeader} from "../../../../../_metronic/helpers/components/KTCardHeader";
import FormErrors from "../../../../components/forms/FormErrors";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {defaultFormFields, FormFields, RegionSchema} from "../core/form";
import KrysFormLabel from "../../../../components/forms/KrysFormLabel";
import Select from "react-select";
import KrysFormFooter from "../../../../components/forms/KrysFormFooter";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {Sections} from "../../../../helpers/sections";
import {Actions, PageTypes} from "../../../../helpers/variables";
import {getAllRegions, getRegion, getRegions, getTypes} from "../../../../requests/misc/Region";
import axios from "axios";
import {extractErrors} from "../../../../helpers/requests";
import {
    GenericErrorMessage,
    genericMultiSelectOnChangeHandler,
    genericOnChangeHandler,
    genericSelectOnChangeHandler
} from "../../../../helpers/form";
import {getAllCountries} from "../../../../requests/misc/Country";
import {Country} from "../../../../models/misc/Country";
import {Region} from "../../../../models/misc/Region";
import {useNavigate, useParams} from "react-router-dom";
import {useKrysApp} from "../../../../modules/general/KrysApp";


type ShowRegionOrCountry = {
    [key: string]: boolean;
}
const RegionEdit: React.FC = () => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [types, setTypes] = useState<Array<any>>([]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [regions, setRegions] = useState<Region[]>([]);
    const [showRegionOrCountry, setShowRegionOrCountry] = useState<ShowRegionOrCountry>({});

    const navigate = useNavigate();
    const krysApp = useKrysApp();
    let {id} = useParams();

    useEffect(() => {
        if (id) {
            // get the permissions so we can edit the role's permissions
            getTypes().then(response => {
                if (axios.isAxiosError(response)) {
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    setFormErrors([GenericErrorMessage])
                } else {
                    // if we were able to get the list of  types, then we fill our state with them
                    if (response.data) {
                        setTypes(response.data);
                    }
                }
            });

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

            getAllRegions().then(response => {
                if (axios.isAxiosError(response)) {
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    setFormErrors([GenericErrorMessage])
                } else {
                    // if we were able to get the list of countries, then we fill our state with them
                    if (response.data) {
                        setRegions(response.data);
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

                    // we were able to fetch current permission to edit


                    const {type, ...name} = response;

                    console.log(type);
                    console.log(name);
                 //   setForm({response.name,response.type});

                  /*  const {permissions, ...currentRole} = response

                    setForm({...currentRole, permissions: response.permissions.map(permission => permission.id)});*/

                   /* if(response.countries.length>0){
                        if(response.regions.length>0){
                            setTypes('3');
                        }
                        setTypes('2');
                    }

                    if(response.regions.length>0){
                        setTypes("1");
                    }*/
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_REGIONS, PageTypes.EDIT))


        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, []);

    const handleEdit = (e: any) => {
        // we need to update the permission's data by doing API call with form
     /*   updateRole(form).then(response => {
            if (axios.isAxiosError(response)) {
                // show errors
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                // show generic error
                setFormErrors([GenericErrorMessage]);
            } else {
                // we got the updated permission so we're good
                krysApp.setAlert({message: generateSuccessMessage('role', Actions.EDIT), type: 'success'})
                navigate(`/iam/roles`);
            }
        });*/
    }

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const selectChangeHandler = (e: any, key: any) => {
        genericSelectOnChangeHandler(e, form, setForm, key);

        if (key == 'type') {
            setShowRegionOrCountry((prevShowState) => ({
                ...prevShowState,
                showRegions: false,
                showCountries: false,
                showBoth: false,
                [`show${e.name}`]: true
            }));
        }
    };

    const multiSelectChangeHandler = (e: any, key: any) => {
        genericMultiSelectOnChangeHandler(e, form, setForm, key);
    };

    return(
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
                                    <KrysFormLabel text="Type" isRequired={true}/>

                                    <Select name="type"
                                            options={types}
                                            getOptionLabel={(type) => type?.name}
                                            getOptionValue={(type) => type?.id ? type?.id.toString() : ''}
                                            onChange={(e) => selectChangeHandler(e, 'type')}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="type" className="mt-2"/>
                                    </div>
                                </div>
                                {(showRegionOrCountry.showCountries || showRegionOrCountry.showBoth) &&
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
                                }
                                {(showRegionOrCountry.showRegions || showRegionOrCountry.showBoth) &&
                                    <div className="mb-7">
                                        <KrysFormLabel text="Region"/>

                                        <Select isMulti name="regions"
                                                options={regions}
                                                getOptionLabel={(region) => region?.name}
                                                getOptionValue={(region) => region?.id ? region?.id.toString() : '0'}
                                                onChange={(e) => multiSelectChangeHandler(e, 'regions')}
                                                placeholder="Select one or more regions"
                                        />

                                        <div className="mt-1 text-danger">
                                            <ErrorMessage name="region" className="mt-2"/>
                                        </div>
                                    </div>
                                }

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