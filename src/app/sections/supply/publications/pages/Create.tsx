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
                    <Form onChange={onChangeHandler}>
                        <div className="mb-4">
                            <span className="fs-5 text-gray-700 d-flex fw-medium">General information</span>
                            <span className="text-muted">Enter basic information about the publication</span>
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

                        <KrysFormFooter cancelUrl={'/supply/publications'}/>
                    </Form>
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default PublicationCreate;