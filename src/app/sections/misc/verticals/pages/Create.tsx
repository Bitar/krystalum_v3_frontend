import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {Actions, PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {defaultFormFields, FormFields, VerticalSchema} from '../core/form';
import {GenericErrorMessage, genericOnChangeHandler, genericSelectOnChangeHandler} from '../../../../helpers/form';
import {extractErrors} from '../../../../helpers/requests';
import {generateSuccessMessage} from '../../../../helpers/alerts';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import FormErrors from '../../../../components/forms/FormErrors';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {getAllVerticals, storeVertical} from '../../../../requests/misc/Vertical';
import Select from "react-select";
import {Vertical} from "../../../../models/misc/Vertical";

const VerticalCreate: React.FC = () => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [verticals, setVerticals] = useState<Vertical[]>([]);

    const navigate = useNavigate();
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_VERTICALS, PageTypes.CREATE))
        // eslint-disable-next-line react-hooks/exhaustive-deps

        getAllVerticals().then(response => {
            if (axios.isAxiosError(response)) {
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                setFormErrors([GenericErrorMessage])
            } else {
                // if we were able to get the list of roles, then we fill our state with them
                if (response.data) {
                    setVerticals(response.data);
                }
            }
        });
    }, []);

    const selectChangeHandler = (e: any) => {
        genericSelectOnChangeHandler(e, form, setForm, 'parent');
    };

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleCreate = (e: any) => {
        // send API request to create the permission
        storeVertical(form).then(response => {
                if (axios.isAxiosError(response)) {
                    // we need to show the errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error message
                    setFormErrors([GenericErrorMessage])
                } else {
                    // it's permission for sure
                    krysApp.setAlert({message: generateSuccessMessage('vertical', Actions.CREATE), type: 'success'})
                    navigate(`/misc/verticals`);
                }
            }
        );
    };

    return (
        <KTCard>
            <KTCardHeader text="Create New Vertical" icon="fa-regular fa-plus" icon_style="fs-3 text-success"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={VerticalSchema} onSubmit={handleCreate}>
                    {
                        (formik) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-6" type="text"
                                           placeholder="Enter vertical name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Vertical Parent" isRequired={false}/>

                                    <Select name="parent_id"
                                            options={verticals}
                                            getOptionLabel={(vertical) => vertical?.name}
                                            getOptionValue={(vertical) => vertical?.id ? vertical?.id.toString() : ''}
                                            onChange={selectChangeHandler}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="parentVertical" className="mt-2"/>
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/misc/verticals'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default VerticalCreate;