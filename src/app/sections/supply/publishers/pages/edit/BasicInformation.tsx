import React, {useEffect, useState} from 'react';
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
    genericOnChangeHandler
} from '../../../../../helpers/form';
import {Actions, KrysToastType} from '../../../../../helpers/variables';
import {AlertMessageGenerator} from '../../../../../helpers/AlertMessageGenerator';
import FormErrors from '../../../../../components/forms/FormErrors';
import {KTCard, KTCardBody} from '../../../../../../_metronic/helpers';
import {defaultFormFields, fillEditForm, FormFields, PublisherSchema} from '../../core/form';
import {updatePublisher} from '../../../../../requests/supply/publisher/Publisher';
import KrysFormLabel from '../../../../../components/forms/KrysFormLabel';
import KrysRadioButton from '../../../../../components/forms/KrysRadioButton';
import {getAllTiers} from '../../../../../requests/misc/Tier';
import {getAllCountries} from '../../../../../requests/misc/Country';
import {filterData} from '../../../../../helpers/dataManipulation';
import {Tier} from '../../../../../models/misc/Tier';
import {Country} from '../../../../../models/misc/Country';
import SingleSelect from '../../../../../components/forms/SingleSelect';
import {KTCardHeader} from '../../../../../../_metronic/helpers/components/KTCardHeader';
import {usePublisher} from '../../core/PublisherContext';
import {REVENUE_TYPE} from '../../../../../models/supply/Options';

const BasicInformationEdit: React.FC = () => {
    const {publisher, setPublisher} = usePublisher();
    const krysApp = useKrysApp();

    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [isResourceLoaded, setIsResourceLoaded] = useState<boolean>(false);

    const [tiers, setTiers] = useState<Tier[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        if (publisher) {
            setIsResourceLoaded(true);

            setForm(fillEditForm(publisher));

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
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publisher]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const dateChangeHandler = (date: Date | null, key: string) => {
        genericDateOnChangeHandler(date, form, setForm, key);
    };

    const handleEdit = () => {
        if (publisher) {
            // send API request to update the publisher
            updatePublisher(publisher.id, form).then(response => {
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

                        // set the updated publisher so that the overview will be updated
                        setPublisher(response)

                        setFormErrors([]);
                    }
                }
            );
        }
    };

    return (
        <KTCard className="card-bordered border-1">
            <KTCardHeader text="Update Basic Information"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={PublisherSchema} onSubmit={handleEdit}
                        enableReinitialize>
                    <Form onChange={onChangeHandler}>
                        <div className='mb-4'>
                            <span className='fs-5 text-gray-700 d-flex fw-medium'>General Information</span>
                            <span className='text-muted'>Enter basic information about the publisher</span>
                        </div>

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

                            <SingleSelect isResourceLoaded={isResourceLoaded}
                                          options={tiers}
                                          defaultValue={publisher?.tier}
                                          form={form} setForm={setForm}
                                          name="tier_id" isClearable={true}/>

                            <div className="mt-1 text-danger">
                                <ErrorMessage name="tier_id" className="mt-2"/>
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
                                                 setForm({...form, revenue_type: REVENUE_TYPE.REVENUE_SHARE});
                                             }} defaultValue={form.revenue_type === REVENUE_TYPE.REVENUE_SHARE}/>

                            <KrysRadioButton name="revenue_type" label={'Amount Commitment'}
                                             onChangeHandler={(e) => {
                                                 e.stopPropagation();
                                                 setForm({...form, revenue_type: REVENUE_TYPE.COMMITMENT});
                                             }} defaultValue={form.revenue_type === REVENUE_TYPE.COMMITMENT}/>

                            <div className="mt-1 text-danger">
                                <ErrorMessage name="revenue_type" className="mt-2"/>
                            </div>
                        </div>

                        {
                            form.revenue_type === REVENUE_TYPE.REVENUE_SHARE &&
                            <div className="mb-7">
                                <KrysFormLabel text="Revenue share" isRequired={true}/>

                                <InputGroup className="mb-3">
                                    <Field className="form-control fs-base" type="number"
                                           placeholder="Enter publisher revenue share"
                                           name="revenue_value"/>
                                    <InputGroup.Text id="basic-addon1">%</InputGroup.Text>
                                </InputGroup>

                                <div className="mt-1 text-danger">
                                    <ErrorMessage name="revenue_value" className="mt-2"/>
                                </div>
                            </div>
                        }

                        {
                            form.revenue_type === REVENUE_TYPE.COMMITMENT &&
                            <div className="mb-7">
                                <KrysFormLabel text="Commitment" isRequired={true}/>

                                <Field className="form-control fs-base" type="text"
                                       placeholder="Enter publisher commitment amount" name="revenue_value"/>

                                <div className="mt-1 text-danger">
                                    <ErrorMessage name="revenue_value" className="mt-2"/>
                                </div>
                            </div>
                        }

                        <div className="separator border-2 my-10"></div>

                        <div className='mb-4'>
                            <span className='fs-5 text-gray-700 d-flex fw-medium'>HQ Information</span>
                            <span
                                className='text-muted'>Enter the hq details about the publisher to stay connected and
                                understand your publishers' location</span>
                        </div>

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

                            <SingleSelect isResourceLoaded={isResourceLoaded}
                                          options={countries}
                                          defaultValue={publisher?.info?.hq_country}
                                          form={form} setForm={setForm}
                                          name="hq_country_id" isClearable={true}/>

                            <div className="mt-1 text-danger">
                                <ErrorMessage name="hq_country_id" className="mt-2"/>
                            </div>
                        </div>

                        <KrysFormFooter cancelUrl={'/supply/publishers'}/>
                    </Form>
                </Formik>
            </KTCardBody>
        </KTCard>
    );
}

export default BasicInformationEdit;