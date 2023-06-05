import axios from 'axios';
import {Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {InputGroup} from 'react-bootstrap';
import {DatePicker} from 'rsuite';
import {KTCard, KTCardBody} from '../../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../../components/forms/FormErrors';
import KrysFormFooter from '../../../../../components/forms/KrysFormFooter';
import KrysFormLabel from '../../../../../components/forms/KrysFormLabel';
import KrysRadioButton from '../../../../../components/forms/KrysRadioButton';
import SingleSelect from '../../../../../components/forms/SingleSelect';
import {RoleEnum} from '../../../../../enums/RoleEnum';
import {RevenueTypeEnum} from '../../../../../enums/Supply/RevenueTypeEnum';
import {AlertMessageGenerator} from '../../../../../helpers/AlertMessageGenerator';
import {genericDateOnChangeHandler, GenericErrorMessage, genericOnChangeHandler} from '../../../../../helpers/form';
import {scrollToTop} from '../../../../../helpers/general';
import {extractErrors} from '../../../../../helpers/requests';
import {Actions, KrysToastType} from '../../../../../helpers/variables';
import {useAuth} from '../../../../../modules/auth';
import {useKrysApp} from '../../../../../modules/general/KrysApp';
import {updatePublisher} from '../../../../../requests/supply/publisher/Publisher';
import {defaultFormFields, fillEditForm, FormFields, PublisherSchema} from '../../core/form';
import {usePublisher} from '../../core/PublisherContext';
import {usePublisherEdit} from '../../core/PublisherEditContext';

const PublisherBasicInformationEdit: React.FC = () => {
    const {currentUser, hasAnyRoles} = useAuth();
    const {publisher, setPublisher} = usePublisherEdit();
    const {options} = usePublisher();
    const krysApp = useKrysApp();

    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [isResourceLoaded, setIsResourceLoaded] = useState<boolean>(false);

    const {countries, tiers} = options

    useEffect(() => {
        if (publisher) {
            setIsResourceLoaded(true);

            setForm(fillEditForm(publisher));
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

                        scrollToTop();
                    } else if (response === undefined) {
                        // show generic error message
                        setFormErrors([GenericErrorMessage]);

                        scrollToTop();
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

                                {
                                    !hasAnyRoles(currentUser, [RoleEnum.PUBLISHER]) &&
                                    <>
                                        <div className="mb-7">
                                            <KrysFormLabel text="Tier" isRequired={false}/>

                                            <SingleSelect isResourceLoaded={isResourceLoaded}
                                                          options={tiers}
                                                          defaultValue={publisher?.tier}
                                                          form={form} setForm={setForm}
                                                          name="tier_id" isClearable={true}/>

                                            <div className="mt-1 text-danger">
                                                {errors?.tier_id ? errors?.tier_id : null}
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
                                                {errors?.integration_date ? errors?.integration_date : null}
                                            </div>
                                        </div>

                                        <div className="mb-7">
                                            <KrysFormLabel text="Revenue type" isRequired={true}/>

                                            <KrysRadioButton name="revenue_type" label={'Revenue Share'}
                                                             onChangeHandler={(e) => {
                                                                 e.stopPropagation();
                                                                 setForm({
                                                                     ...form,
                                                                     revenue_type: RevenueTypeEnum.REVENUE_SHARE
                                                                 });
                                                             }}
                                                             defaultValue={form.revenue_type === RevenueTypeEnum.REVENUE_SHARE}/>

                                            <KrysRadioButton name="revenue_type" label={'Amount Commitment'}
                                                             onChangeHandler={(e) => {
                                                                 e.stopPropagation();
                                                                 setForm({
                                                                     ...form,
                                                                     revenue_type: RevenueTypeEnum.COMMITMENT
                                                                 });
                                                             }}
                                                             defaultValue={form.revenue_type === RevenueTypeEnum.COMMITMENT}/>

                                            <div className="mt-1 text-danger">
                                                {errors?.revenue_type ? errors?.revenue_type : null}
                                            </div>
                                        </div>

                                        {
                                            form.revenue_type === RevenueTypeEnum.REVENUE_SHARE &&
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

                                        {
                                            form.revenue_type === RevenueTypeEnum.COMMITMENT &&
                                            <div className="mb-7">
                                                <KrysFormLabel text="Commitment" isRequired={true}/>

                                                <Field className="form-control fs-base" type="text"
                                                       placeholder="Enter publisher commitment amount"
                                                       name="revenue_value"/>

                                                <div className="mt-1 text-danger">
                                                    {errors?.revenue_value ? errors?.revenue_value : null}
                                                </div>
                                            </div>
                                        }
                                    </>
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

                                    <SingleSelect isResourceLoaded={isResourceLoaded}
                                                  options={countries}
                                                  defaultValue={publisher?.info?.hq_country}
                                                  form={form} setForm={setForm}
                                                  name="hq_country_id" isClearable={true}/>

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
    );
}

export default PublisherBasicInformationEdit;