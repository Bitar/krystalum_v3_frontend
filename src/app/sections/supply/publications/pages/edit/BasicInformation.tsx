import React, {useEffect, useState} from 'react';
import {DatePicker} from 'rsuite';
import {Field, Form, Formik} from 'formik';
import {FormControl, FormGroup, InputGroup} from 'react-bootstrap';
import axios from 'axios';

import {KTCard, KTCardBody} from '../../../../../../_metronic/helpers';

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
import {defaultFormFields, fillEditForm, FormFields, publicationSchema} from '../../core/form';
import KrysFormLabel from '../../../../../components/forms/KrysFormLabel';
import KrysRadioButton from '../../../../../components/forms/KrysRadioButton';
import SingleSelect from '../../../../../components/forms/SingleSelect';
import {KTCardHeader} from '../../../../../../_metronic/helpers/components/KTCardHeader';
import {usePublication} from '../../core/PublicationContext';
import {updatePublication} from '../../../../../requests/supply/publication/Publication';
import KrysCheckbox from '../../../../../components/forms/KrysCheckbox';
import {getAllPublishers} from '../../../../../requests/supply/publisher/Publisher';
import {getAllLanguages} from '../../../../../requests/misc/Language';
import {Publisher} from '../../../../../models/supply/publisher/Publisher';
import {Language} from '../../../../../models/misc/Language';
import MultiSelect from '../../../../../components/forms/MultiSelect';
import {APPLICATION_TYPE} from '../../../../../enums/Supply/ApplicationType';
import {PUBLICATION_TYPE} from '../../../../../enums/Supply/PublicationType';
import {REVENUE_TYPE} from '../../../../../enums/Supply/RevenueType';

const PublicationBasicInformationEdit: React.FC = () => {
    const {publication, setPublication} = usePublication();
    const krysApp = useKrysApp();

    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [isResourceLoaded, setIsResourceLoaded] = useState<boolean>(false);

    const [publishers, setPublishers] = useState<Publisher[]>([]);
    const [languages, setLanguages] = useState<Language[]>([]);

    useEffect(() => {
        if (publication) {
            setIsResourceLoaded(true);

            setForm(fillEditForm(publication));

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
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publication]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const dateChangeHandler = (date: Date | null, key: string) => {
        genericDateOnChangeHandler(date, form, setForm, key);
    };

    const checkboxChangeHandler = (e: any, key: string, value: any, isMulti: boolean) => {
        // this function is designed to handle changes to a checkbox element that allows single or multiple selections
        // and update the corresponding property in the form object accordingly

        // stop the propagation of the event using the stopPropagation() method
        // this is done to prevent the event from bubbling up to the parent elements
        // and triggering their event listeners (i.e. stop triggering onChangeHandler)
        e.stopPropagation();

        // checkbox accept multiple values for the same key (name)
        // hence the value will be array
        if (isMulti) {
            // multiple values

            // get the current value of the key property in the form object
            const formKeyArray = (form as any)[key];

            // check if the value is already present in the formKeyArray
            if (formKeyArray.includes(value)) {
                // the value is present in the formKeyArray
                // remove the value from the formKeyArray and update the form object by calling the setForm function
                // with a new object of the key property (i.e. updated array with no value)
                setForm({...form, [key]: formKeyArray.filter((item: any) => item !== value)});
            } else {
                // the value is not present in the formKeyArray
                // add the value to the formKeyArray and update the form object by calling the setForm function
                // with a new object of the key property (i.e. updated array with new value)
                setForm({...form, [key]: [...(form as any)[key], value]});
            }
        } else {
            // single value

            // update the form object by calling the setForm function with a new value of the key property
            setForm({...form, [key]: value})
        }
    };

    const handleEdit = () => {
        if (publication) {
            // send API request to update the publication
            updatePublication(publication.id, form).then(response => {
                    if (axios.isAxiosError(response)) {
                        // we need to show the errors
                        setFormErrors(extractErrors(response));
                    } else if (response === undefined) {
                        // show generic error message
                        setFormErrors([GenericErrorMessage])
                    } else {
                        // we were able to store the publication
                        krysApp.setAlert({
                            message: new AlertMessageGenerator('publication', Actions.EDIT, KrysToastType.SUCCESS).message,
                            type: KrysToastType.SUCCESS
                        });

                        // set the updated publication so that the overview will be updated
                        setPublication(response)

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

                <Formik initialValues={form} validationSchema={publicationSchema(true)} onSubmit={handleEdit}
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
                                        {errors?.name ? errors?.name : null}
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Publisher" isRequired={true}/>

                                    <SingleSelect isResourceLoaded={isResourceLoaded}
                                                  options={publishers}
                                                  defaultValue={publication?.publisher}
                                                  form={form} setForm={setForm}
                                                  name="publisher_id" isClearable={true}/>

                                    <div className="mt-1 text-danger">
                                        {errors?.publisher_id ? errors?.publisher_id : null}
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Unique identifier" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter publication unique identifier" name="unique_identifier"/>

                                    <div className="mt-1 text-danger">
                                        {errors?.unique_identifier ? errors?.unique_identifier : null}
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Language(s)" isRequired={true}/>

                                    <MultiSelect isResourceLoaded={isResourceLoaded} options={languages}
                                                 defaultValue={publication?.languages} form={form} setForm={setForm}
                                                 name={'languages_ids'}/>

                                    <div className="mt-1 text-danger">
                                        {errors?.languages_ids ? errors?.languages_ids : null}
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Live date" isRequired={true}/>

                                    <DatePicker name="live_date"
                                                value={(form.live_date ? new Date(form.live_date) : null)}
                                                className="krys-datepicker"
                                                oneTap={true}
                                                block
                                                isoWeek
                                                preventOverflow={false}
                                                placeholder="Select publication live date"
                                                onChange={(date) => dateChangeHandler(date, 'live_date')}
                                    />

                                    <div className="mt-1 text-danger">
                                        {errors?.live_date ? errors?.live_date : null}
                                    </div>
                                </div>

                                <div className="separator border-2 my-10"></div>

                                <div className="mb-4">
                            <span
                                className="fs-5 text-gray-700 d-flex fw-medium">Publication Type and Description</span>
                                    <span className="text-muted">Enter the publication type (website or mobile application or both) and a
                                brief description of the publication's content or purpose</span>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Publication type" isRequired={true}/>

                                    <KrysCheckbox name="types[]" label={'Website'}
                                                  onChangeHandler={(e) => checkboxChangeHandler(e, 'types', PUBLICATION_TYPE.WEBSITE, true)}
                                                  defaultValue={form.types.includes(PUBLICATION_TYPE.WEBSITE)}/>

                                    <KrysCheckbox name="types[]" label={'iOS Application'}
                                                  onChangeHandler={(e) => checkboxChangeHandler(e, 'types', PUBLICATION_TYPE.IOS_APPLICATION, true)}
                                                  defaultValue={form.types.includes(PUBLICATION_TYPE.IOS_APPLICATION)}/>

                                    <KrysCheckbox name="types[]" label={'Android Application'}
                                                  onChangeHandler={(e) => checkboxChangeHandler(e, 'types', PUBLICATION_TYPE.ANDROID_APPLICATION, true)}
                                                  defaultValue={form.types.includes(PUBLICATION_TYPE.ANDROID_APPLICATION)}/>

                                    <div className="mt-1 text-danger">
                                        {errors?.types ? errors?.types : null}
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
                                            {errors?.url ? errors?.url : null}
                                        </div>
                                    </div>
                                }

                                {
                                    form.types.includes(PUBLICATION_TYPE.ANDROID_APPLICATION) &&

                                    <div className="d-block">
                                        <div
                                            className="notice d-flex bg-light-primary rounded border-primary border border-dashed mb-5 p-6">
                                            <div className="d-flex flex-stack flex-grow-1">
                                                <div>
                                                    <div className="fs-6 fw-bold text-gray-600">Android Application
                                                        Details
                                                    </div>
                                                    <div className="fs-6 text-gray-400">Please enter the below
                                                        details
                                                        if this application is available on Android devices.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-7">
                                            <KrysFormLabel text="Android store URL" isRequired={true}/>

                                            <Field className="form-control fs-base"
                                                   type="text"
                                                   placeholder="Enter publication Android store URL"
                                                   name="android_store_url"/>

                                            <div className="mt-1 text-danger">
                                                {errors?.android_store_url ? errors?.android_store_url : null}
                                            </div>
                                        </div>

                                        <div className="mb-7">
                                            <KrysFormLabel text="Android bundle ID" isRequired={true}/>

                                            <Field className="form-control fs-base"
                                                   type="text"
                                                   placeholder="Enter publication Android bundle ID"
                                                   name="android_bundle_id"/>

                                            <div className="mt-1 text-danger">
                                                {errors?.android_bundle_id ? errors?.android_bundle_id : null}
                                            </div>
                                        </div>

                                        <div className="mb-7">
                                            <KrysFormLabel text="Android version" isRequired={true}/>

                                            <Field className="form-control fs-base"
                                                   type="text"
                                                   placeholder="Enter publication Android version"
                                                   name="android_version"/>

                                            <div className="mt-1 text-danger">
                                                {errors?.android_version ? errors?.android_version : null}
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
                                                {errors?.android_application_type ? errors?.android_application_type : null}
                                            </div>
                                        </div>
                                    </div>
                                }

                                {
                                    form.types.includes(PUBLICATION_TYPE.IOS_APPLICATION) &&

                                    <div className="d-block">
                                        <div
                                            className="notice d-flex bg-light-primary rounded border-primary border border-dashed mb-5 p-6">
                                            <div className="d-flex flex-stack flex-grow-1">
                                                <div>
                                                    <div className="fs-6 fw-bold text-gray-600">iOS Application
                                                        Details
                                                    </div>
                                                    <div className="fs-6 text-gray-400">Please enter the below
                                                        details
                                                        if this application is available on iOS devices.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-7">
                                            <KrysFormLabel text="iOS store URL" isRequired={true}/>

                                            <Field className="form-control fs-base"
                                                   type="text"
                                                   placeholder="Enter publication iOS store URL"
                                                   name="ios_store_url"/>

                                            <div className="mt-1 text-danger">
                                                {errors?.ios_store_url ? errors?.ios_store_url : null}
                                            </div>
                                        </div>

                                        <div className="mb-7">
                                            <KrysFormLabel text="iOS bundle ID" isRequired={true}/>

                                            <Field className="form-control fs-base"
                                                   type="text"
                                                   placeholder="Enter publication iOS bundle ID"
                                                   name="ios_bundle_id"/>

                                            <div className="mt-1 text-danger">
                                                {errors?.ios_bundle_id ? errors?.ios_bundle_id : null}
                                            </div>
                                        </div>

                                        <div className="mb-7">
                                            <KrysFormLabel text="iOS version" isRequired={true}/>

                                            <Field className="form-control fs-base"
                                                   type="text"
                                                   placeholder="Enter publication iOS version" name="ios_version"/>

                                            <div className="mt-1 text-danger">
                                                {errors?.ios_version ? errors?.ios_version : null}
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
                                                {errors?.ios_application_type ? errors?.ios_application_type : null}
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
                                                     defaultValue={form.description || ''}
                                                     className="form-control fs-base"
                                                     placeholder="Enter publication description"
                                        />
                                    </FormGroup>

                                    <div className="mt-1 text-danger">
                                        {errors?.description ? errors?.description : null}
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
                                                             revenue_value: ''
                                                         });
                                                     }}
                                                     defaultValue={form.revenue_type === REVENUE_TYPE.SAME_AS_PUBLISHER}/>

                                    <KrysRadioButton name="revenue_type" label={'Revenue Share'}
                                                     onChangeHandler={(e) => {
                                                         e.stopPropagation();
                                                         setForm({
                                                             ...form,
                                                             revenue_type: REVENUE_TYPE.REVENUE_SHARE,
                                                         });
                                                     }}
                                                     defaultValue={form.revenue_type === REVENUE_TYPE.REVENUE_SHARE}/>

                                    <KrysRadioButton name="revenue_type" label={'Amount Commitment'}
                                                     onChangeHandler={(e) => {
                                                         e.stopPropagation();
                                                         setForm({
                                                             ...form,
                                                             revenue_type: REVENUE_TYPE.COMMITMENT,
                                                         });
                                                     }} defaultValue={form.revenue_type === REVENUE_TYPE.COMMITMENT}/>

                                    <div className="mt-1 text-danger">
                                        {errors?.revenue_type ? errors?.revenue_type : null}
                                    </div>
                                </div>

                                {
                                    form.revenue_type === REVENUE_TYPE.REVENUE_SHARE &&
                                    <div className="mb-7">
                                        <KrysFormLabel text="Revenue share" isRequired={true}/>

                                        <InputGroup className="mb-3">
                                            <Field className="form-control fs-base" type="number"
                                                   placeholder="Enter publication revenue share"
                                                   name="revenue_value"/>
                                            <InputGroup.Text id="basic-addon1">%</InputGroup.Text>
                                        </InputGroup>

                                        <div className="mt-1 text-danger">
                                            {errors?.revenue_value ? errors?.revenue_value : null}
                                        </div>
                                    </div>
                                }

                                {
                                    form.revenue_type === REVENUE_TYPE.COMMITMENT &&
                                    <div className="mb-7">
                                        <KrysFormLabel text="Commitment" isRequired={true}/>

                                        <Field className="form-control fs-base" type="text"
                                               placeholder="Enter publication commitment amount" name="revenue_value"/>

                                        <div className="mt-1 text-danger">
                                            {errors?.revenue_value ? errors?.revenue_value : null}
                                        </div>
                                    </div>
                                }

                                <div className="separator border-2 my-10"></div>

                                <div className="mb-4">
                                    <span className="fs-5 text-gray-700 d-flex fw-medium">Report Settings</span>
                                    <span className="text-muted">Configure advertising-related settings for the publication, including Deal ID/PMP, temporary inventory restrictions <small
                                        className="fw-bold text-muted">(if 'Temporarily Not Sending Inventory' is selected, then the publication will be archived)</small>, and Hi10 monetization</span>
                                </div>

                                <div className="mb-7">
                                    <KrysCheckbox name="is_deal_pmp" label={'Deal ID / PMP'}
                                                  onChangeHandler={(e) => checkboxChangeHandler(e, 'is_deal_pmp', Number(!form.is_deal_pmp), false)}
                                                  defaultValue={Boolean(form.is_deal_pmp)}/>

                                    <KrysCheckbox name="is_archived" label={'Temporarily Not Sending Inventory'}
                                                  onChangeHandler={(e) => checkboxChangeHandler(e, 'is_archived', Number(!form.is_archived), false)}
                                                  defaultValue={Boolean(form.is_archived)}/>

                                    <KrysCheckbox name="has_hi10" label={'Accept Hi10 Monetization'}
                                                  onChangeHandler={(e) => {
                                                      e.stopPropagation();
                                                      setForm({
                                                          ...form,
                                                          has_hi10: Number(!form.has_hi10),
                                                          hi10_to_display: Number(form.has_hi10),
                                                          hi10_to_video: 0,
                                                      })
                                                  }}
                                                  defaultValue={Boolean(form.has_hi10)}/>

                                    <div className="mt-1 text-danger">
                                        {errors?.has_hi10 ? errors?.has_hi10 : null}
                                    </div>
                                </div>

                                {
                                    !form.has_hi10 &&
                                    <div className="mb-7">
                                        <div className="mb-4">
                                            <span className="text-danger d-flex fw-regular">You have unchecked 'Accept Hi10 Monetization', hence, please choose from the options below to indicate whether you want to transfer impressions to display or video:</span>
                                        </div>

                                        <KrysRadioButton name="hi10_to_display"
                                                         label={'Transfer Impressions to Display (default)'}
                                                         onChangeHandler={(e) => {
                                                             e.stopPropagation();
                                                             setForm({
                                                                 ...form,
                                                                 hi10_to_display: 1,
                                                                 hi10_to_video: 0
                                                             });
                                                         }}
                                                         defaultValue={Boolean(form.hi10_to_display)}/>

                                        <KrysRadioButton name="hi10_to_video"
                                                         label={'Transfer Impressions to Video'}
                                                         onChangeHandler={(e) => {
                                                             e.stopPropagation();
                                                             setForm({
                                                                 ...form,
                                                                 hi10_to_video: 1,
                                                                 hi10_to_display: 0
                                                             });
                                                         }}
                                                         defaultValue={Boolean(form.hi10_to_video)}/>

                                        <div className="mt-1 text-danger">
                                            {errors?.hi10_to_display ? errors?.hi10_to_display : null}
                                            {errors?.hi10_to_video ? errors?.hi10_to_video : null}
                                        </div>
                                    </div>
                                }

                                <KrysFormFooter cancelUrl={'/supply/publications'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    );
}

export default PublicationBasicInformationEdit;