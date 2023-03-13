import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik} from 'formik';

import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {defaultFormFields, FormFields, HoldingGroupSchema} from '../core/form';
import {GenericErrorMessage, genericOnChangeHandler, genericSelectOnChangeHandler} from '../../../../helpers/form';
import {extractErrors} from '../../../../helpers/requests';
import {AlertMessageGenerator} from '../../../../helpers/alertMessageGenerator';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {storeHoldingGroup} from '../../../../requests/demand/HoldingGroup';
import {getAllRegions} from '../../../../requests/misc/Region';
import {filterData} from '../../../../helpers/dataManipulation';
import {getAllTradingDesks} from '../../../../requests/demand/TradingDesk';
import {Region} from '../../../../models/misc/Region';
import {TradingDesk} from '../../../../models/demand/TradingDesk';
import Select from 'react-select';

const HoldingGroupCreate: React.FC = () => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [regions, setRegions] = useState<Region[]>([]);
    const [tradingDesks, setTradingDesks] = useState<TradingDesk[]>([]);

    const navigate = useNavigate();
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.DEMAND_HOLDING_GROUPS, PageTypes.CREATE));

        getAllRegions().then(response => {
            if (axios.isAxiosError(response)) {
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                setFormErrors([GenericErrorMessage])
            } else {
                // if we were able to get the list of roles, then we fill our state with them
                if (response.data) {
                    setRegions(filterData(response.data, 'name', 'All Regions'));

                    // since the region is required, we set the first region as the default region
                    setForm({...form, region: response.data[1]});
                }
            }
        });

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleCreate = (e: any) => {
        // send API request to create the holding group
        storeHoldingGroup(form).then(response => {
                if (axios.isAxiosError(response)) {
                    // we need to show the errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error message
                    setFormErrors([GenericErrorMessage])
                } else {
                    // it's holding group for sure

                    krysApp.setAlert({
                        message: new AlertMessageGenerator('holding group', Actions.CREATE, KrysToastType.SUCCESS).message,
                        type: KrysToastType.SUCCESS
                    });

                    navigate(`/demand/holding-groups`);
                }
            }
        );
    };

    return (
        <KTCard>
            <KTCardHeader text="Create New Holding Group" icon="fa-regular fa-plus" icon_style="fs-3 text-success"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={HoldingGroupSchema} onSubmit={handleCreate}
                        enableReinitialize>
                    {
                        () => (
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
                                            onChange={(e) => genericSelectOnChangeHandler(e, form, setForm, 'region')}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="region" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Trading desk" isRequired={false}/>

                                    <Select name="tradingDesk"
                                            options={tradingDesks}
                                            getOptionLabel={(tradingDesk) => tradingDesk.name}
                                            getOptionValue={(tradingDesk) => tradingDesk.id.toString()}
                                            onChange={(e) => genericSelectOnChangeHandler(e, form, setForm, 'tradingDesk')}
                                            isClearable={true}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="tradingDesk" className="mt-2"/>
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

export default HoldingGroupCreate;