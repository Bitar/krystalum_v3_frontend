import axios from 'axios';
import {Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {InputGroup} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import Select from 'react-select';
import {DatePicker} from 'rsuite';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';

import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysRadioButton from '../../../../components/forms/KrysRadioButton';
import {REVENUE_TYPE} from '../../../../enums/Supply/RevenueType';
import {AlertMessageGenerator} from '../../../../helpers/AlertMessageGenerator';
import {filterData} from '../../../../helpers/dataManipulation';
import {
    genericDateOnChangeHandler,
    GenericErrorMessage,
    genericOnChangeHandler,
    genericSingleSelectOnChangeHandler
} from '../../../../helpers/form';

import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {extractErrors} from '../../../../helpers/requests';
import {Sections} from '../../../../helpers/sections';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {Country} from '../../../../models/misc/Country';
import {Tier} from '../../../../models/misc/Tier';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {getAllCountries} from '../../../../requests/misc/Country';
import {getAllTiers} from '../../../../requests/misc/Tier';
import {storePublisher} from '../../../../requests/supply/publisher/Publisher';
import {defaultFormFields, FormFields, PublisherSchema} from '../core/form';

const PublisherCreate: React.FC = () => {
    const navigate = useNavigate();
    const krysApp = useKrysApp();

    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [tiers, setTiers] = useState<Tier[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.SUPPLY_PUBLISHERS, PageTypes.CREATE))

        // get the tiers
        getAllTiers().then(response => {
            if (axios.isAxiosError(response)) {
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                setFormErrors([GenericErrorMessage])
            } else {
                // if we were able to get the list of tiers, then we fill our state with them
                if (response.data) {
                    setTiers(response.data);
                }
            }
        });

        // get the countries
        getAllCountries().then(response => {
            if (axios.isAxiosError(response)) {
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                setFormErrors([GenericErrorMessage])
            } else {
                // if we were able to get the list of countries, then we fill our state with them
                if (response.data) {
                    setCountries(filterData(response.data, 'name', ['All Countries']));
                }
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const selectChangeHandler = (e: any, key: string) => {
        genericSingleSelectOnChangeHandler(e, form, setForm, key);
    };

    const dateChangeHandler = (date: Date | null, key: string) => {
        genericDateOnChangeHandler(date, form, setForm, key);
    };

    const handleCreate = () => {
        // send API request to create the publisher
        storePublisher(form).then(response => {
                if (axios.isAxiosError(response)) {
                    // we need to show the errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error message
                    setFormErrors([GenericErrorMessage])
                } else {
                    // it's publisher for sure
                    krysApp.setAlert({
                        message: new AlertMessageGenerator('publisher', Actions.CREATE, KrysToastType.SUCCESS).message,
                        type: KrysToastType.SUCCESS
                    })

                    navigate(`/supply/publishers`);
                }
            }
        );
    };

    return (
        <KTCard>
            <KTCardHeader text="Create New Publisher"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={PublisherSchema} onSubmit={handleCreate}
                        enableReinitialize>
                    {
                        ({errors}) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-4">
                                    <span className="fs-5 text-gray-700 d-flex fw-medium">General Information</span>
                                    <span className="text-muted">Enter basic information about the publisher</span>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter publisher name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        {errors?.name ? errors?.name : null}
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Tier" isRequired={false}/>

                                    <Select name="tier_id"
                                            options={tiers}
                                            getOptionLabel={(tier) => tier.name}
                                            getOptionValue={(tier) => tier.id.toString()}
                                            onChange={(e) => {
                                                selectChangeHandler(e, 'tier_id')
                                            }}
                                            placeholder="Select a tier"/>

                                    <div className="mt-1 text-danger">
                                        {errors?.tier_id ? errors?.tier_id : null}
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Integration date" isRequired={false}/>

                                    <DatePicker name="integration_date"
                                                className="krys-datepicker"
                                                oneTap={true}
                                                block
                                                isoWeek
                                                preventOverflow={false}
                                                placeholder="Select publisher integration date"
                                                onChange={(date) => dateChangeHandler(date, 'integration_date')}
                                    />

                                    <div className="mt-1 text-danger">
                                        {errors?.integration_date ? errors?.integration_date : null}
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Revenue type" isRequired={true}/>

                                    <KrysRadioButton name="revenue_type" label={'Revenue Share'}
                                                     onChangeHandler={(e) => {
                                                         e.stopPropagation();
                                                         setForm({...form, revenue_type: REVENUE_TYPE.REVENUE_SHARE});
                                                     }}
                                                     defaultValue={form.revenue_type === REVENUE_TYPE.REVENUE_SHARE}/>

                                    <KrysRadioButton name="revenue_type" label={'Amount Commitment'}
                                                     onChangeHandler={(e) => {
                                                         e.stopPropagation();
                                                         setForm({...form, revenue_type: REVENUE_TYPE.COMMITMENT});
                                                     }} defaultValue={form.revenue_type === REVENUE_TYPE.COMMITMENT}/>

                                    <div className="mt-1 text-danger">
                                        {errors?.revenue_type ? errors?.revenue_type : null}
                                    </div>
                                </div>

                                {form.revenue_type === REVENUE_TYPE.REVENUE_SHARE &&
                                    <div className="mb-7">
                                        <KrysFormLabel text="Revenue share" isRequired={true}/>

                                        <InputGroup className="mb-3">
                                            <Field className="form-control fs-base" type="number"
                                                   placeholder="Enter publisher revenue share"
                                                   name="revenue_value"/>
                                            <InputGroup.Text id="basic-addon1">%</InputGroup.Text>
                                        </InputGroup>

                                        <div className="mt-1 text-danger">
                                            {errors?.revenue_value ? errors?.revenue_value : null}
                                        </div>
                                    </div>
                                }

                                {form.revenue_type === REVENUE_TYPE.COMMITMENT &&
                                    <div className="mb-7">
                                        <KrysFormLabel text="Commitment" isRequired={true}/>

                                        <Field className="form-control fs-base" type="text"
                                               placeholder="Enter publisher commitment amount" name="revenue_value"/>

                                        <div className="mt-1 text-danger">
                                            {errors?.revenue_value ? errors?.revenue_value : null}
                                        </div>
                                    </div>
                                }

                                <div className="separator border-2 my-10"></div>

                                <div className="mb-4">
                                    <span className="fs-5 text-gray-700 d-flex fw-medium">HQ Information</span>
                                    <span
                                        className="text-muted">Enter the hq details about the publisher to stay connected and
                                understand your publishers' location</span>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Email address" isRequired={false}/>

                                    <Field className="form-control fs-base" type="email"
                                           placeholder="Enter publisher email address" name="email"/>

                                    <div className="mt-1 text-danger">
                                        {errors?.email ? errors?.email : null}
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="HQ address" isRequired={false}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter publisher hq address" name="hq_address"/>

                                    <div className="mt-1 text-danger">
                                        {errors?.hq_address ? errors?.hq_address : null}
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="HQ country" isRequired={false}/>

                                    <Select name="hq_country_id"
                                            menuPlacement={'top'}
                                            options={countries}
                                            getOptionLabel={(country) => country?.name}
                                            getOptionValue={(country) => country?.id.toString()}
                                            onChange={(e) => {
                                                selectChangeHandler(e, 'hq_country_id')
                                            }}
                                            placeholder="Select a hq country"
                                            isClearable={true}/>

                                    <div className="mt-1 text-danger">
                                        {errors?.hq_country_id ? errors?.hq_country_id : null}
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/supply/publishers'}/>
                            </Form>

                        )}
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default PublisherCreate;