import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik} from 'formik';

import {Agency} from '../../../../models/demand/Agency';
import {getAgency, updateAgency} from '../../../../requests/demand/Agency';
import {extractErrors} from '../../../../helpers/requests';
import {
    GenericErrorMessage,
    genericOnChangeHandler
} from '../../../../helpers/form';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {defaultFormFields, AgencySchema, FormFields} from '../core/form';
import {useKrysApp} from "../../../../modules/general/KrysApp";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {Sections} from "../../../../helpers/sections";
import {getAllRegions} from '../../../../requests/misc/Region';
import {filterData} from '../../../../helpers/dataManipulation';
import {getAllHoldingGroups} from '../../../../requests/demand/HoldingGroup';
import {Region} from '../../../../models/misc/Region';
import {HoldingGroup} from '../../../../models/demand/HoldingGroup';
import SingleSelect from '../../../../components/forms/SingleSelect';
import clsx from 'clsx';
import {AlertMessageGenerator} from '../../../../helpers/AlertMessageGenerator';

const AgencyEdit: React.FC = () => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [isResourceLoaded, setIsResourceLoaded] = useState<boolean>(false)

    const [regions, setRegions] = useState<Region[]>([]);
    const [holdingGroups, setHoldingGroups] = useState<HoldingGroup[]>([]);

    const [hasHoldingGroup, setHasHoldingGroup] = useState<boolean>(false);

    const [agency, setAgency] = useState<Agency | null>(null);

    const [clearRegion, setClearRegion] = useState<boolean>(false);

    const krysApp = useKrysApp();

    let {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            // get the agency we need to edit from the database
            getAgency(parseInt(id)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch the agency to edit so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    // unknown error occurred
                    navigate('/error/400');
                } else {
                    setAgency(response);
                }
            });

            getAllRegions().then(response => {
                if (axios.isAxiosError(response)) {
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    setFormErrors([GenericErrorMessage])
                } else {
                    // if we were able to get the list of regions, then we fill our state with them
                    if (response.data) {
                        setRegions(filterData(response.data, 'name', ['All Regions', 'Rest of the world']));
                    }
                }
            });

            getAllHoldingGroups().then(response => {
                if (axios.isAxiosError(response)) {
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    setFormErrors([GenericErrorMessage])
                } else {
                    // if we were able to get the list of holding groups, then we fill our state with them
                    if (response.data) {
                        setHoldingGroups(response.data);
                    }
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        // when we're here it means our agency object is loaded from the API
        if (agency) {
            setIsResourceLoaded(true);

            krysApp.setPageTitle(generatePageTitle(Sections.DEMAND_AGENCIES, PageTypes.EDIT, agency.name))

            // then we set the agency object
            const {holdingGroup, region, ...currentAgency} = agency;

            if(agency.holdingGroup) {
                setHasHoldingGroup(true);

                // has holding group
                // we dont set the region
                setForm({...currentAgency, holding_group_id: holdingGroup?.id});
            } else {
                // doesn't have holding group
                // we only set the region
                setForm({...currentAgency, region_id: region.id});
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [agency]);

    const onChangeHandler = (e: any) => {
        // in case of multi select, the element doesn't have a name because
        // we get only a list of values from the select and not an element with target value and name
        genericOnChangeHandler(e, form, setForm);
    };

    useEffect(() => {
        // when we're here it means our agency object is loaded from the API
        if (form.holding_group_id) {
            // it means that we have a value for the holding group
            // we need to set has holding group to true
            setHasHoldingGroup(true);

            // we need to unset the value for region_id because from the backend we will set
            // the region_id the same as the holding group
            setClearRegion(true);

            // clear it from the form object too
            const {region_id, ...newForm} = form

            setForm(newForm);
        } else {
            // he cleared the holding group value so we need to set has holding group to false
            setHasHoldingGroup(false);

            setClearRegion(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.holding_group_id]);

    const handleEdit = (e: any) => {
        if(agency) {
            // send API request to create the agency
            updateAgency(agency.id, form).then(response => {
                    if (axios.isAxiosError(response)) {
                        // we need to show the errors
                        setFormErrors(extractErrors(response));
                    } else if (response === undefined) {
                        // show generic error message
                        setFormErrors([GenericErrorMessage])
                    } else {
                        // we were able to store the agency
                        krysApp.setAlert({
                            message: new AlertMessageGenerator('agency', Actions.EDIT, KrysToastType.SUCCESS).message,
                            type: KrysToastType.SUCCESS
                        });

                        navigate(`/demand/agencies`);
                    }
                }
            );
        }
    };

    return (
        <KTCard>
            <KTCardHeader text="Edit Agency" />

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={AgencySchema} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        ({errors}) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter full name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Holding group" isRequired={false}/>

                                    <SingleSelect isResourceLoaded={isResourceLoaded} options={holdingGroups} defaultValue={agency?.holdingGroup} form={form} setForm={setForm} name='holding_group_id' isClearable={true} />

                                    <div className="mt-1 text-danger">
                                        <div className="mt-2">
                                            {errors?.holding_group_id ? errors?.holding_group_id : null}
                                        </div>
                                    </div>
                                </div>

                                <div className={clsx("mb-7", hasHoldingGroup ? 'd-none' : 'd-block')}>
                                    <KrysFormLabel text="Region" isRequired={!hasHoldingGroup}/>

                                    {/*the region ID default value is only set if the agency doesn't have a holding group*/}
                                    <SingleSelect isResourceLoaded={isResourceLoaded} options={regions} defaultValue={!agency?.holdingGroup ? agency?.region : null} form={form} setForm={setForm} name='region_id' doClear={clearRegion} />

                                    <div className="mt-1 text-danger">
                                        <div className="mt-2">
                                            {errors?.region_id ? errors?.region_id : null}
                                        </div>
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/demand/agencies'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    );
};

export default AgencyEdit;