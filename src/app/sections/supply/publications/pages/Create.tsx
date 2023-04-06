import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import Select from 'react-select';
import {DatePicker} from 'rsuite';

import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {
    genericDateOnChangeHandler, GenericErrorMessage,
    genericOnChangeHandler,
    genericSingleSelectOnChangeHandler
} from '../../../../helpers/form';
import {storePublication} from '../../../../requests/supply/publication/Publication';
import {extractErrors} from '../../../../helpers/requests';
import {AlertMessageGenerator} from '../../../../helpers/AlertMessageGenerator';
import FormErrors from '../../../../components/forms/FormErrors';
import {defaultFormFields, FormFields, PublicationSchema} from '../core/form';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import {Publisher} from '../../../../models/supply/publisher/Publisher';
import {getAllPublishers} from '../../../../requests/supply/publisher/Publisher';
import {Language} from '../../../../models/misc/Language';
import {getAllLanguages} from '../../../../requests/misc/Language';
import KrysRadioButton from '../../../../components/forms/KrysRadioButton';
import {APPLICATION_TYPE, PUBLICATION_TYPE, REVENUE_TYPE} from '../../../../models/supply/Options';
import {FormControl, FormGroup, FormLabel, InputGroup} from 'react-bootstrap';
import KrysCheckbox from '../../../../components/forms/KrysCheckbox';

const PublicationCreate: React.FC = () => {
    const navigate = useNavigate();
    const krysApp = useKrysApp();

    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [publishers, setPublishers] = useState<Publisher[]>([]);
    const [languages, setLanguages] = useState<Language[]>([]);

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.SUPPLY_PUBLICATIONS, PageTypes.CREATE))

        // get the list of all publishers
        getAllPublishers().then(response => {
            if (axios.isAxiosError(response)) {
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                setFormErrors([GenericErrorMessage])
            } else {
                // if we were able to get the list of publishers, then we fill our state with them
                if (response.data) {
                    setPublishers(response.data);
                }
            }
        });

        // get the list of all languages
        getAllLanguages().then(response => {
            if (axios.isAxiosError(response)) {
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                setFormErrors([GenericErrorMessage])
            } else {
                // if we were able to get the list of languages, then we fill our state with them
                if (response.data) {
                    setLanguages(response.data);
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

    const checkboxChangeHandler = (e: any, key: any, value: any, isMulti: boolean) => {
        if (isMulti) {
            e.stopPropagation();

            const formKeyArray = (form as any)[key];

            if (formKeyArray.includes(value)) {
                setForm({...form, [key]: formKeyArray.filter((item: any) => item !== value)})
            } else {
                setForm({...form, [key]: [...(form as any)[key], value]});
            }
        }
    };

    const handleCreate = () => {
        // send API request to create the publication
        storePublication(form).then(response => {
                if (axios.isAxiosError(response)) {
                    // we need to show the errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error message
                    setFormErrors([GenericErrorMessage])
                } else {
                    // it's publisher for sure
                    krysApp.setAlert({
                        message: new AlertMessageGenerator('publication', Actions.CREATE, KrysToastType.SUCCESS).message,
                        type: KrysToastType.SUCCESS
                    })

                    navigate(`/supply/publications`);
                }
            }
        );
    };

    return (
        <KTCard>
            <KTCardHeader text="Create New Publication"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={PublicationSchema} onSubmit={handleCreate}
                        enableReinitialize>
                    {
                        ({errors}) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-4">
                                    <span className="fs-5 text-gray-700 d-flex fw-medium">General Information</span>
                                    <span
                                        className="text-muted">Enter the basic information about the publication</span>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter publication name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Publisher" isRequired={true}/>

                                    <Select name="publisher_id"
                                            options={publishers}
                                            getOptionLabel={(publisher) => publisher.name}
                                            getOptionValue={(publisher) => publisher.id.toString()}
                                            onChange={(e) => {
                                                selectChangeHandler(e, 'publisher_id')
                                            }}
                                            placeholder="Select a publisher"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="publisher_id" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Unique identifier" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter publication unique identifier" name="unique_identifier"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="unique_identifier" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Language(s)" isRequired={true}/>

                                    <Select name="languages_ids"
                                            options={languages}
                                            getOptionLabel={(language) => language.name}
                                            getOptionValue={(language) => language.id.toString()}
                                            onChange={(e) => {
                                                selectChangeHandler(e, 'languages_ids')
                                            }}
                                            placeholder="Select a language(s)"
                                            isMulti={true}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="languages_ids" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Live date" isRequired={true}/>

                                    <DatePicker name="live_date"
                                                className="krys-datepicker"
                                                oneTap={true}
                                                block
                                                isoWeek
                                                preventOverflow={false}
                                                placeholder="Select publication live date"
                                                onChange={(date) => dateChangeHandler(date, 'live_date')}
                                    />

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="live_date" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="separator border-2 my-10"></div>

                                <div className="mb-4">
                            <span
                                className="fs-5 text-gray-700 d-flex fw-medium">Publication Type and Description</span>
                                    <span className="text-muted">Enter the publication type (web or mobile app or both) and a
                                brief description of the publication's content or purpose</span>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Publication type" isRequired={true}/>

                                    <KrysCheckbox name="types[]" label={'Website'}
                                                   onChangeHandler={(e) => checkboxChangeHandler(e, 'types', PUBLICATION_TYPE.WEBSITE, true)}
                                                   defaultValue={form.types.includes(PUBLICATION_TYPE.WEBSITE)}/>

                                    <KrysCheckbox name="types[]" label={'Mobile application'}
                                                   onChangeHandler={(e) => checkboxChangeHandler(e, 'types', PUBLICATION_TYPE.MOBILE_APPLICATION, true)}
                                                   defaultValue={form.types.includes(PUBLICATION_TYPE.MOBILE_APPLICATION)}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="types" className="mt-2"/>
                                    </div>
                                </div>

                                {
                                    form.types.includes(PUBLICATION_TYPE.WEBSITE) &&
                                    <div className="mb-7">
                                        <KrysFormLabel text="URL" isRequired={true}/>

                                        <Field className="form-control fs-base"
                                               type="text"
                                               placeholder="Enter publication url" name="url"/>

                                        <div className="mt-1 text-danger">
                                            <div className="mt-2">
                                                {errors?.url ? errors?.url : null}
                                            </div>
                                        </div>
                                    </div>
                                }

                                {
                                    form.types.includes(PUBLICATION_TYPE.MOBILE_APPLICATION) &&

                                    <div className="d-block">
                                        <div className="android-mobile-app">
                                            <div
                                                className="notice d-flex bg-light-primary rounded border-primary border border-dashed mb-5 p-6">
                                                <div className="d-flex flex-stack flex-grow-1">
                                                    <div>
                                                        <div className="fs-6 fw-bold text-gray-600">Android Application
                                                            Details
                                                        </div>
                                                        <div className="fs-6 text-gray-400">Please enter the below details
                                                            if this application is available on Android devices.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-7">
                                                <KrysFormLabel text="Android store URL" isRequired={true}/>

                                                <Field className="form-control fs-base"
                                                       type="text"
                                                       placeholder="Enter publication Android store URL" name="android_store_url"/>

                                                <div className="mt-1 text-danger">
                                                    <div className="mt-2">
                                                        {errors?.android_store_url ? errors?.android_store_url : null}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-7">
                                                <KrysFormLabel text="Android bundle ID" isRequired={true}/>

                                                <Field className="form-control fs-base"
                                                       type="text"
                                                       placeholder="Enter publication Android bundle ID" name="android_bundle_id"/>

                                                <div className="mt-1 text-danger">
                                                    <div className="mt-2">
                                                        {errors?.android_bundle_id ? errors?.android_bundle_id : null}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-7">
                                                <KrysFormLabel text="Android version" isRequired={true}/>

                                                <Field className="form-control fs-base"
                                                       type="text"
                                                       placeholder="Enter publication Android version" name="android_version"/>

                                                <div className="mt-1 text-danger">
                                                    <div className="mt-2">
                                                        {errors?.android_version ? errors?.android_version : null}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-7">
                                                <KrysFormLabel text="Android application type" isRequired={true}/>

                                                <KrysRadioButton name="android_application_type" label={'Free'}
                                                                 onChangeHandler={(e) => {
                                                                     e.stopPropagation();
                                                                     setForm({
                                                                         ...form,
                                                                         android_application_type: APPLICATION_TYPE.FREE
                                                                     });
                                                                 }}
                                                                 defaultValue={form.android_application_type === APPLICATION_TYPE.FREE}/>

                                                <KrysRadioButton name="android_application_type" label={'Paid'}
                                                                 onChangeHandler={(e) => {
                                                                     e.stopPropagation();
                                                                     setForm({
                                                                         ...form,
                                                                         android_application_type: APPLICATION_TYPE.PAID
                                                                     });
                                                                 }}
                                                                 defaultValue={form.android_application_type === APPLICATION_TYPE.PAID}/>

                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name="android_application_type" className="mt-2"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ios-mobile-app">
                                            <div
                                                className="notice d-flex bg-light-primary rounded border-primary border border-dashed mb-5 p-6">
                                                <div className="d-flex flex-stack flex-grow-1">
                                                    <div>
                                                        <div className="fs-6 fw-bold text-gray-600">iOS Application Details
                                                        </div>
                                                        <div className="fs-6 text-gray-400">Please enter the below details
                                                            if this application is available on iOS devices.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-7">
                                                <KrysFormLabel text="iOS store URL" isRequired={true}/>

                                                <Field className="form-control fs-base"
                                                       type="text"
                                                       placeholder="Enter publication iOS store URL" name="ios_store_url"/>

                                                <div className="mt-1 text-danger">
                                                    <div className="mt-2">
                                                        {errors?.ios_store_url ? errors?.ios_store_url : null}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-7">
                                                <KrysFormLabel text="iOS bundle ID" isRequired={true}/>

                                                <Field className="form-control fs-base"
                                                       type="text"
                                                       placeholder="Enter publication iOS bundle ID" name="ios_bundle_id"/>

                                                <div className="mt-1 text-danger">
                                                    <div className="mt-2">
                                                        {errors?.ios_bundle_id ? errors?.ios_bundle_id : null}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-7">
                                                <KrysFormLabel text="iOS version" isRequired={true}/>

                                                <Field className="form-control fs-base"
                                                       type="text"
                                                       placeholder="Enter publication iOS version" name="ios_version"/>

                                                <div className="mt-1 text-danger">
                                                    <div className="mt-2">
                                                        {errors?.ios_version ? errors?.ios_version : null}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-7">
                                                <KrysFormLabel text="iOS application type" isRequired={true}/>

                                                <KrysRadioButton name="ios_application_type" label={'Free'}
                                                                 onChangeHandler={(e) => {
                                                                     e.stopPropagation();
                                                                     setForm({
                                                                         ...form,
                                                                         ios_application_type: APPLICATION_TYPE.FREE
                                                                     });
                                                                 }}
                                                                 defaultValue={form.ios_application_type === APPLICATION_TYPE.FREE}/>

                                                <KrysRadioButton name="ios_application_type" label={'Paid'}
                                                                 onChangeHandler={(e) => {
                                                                     e.stopPropagation();
                                                                     setForm({
                                                                         ...form,
                                                                         ios_application_type: APPLICATION_TYPE.PAID
                                                                     });
                                                                 }}
                                                                 defaultValue={form.ios_application_type === APPLICATION_TYPE.PAID}/>

                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name="ios_application_type" className="mt-2"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }

                                <div className="mb-7">
                                    <KrysFormLabel text="Description" isRequired={false}/>

                                    <FormGroup>
                                        <FormControl as="textarea"
                                                     rows={3}
                                                     name="description"
                                                     className="form-control fs-base"
                                                     placeholder="Enter publication description"
                                        />
                                    </FormGroup>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="description" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="separator border-2 my-10"></div>

                                <div className="mb-4">
                                    <span className="fs-5 text-gray-700 d-flex fw-medium">Revenue Type Selection</span>
                                    <span className="text-muted">Select the revenue type that applies to your agreement with the publisher</span>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Revenue type" isRequired={true}/>

                                    <KrysRadioButton name="revenue_type" label={'Same as publisher'}
                                                     onChangeHandler={(e) => {
                                                         e.stopPropagation();
                                                         setForm({
                                                             ...form,
                                                             revenue_type: REVENUE_TYPE.SAME_AS_PUBLISHER,
                                                             revenue_share: '',
                                                             commitment: ''
                                                         });
                                                     }}
                                                     defaultValue={form.revenue_type === REVENUE_TYPE.SAME_AS_PUBLISHER}/>

                                    <KrysRadioButton name="revenue_type" label={'Revenue Share'}
                                                     onChangeHandler={(e) => {
                                                         e.stopPropagation();
                                                         setForm({
                                                             ...form,
                                                             revenue_type: REVENUE_TYPE.REVENUE_SHARE,
                                                             commitment: ''
                                                         });
                                                     }}
                                                     defaultValue={form.revenue_type === REVENUE_TYPE.REVENUE_SHARE}/>

                                    <KrysRadioButton name="revenue_type" label={'Amount Commitment'}
                                                     onChangeHandler={(e) => {
                                                         e.stopPropagation();
                                                         setForm({
                                                             ...form,
                                                             revenue_type: REVENUE_TYPE.COMMITMENT,
                                                             revenue_share: ''
                                                         });
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
                                                   placeholder="Enter publication revenue share"
                                                   name="revenue_share"/>
                                            <InputGroup.Text id="basic-addon1">%</InputGroup.Text>
                                        </InputGroup>

                                        <div className="mt-1 text-danger">
                                            <ErrorMessage name="revenue_share" className="mt-2"/>
                                        </div>
                                    </div>
                                }

                                {
                                    form.revenue_type === REVENUE_TYPE.COMMITMENT &&
                                    <div className="mb-7">
                                        <KrysFormLabel text="Commitment" isRequired={true}/>

                                        <Field className="form-control fs-base" type="text"
                                               placeholder="Enter publication commitment amount" name="commitment"/>

                                        <div className="mt-1 text-danger">
                                            <ErrorMessage name="commitment" className="mt-2"/>
                                        </div>
                                    </div>
                                }

                                <div className="separator border-2 my-10"></div>

                                <div className="mb-4">
                                    <span className="fs-5 text-gray-700 d-flex fw-medium">Report Settings</span>
                                    <span className="text-muted">Configure advertising-related settings for the publication, including Deal ID/PMP, temporary inventory restrictions, and Hi10 monetization</span>
                                </div>

                                <div className="mb-7">
                                    <KrysCheckbox name="is_deal_pmp" label={'Deal ID / PMP'}
                                                   onChangeHandler={(e) => {
                                                       e.stopPropagation();
                                                       setForm({...form, is_deal_pmp: !form.is_deal_pmp})
                                                   }}
                                                   defaultValue={form.is_deal_pmp}/>

                                    <KrysCheckbox name="is_archived" label={'Temporarily Not Sending Inventory'}
                                                   onChangeHandler={(e) => {
                                                       e.stopPropagation();
                                                       setForm({...form, is_archived: !form.is_archived})
                                                   }}
                                                   defaultValue={form.is_archived}/>

                                    <KrysCheckbox name="has_hi10" label={'Does not accept Hi10 Monetization'}
                                                   onChangeHandler={(e) => {
                                                       e.stopPropagation();
                                                       setForm({...form, has_hi10: !form.has_hi10})
                                                   }}
                                                   defaultValue={form.has_hi10}/>
                                </div>

                                <KrysFormFooter cancelUrl={'/supply/publications'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default PublicationCreate;