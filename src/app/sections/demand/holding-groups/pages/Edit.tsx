import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik} from 'formik';

import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {GenericErrorMessage, genericOnChangeHandler, genericSelectOnChangeHandler} from '../../../../helpers/form';
import {extractErrors} from '../../../../helpers/requests';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {defaultFormFields, FormFields, HoldingGroupSchema} from '../core/form';
import {AlertMessageGenerator} from "../../../../helpers/alertMessageGenerator";
import {getHoldingGroup, updateHoldingGroup} from '../../../../requests/demand/HoldingGroup';
import {getAllRegions} from '../../../../requests/misc/Region';
import {filterData} from '../../../../helpers/dataManipulation';
import {getAllTradingDesks} from '../../../../requests/demand/TradingDesk';
import {Region} from '../../../../models/misc/Region';
import {TradingDesk} from '../../../../models/demand/TradingDesk';
import Select from 'react-select';


const HoldingGroupEdit: React.FC = () => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [regions, setRegions] = useState<Region[]>([]);
    const [tradingDesks, setTradingDesks] = useState<TradingDesk[]>([]);

    const krysApp = useKrysApp();

    const navigate = useNavigate();

    let {id} = useParams();

    useEffect(() => {
        if (id) {
            // get the holding group we need to edit from the database
            getHoldingGroup(parseInt(id)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch the holding group to edit so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    navigate('/error/400');
                } else {
                    // since we have single select, we take the region and holding group as is from the API
                    // and set them to form
                    // we need to set the response's tradingDesk as the form's trading_desk
                    const {tradingDesk, ...currentHoldingGroup} = response

                    if(tradingDesk) {
                        setForm({...currentHoldingGroup, trading_desk: tradingDesk});
                    } else {
                        setForm(currentHoldingGroup);
                    }
                }
            });

            // get the list of regions to fill the dropdown
            getAllRegions().then(response => {
                if (axios.isAxiosError(response)) {
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    setFormErrors([GenericErrorMessage])
                } else {
                    // if we were able to get the list of roles, then we fill our state with them
                    if (response.data) {
                        let allRegions = filterData(response.data, 'name', 'All Regions');
                        allRegions = filterData(allRegions, 'name', 'Rest of the world')

                        setRegions(allRegions);
                    }
                }
            });

            // get the list of trading desks to fill dropdown
            getAllTradingDesks().then(response => {
                if (axios.isAxiosError(response)) {
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    setFormErrors([GenericErrorMessage])
                } else {
                    // if we were able to get the list of roles, then we fill our state with them
                    if (response.data) {
                        setTradingDesks(response.data);
                    }
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.DEMAND_HOLDING_GROUPS, PageTypes.EDIT, form.name))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleEdit = (e: any) => {
        // we need to update the holding group's data by doing API call with form
        updateHoldingGroup(form).then(response => {
            if (axios.isAxiosError(response)) {
                // show errors
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                // show generic error
                setFormErrors([GenericErrorMessage]);
            } else {
                // we got the updated holding group so we're good
                krysApp.setAlert({
                    message: new AlertMessageGenerator('holding group', Actions.EDIT, KrysToastType.SUCCESS).message,
                    type: KrysToastType.SUCCESS
                })

                navigate(`/demand/holding-groups`);
            }
        });
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Holding Group" icon="fa-solid fa-pencil" icon_style="fs-3 text-warning"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={HoldingGroupSchema} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        (formik) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-6" type="text"
                                           placeholder="Enter holding group name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Region" isRequired={true}/>

                                    <Select name="region"
                                            options={regions}
                                            getOptionLabel={(region) => region.name}
                                            getOptionValue={(region) => region.id.toString()}
                                            value={form.region} // make the default value as the first region
                                            onChange={(e) => genericSelectOnChangeHandler(e, form, setForm, 'region')}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="region" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Trading desk" isRequired={false}/>

                                    <Select name="trading_desk"
                                            options={tradingDesks}
                                            getOptionLabel={(tradingDesk) => tradingDesk.name}
                                            getOptionValue={(tradingDesk) => tradingDesk.id.toString()}
                                            value={form.trading_desk}
                                            onChange={(e) => genericSelectOnChangeHandler(e, form, setForm, 'trading_desk')}
                                            isClearable={true}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="trading_desk" className="mt-2"/>
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/demand/holding-groups'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default HoldingGroupEdit;