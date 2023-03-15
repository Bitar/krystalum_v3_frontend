import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import Select from 'react-select';

import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';

import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {PublisherSchema, defaultFormFields, FormFields} from '../core/form';
import {GenericErrorMessage, genericOnChangeHandler, genericSelectOnChangeHandler} from '../../../../helpers/form';
import {extractErrors} from '../../../../helpers/requests';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {storePublisher} from '../../../../requests/supply/Publisher';
import {AlertMessageGenerator} from '../../../../helpers/alertMessageGenerator';
import {Tier} from '../../../../models/misc/Tier';
import {getAllTiers} from '../../../../requests/misc/Tier';
import KrysCheckbox from '../../../../components/forms/KrysCheckbox';
import KrysRadioButton from '../../../../components/forms/KrysRadioButton';

const PublisherCreate: React.FC = () => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [tiers, setTiers] = useState<Tier[]>([]);

    const navigate = useNavigate();
    const krysApp = useKrysApp();

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const selectChangeHandler = (e: any, key: string) => {
        genericSelectOnChangeHandler(e, form, setForm, key);
    };

    const handleCreate = (e: any) => {
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
            <KTCardHeader text="Create New Publisher" icon="fa-regular fa-plus" icon_style="fs-3 text-success"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={PublisherSchema} onSubmit={handleCreate}>
                    {
                        () => (
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
                                            options={tiers}
                                            getOptionLabel={(tier) => tier?.name}
                                            getOptionValue={(tier) => tier?.id.toString()}
                                            onChange={(e) => {
                                                selectChangeHandler(e, 'tier')
                                            }}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="tier" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Integration date" isRequired={false}/>


                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="integration_date" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Commitment type" isRequired={true}/>

                                    <KrysRadioButton name="commitment_type" label={"Revenue Share"} onChangeHandler={(e) => {
                                        e.stopPropagation();
                                        setForm({...form});
                                    }} defaultValue={false}/>

                                    <KrysRadioButton name="commitment_type" label={"Amount Commitment"} onChangeHandler={(e) => {
                                        e.stopPropagation();
                                        setForm({...form});
                                    }} defaultValue={false}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="commitment_type" className="mt-2"/>
                                    </div>
                                </div>

                                {/*<div className="mb-7">*/}
                                {/*    <KrysFormLabel text="Email address" isRequired={false}/>*/}

                                {/*    <Field className="form-control fs-6" type="email"*/}
                                {/*           placeholder="Enter contact email address" name="email"/>*/}

                                {/*    <div className="mt-1 text-danger">*/}
                                {/*        <ErrorMessage name="email" className="mt-2"/>*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                <KrysFormFooter cancelUrl={'/supply/publishers'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default PublisherCreate;