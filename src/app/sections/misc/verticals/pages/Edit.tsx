import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {
    GenericErrorMessage,
    genericOnChangeHandler, genericSelectOnChangeHandler
} from '../../../../helpers/form';
import {extractErrors} from '../../../../helpers/requests';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import Select from 'react-select';
import {defaultFormFields, FormFields, VerticalSchema} from '../core/form';
import {getAllVerticals, getVertical, updateVertical} from "../../../../requests/misc/Vertical";
import {Vertical} from "../../../../models/misc/Vertical";
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {indentOptions} from '../../../../components/forms/IndentOptions';

const VerticalEdit: React.FC = () => {
    const [vertical, setVertical] = useState<Vertical|null>(null);

    const [form, setForm] = useState<FormFields>(defaultFormFields)
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [verticals, setVerticals] = useState<Vertical[]>([]);

    const krysApp = useKrysApp();

    const navigate = useNavigate();

    let {id} = useParams();

    useEffect(() => {
        if (id) {
            // get the vertical we need to edit from the database
            getVertical(parseInt(id)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch the vertical to edit, so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    navigate('/error/400');
                } else {
                    // we were able to fetch current vertical to edit
                    setVertical(response);

                    setForm({...response})
                }
            });

            // get the verticals
            getAllVerticals().then(response => {
                if (axios.isAxiosError(response)) {
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    setFormErrors([GenericErrorMessage])
                } else {
                    // if we were able to get the list of verticals, then we fill our state with them
                    if (response.data) {
                        setVerticals(response.data);
                    }
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if(vertical) {
            krysApp.setPageTitle(generatePageTitle(Sections.MISC_VERTICALS, PageTypes.EDIT, vertical.name))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vertical]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const selectChangeHandler = (e: any) => {
        genericSelectOnChangeHandler(e, form, setForm, 'parent');
    };

    const handleEdit = (e: any) => {
        if(vertical) {
            // we need to update the vertical's data by doing API call with form
            updateVertical(vertical.id, form).then(response => {
                if (axios.isAxiosError(response)) {
                    // show errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error
                    setFormErrors([GenericErrorMessage]);
                } else {
                    // we got the booking vertical so we're good
                    krysApp.setAlert({
                        message: new AlertMessageGenerator('vertical', Actions.EDIT, KrysToastType.SUCCESS).message,
                        type: KrysToastType.SUCCESS
                    });

                    navigate(`/misc/verticals`);
                }
            });
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Vertical"/>
            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={VerticalSchema} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        () => (
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

                                    <Select name="parent"
                                            options={verticals}
                                            value={form.parent}
                                            getOptionLabel={(vertical) => vertical.name}
                                            getOptionValue={(vertical) => vertical.id.toString()}
                                            onChange={selectChangeHandler}
                                            formatOptionLabel={indentOptions}
                                            isClearable={true}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="parent" className="mt-2"/>
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

export default VerticalEdit;
