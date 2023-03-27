import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik} from 'formik';

import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {
    GenericErrorMessage, genericOnChangeHandler, genericSingleSelectOnChangeHandler
} from '../../../../helpers/form';
import {extractErrors} from '../../../../helpers/requests';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {storeAgency} from '../../../../requests/demand/Agency';
import {AgencySchema, defaultFormFields, FormFields} from '../core/form';
import {useKrysApp} from "../../../../modules/general/KrysApp";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {Sections} from "../../../../helpers/sections";
import Select from 'react-select';
import {getAllRegions} from '../../../../requests/misc/Region';
import {filterData} from '../../../../helpers/dataManipulation';
import {getAllHoldingGroups} from '../../../../requests/demand/HoldingGroup';
import {Region} from '../../../../models/misc/Region';
import {HoldingGroup} from '../../../../models/demand/HoldingGroup';
import {AlertMessageGenerator} from '../../../../helpers/AlertMessageGenerator';

const AgencyCreate: React.FC = () => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [regions, setRegions] = useState<Region[]>([]);
    const [holdingGroups, setHoldingGroups] = useState<HoldingGroup[]>([]);
    const [hasHoldingGroup, setHasHoldingGroup] = useState<boolean>(false);

    const krysApp = useKrysApp();
    // we use this to navigate to the index page after the new agency is saved
    const navigate = useNavigate();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.DEMAND_AGENCIES, PageTypes.CREATE));

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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeHandler = (e: any) => {
        // in case of multi select, the element doesn't have a name because
        // we get only a list of values from the select and not an element with target value and name

        // add here any fields you don't want the default handler to handle
        genericOnChangeHandler(e, form, setForm);
    };

    const holdingGroupOnChangeHandler = (e: any) => {
        genericSingleSelectOnChangeHandler(e, form, setForm, 'holding_group_id');

        // make the region optional IF the holding group now has a set value
        if (e) {
            // it means that we have a value for the holding group
            // we need to set has holding group to true
            setHasHoldingGroup(true);
        } else {
            // he cleared the holding group value so we need to set has holding group to false
            setHasHoldingGroup(false);
        }
    };

    const handleCreate = (e: any) => {
        // send API request to create the agency
        storeAgency(form).then(response => {
                if (axios.isAxiosError(response)) {
                    // we need to show the errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error message
                    setFormErrors([GenericErrorMessage])
                } else {
                    // we were able to store the agency
                    krysApp.setAlert({
                        message: new AlertMessageGenerator('agency', Actions.CREATE, KrysToastType.SUCCESS).message,
                        type: KrysToastType.SUCCESS
                    })
                    navigate(`/demand/agencies`);
                }
            }
        );
    };

    return (
        <KTCard>
            <KTCardHeader text="Create New Agency" icon="fa-regular fa-plus" icon_style="fs-3 text-success"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={AgencySchema} onSubmit={handleCreate}
                        enableReinitialize>
                    {
                        ({errors}) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-6" type="text"
                                           placeholder="Enter full name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Holding group" isRequired={false}/>

                                    <Select name="holding_group_id"
                                            options={holdingGroups}
                                            getOptionLabel={(holdingGroup) => holdingGroup.name}
                                            getOptionValue={(holdingGroup) => holdingGroup.id.toString()}
                                            onChange={holdingGroupOnChangeHandler}
                                            isClearable={true}/>

                                    <div className="mt-1 text-danger">
                                        <div className="mt-2">
                                            {errors?.holding_group_id ? errors?.holding_group_id : null}
                                        </div>
                                    </div>
                                </div>

                                {
                                    !hasHoldingGroup && <div className="mb-7">
                                        <KrysFormLabel text="Region" isRequired={!hasHoldingGroup}/>

                                        <Select name="region_id"
                                                options={regions}
                                                getOptionLabel={(region) => region.name}
                                                getOptionValue={(region) => region.id.toString()}
                                                onChange={(e) => genericSingleSelectOnChangeHandler(e, form, setForm, 'region_id')}
                                                isClearable={false}/>

                                        <div className="mt-1 text-danger">
                                            <div className="mt-2">
                                                {errors?.region_id ? errors?.region_id : null}
                                            </div>
                                        </div>
                                    </div>
                                }

                                <KrysFormFooter cancelUrl={'/demand/agencies'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    );
}

export default AgencyCreate;