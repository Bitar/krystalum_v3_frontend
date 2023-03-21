import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import {DatePicker} from 'rsuite';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {InputGroup} from 'react-bootstrap';
import axios from 'axios';

import KrysFormFooter from '../../../../../components/forms/KrysFormFooter';
import {useKrysApp} from '../../../../../modules/general/KrysApp';
import {extractErrors} from '../../../../../helpers/requests';
import {
    genericDateOnChangeHandler,
    GenericErrorMessage,
    genericOnChangeHandler,
    genericSelectOnChangeHandler
} from '../../../../../helpers/form';
import {Actions, KrysToastType} from '../../../../../helpers/variables';
import {AlertMessageGenerator} from '../../../../../helpers/alertMessageGenerator';
import FormErrors from '../../../../../components/forms/FormErrors';
import {KTCard, KTCardBody} from '../../../../../../_metronic/helpers';
import {COMMITMENT, Publisher, REVENUE_SHARE} from '../../../../../models/supply/Publisher';
import {defaultFormFields, FormFields, PublisherSchema} from '../../core/form';
import {updatePublisher} from '../../../../../requests/supply/Publisher';
import KrysFormLabel from '../../../../../components/forms/KrysFormLabel';
import KrysRadioButton from '../../../../../components/forms/KrysRadioButton';
import {getAllTiers} from '../../../../../requests/misc/Tier';
import {getAllCountries} from '../../../../../requests/misc/Country';
import {filterData} from '../../../../../helpers/dataManipulation';
import {Tier} from '../../../../../models/misc/Tier';
import {Country} from '../../../../../models/misc/Country';

interface Props {
    publisher: Publisher | null
}

const BasicInformation: React.FC<Props> = ({publisher}) => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [tiers, setTiers] = useState<Tier[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);

    const krysApp = useKrysApp();

    useEffect(() => {
        if (publisher) {
            const {info, accountManager, ...currentPublisher} = publisher
            console.log(publisher)
            setForm({
                ...currentPublisher,
                email: info?.email,
                hq_address: info?.hq_address,
                hq_country: info?.hq_country
            });

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
                        setCountries(filterData(response.data, 'name', 'All Countries'));
                    }
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publisher]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const selectChangeHandler = (e: any, key: string) => {
        genericSelectOnChangeHandler(e, form, setForm, key);
    };

    const dateChangeHandler = (date: Date | null, key: string) => {
        genericDateOnChangeHandler(date, form, setForm, key);
    };

    const handleEdit = () => {
        console.log(form)
        // send API request to create the publisher
        updatePublisher(form).then(response => {
                if (axios.isAxiosError(response)) {
                    // we need to show the errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error message
                    setFormErrors([GenericErrorMessage])
                } else {
                    // we were able to store the publisher
                    krysApp.setAlert({
                        message: new AlertMessageGenerator('publisher', Actions.EDIT, KrysToastType.SUCCESS).message,
                        type: KrysToastType.SUCCESS
                    });
                }
            }
        );
    };

    return (
        <KTCard className="card-bordered border-1">
            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={PublisherSchema} onSubmit={handleEdit}
                        enableReinitialize>
                    <Form onChange={onChangeHandler}>
                        <div className="mb-7">
                            <KrysFormLabel text="Name" isRequired={true}/>

                            <Field className="form-control fs-6" type="text"
                                   placeholder="Enter publisher name" name="name"/>

                            <div className="mt-1 text-danger">
                                <ErrorMessage name="name" className="mt-2"/>
                            </div>
                        </div>

                        <div className="mb-7">
                            <KrysFormLabel text="Tier" isRequired={false}/>

                            <Select name="tier"
                                    value={form.tier}
                                    options={tiers}
                                    getOptionLabel={(tier) => tier?.name}
                                    getOptionValue={(tier) => tier?.id.toString()}
                                    onChange={(e) => {
                                        selectChangeHandler(e, 'tier')
                                    }}
                                    placeholder="Select a tier"
                                    isClearable={true}/>

                            <div className="mt-1 text-danger">
                                <ErrorMessage name="tier" className="mt-2"/>
                            </div>
                        </div>

                        <div className="mb-7">
                            <KrysFormLabel text="Integration date" isRequired={false}/>

                            <DatePicker name="integration_date"
                                        value={(form.integration_date ? new Date(form.integration_date) : null)}
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
                                                 setForm({...form, revenue_type: REVENUE_SHARE});
                                             }} defaultValue={form.revenue_type === REVENUE_SHARE}/>

                            <KrysRadioButton name="revenue_type" label={'Amount Commitment'}
                                             onChangeHandler={(e) => {
                                                 e.stopPropagation();
                                                 setForm({...form, revenue_type: COMMITMENT});
                                             }} defaultValue={form.revenue_type === COMMITMENT}/>

                            <div className="mt-1 text-danger">
                                <ErrorMessage name="revenue_type" className="mt-2"/>
                            </div>
                        </div>

                        {form.revenue_type === REVENUE_SHARE &&
                            <div className="mb-7">
                                <KrysFormLabel text="Revenue share" isRequired={true}/>

                                <InputGroup className="mb-3">
                                    <Field className="form-control fs-6" type="number"
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

                                <Field className="form-control fs-6" type="text"
                                       placeholder="Enter publisher commitment amount" name="commitment"/>

                                <div className="mt-1 text-danger">
                                    <ErrorMessage name="commitment" className="mt-2"/>
                                </div>
                            </div>
                        }

                        <div className="separator border-2 my-10"></div>

                        <div className="mb-7">
                            <KrysFormLabel text="Email address" isRequired={false}/>

                            <Field className="form-control fs-6" type="email"
                                   placeholder="Enter publisher email address" name="email"/>

                            <div className="mt-1 text-danger">
                                <ErrorMessage name="email" className="mt-2"/>
                            </div>
                        </div>

                        <div className="mb-7">
                            <KrysFormLabel text="HQ address" isRequired={false}/>

                            <Field className="form-control fs-6" type="text"
                                   placeholder="Enter publisher hq address" name="hq_address"/>

                            <div className="mt-1 text-danger">
                                <ErrorMessage name="hq_address" className="mt-2"/>
                            </div>
                        </div>

                        <div className="mb-7">
                            <KrysFormLabel text="HQ country" isRequired={false}/>

                            <Select name="hq_country"
                                    value={form.hq_country}
                                    menuPlacement={'top'}
                                    options={countries}
                                    getOptionLabel={(country) => country?.name}
                                    getOptionValue={(country) => country?.id.toString()}
                                    onChange={(e) => {
                                        selectChangeHandler(e, 'hq_country')
                                    }}
                                    placeholder="Select a hq country"
                                    isClearable={true}/>

                            <div className="mt-1 text-danger">
                                <ErrorMessage name="hq_country" className="mt-2"/>
                            </div>
                        </div>

                        <KrysFormFooter cancelUrl={'/supply/publishers'}/>
                    </Form>
                </Formik>
            </KTCardBody>
        </KTCard>
    );
}

export default BasicInformation;