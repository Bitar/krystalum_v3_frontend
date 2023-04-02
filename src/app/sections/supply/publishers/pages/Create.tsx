import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import Select from 'react-select';
import {InputGroup} from 'react-bootstrap';
import {DatePicker} from 'rsuite';

import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';

import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {PublisherSchema, defaultFormFields, FormFields} from '../core/form';
import {
    genericDateOnChangeHandler,
    GenericErrorMessage,
    genericOnChangeHandler,
    genericSingleSelectOnChangeHandler
} from '../../../../helpers/form';
import {extractErrors} from '../../../../helpers/requests';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {storePublisher} from '../../../../requests/supply/publisher/Publisher';
import {AlertMessageGenerator} from '../../../../helpers/AlertMessageGenerator';
import {Tier} from '../../../../models/misc/Tier';
import {getAllTiers} from '../../../../requests/misc/Tier';
import KrysRadioButton from '../../../../components/forms/KrysRadioButton';
import {COMMITMENT, REVENUE_SHARE} from '../../../../models/supply/publisher/Publisher';
import {Country} from '../../../../models/misc/Country';
import {getAllCountries} from '../../../../requests/misc/Country';
import {filterData} from '../../../../helpers/dataManipulation';

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
                    <Form onChange={onChangeHandler}>
                        <div className="mb-7">
                            <KrysFormLabel text="Name" isRequired={true}/>

                            <Field className="form-control fs-base" type="text"
                                   placeholder="Enter publisher name" name="name"/>

                            <div className="mt-1 text-danger">
                                <ErrorMessage name="name" className="mt-2"/>
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
                                <ErrorMessage name="tier_id" className="mt-2"/>
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
                                <ErrorMessage name="integration_date" className="mt-2"/>
                            </div>
                        </div>

                        <div className="mb-7">
                            <KrysFormLabel text="Revenue type" isRequired={true}/>

                            <KrysRadioButton name="revenue_type" label={'Revenue Share'}
                                             onChangeHandler={(e) => {
                                                 e.stopPropagation();
                                                 setForm({...form, revenue_type: REVENUE_SHARE, commitment: ''});
                                             }} defaultValue={form.revenue_type === REVENUE_SHARE}/>

                            <KrysRadioButton name="revenue_type" label={'Amount Commitment'}
                                             onChangeHandler={(e) => {
                                                 e.stopPropagation();
                                                 setForm({...form, revenue_type: COMMITMENT, revenue_share: ''});
                                             }} defaultValue={form.revenue_type === COMMITMENT}/>

                            <div className="mt-1 text-danger">
                                <ErrorMessage name="revenue_type" className="mt-2"/>
                            </div>
                        </div>

                        {form.revenue_type === REVENUE_SHARE &&
                            <div className="mb-7">
                                <KrysFormLabel text="Revenue share" isRequired={true}/>

                                <InputGroup className="mb-3">
                                    <Field className="form-control fs-base" type="number"
                                           placeholder="Enter publisher revenue share"
                                           name="revenue_share"/>
                                    <InputGroup.Text id="basic-addon1">%</InputGroup.Text>
                                </InputGroup>

                                <div className="mt-1 text-danger">
                                    <ErrorMessage name="revenue_share" className="mt-2"/>
                                </div>
                            </div>
                        }

                        {form.revenue_type === COMMITMENT &&
                            <div className="mb-7">
                                <KrysFormLabel text="Commitment" isRequired={true}/>

                                <Field className="form-control fs-base" type="text"
                                       placeholder="Enter publisher commitment amount" name="commitment"/>

                                <div className="mt-1 text-danger">
                                    <ErrorMessage name="commitment" className="mt-2"/>
                                </div>
                            </div>
                        }

                        <div className="separator border-2 my-10"></div>

                        <div className="mb-7">
                            <KrysFormLabel text="Email address" isRequired={false}/>

                            <Field className="form-control fs-base" type="email"
                                   placeholder="Enter publisher email address" name="email"/>

                            <div className="mt-1 text-danger">
                                <ErrorMessage name="email" className="mt-2"/>
                            </div>
                        </div>

                        <div className="mb-7">
                            <KrysFormLabel text="HQ address" isRequired={false}/>

                            <Field className="form-control fs-base" type="text"
                                   placeholder="Enter publisher hq address" name="hq_address"/>

                            <div className="mt-1 text-danger">
                                <ErrorMessage name="hq_address" className="mt-2"/>
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
                                <ErrorMessage name="hq_country_id" className="mt-2"/>
                            </div>
                        </div>

                        <KrysFormFooter cancelUrl={'/supply/publishers'}/>
                    </Form>
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default PublisherCreate;