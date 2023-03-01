import React, {useEffect, useState} from 'react';
import {KTCard, KTCardBody} from "../../../../../_metronic/helpers";
import {KTCardHeader} from "../../../../../_metronic/helpers/components/KTCardHeader";
import FormErrors from "../../../../components/forms/FormErrors";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {defaultFormFields, FormFields, VerticalSchema} from "../core/form";
import KrysFormLabel from "../../../../components/forms/KrysFormLabel";
import KrysFormFooter from "../../../../components/forms/KrysFormFooter";
import {useKrysApp} from "../../../../modules/general/KrysApp";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {Sections} from "../../../../helpers/sections";
import {Actions, PageTypes} from "../../../../helpers/variables";
import {GenericErrorMessage, genericOnChangeHandler, genericSelectOnChangeHandler} from "../../../../helpers/form";
import {extractErrors} from "../../../../helpers/requests";
import {generateSuccessMessage} from "../../../../helpers/alerts";
import {getAllVerticals, getVertical, updateVertical} from "../../../../requests/misc/Vertical";
import Select from "react-select";
import {defaultVertical, Vertical} from "../../../../models/misc/Vertical";

const VerticalEdit: React.FC = () => {

    const [form, setForm] = useState<FormFields>(defaultFormFields);

    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [vertical, setVertical] = useState<Vertical>(defaultVertical);

    const [verticals, setVerticals] = useState<Vertical[]>([]);

    const krysApp = useKrysApp();

    const navigate = useNavigate();

    let {id} = useParams();

    useEffect(() => {
        if (id) {
            // get the permission we need to edit from the database
            getVertical(parseInt(id)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch the permission to edit so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    navigate('/error/400');
                } else {
                    // we were able to fetch current permission to edit
                    setVertical(response);

                    const {parent, ...currentVertical} = response

                    // was able to get the vertical we want to edit
                    // the form is the same as vertical
                    setForm({...currentVertical, parent: response.parent?.id});

                }
            });

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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_VERTICALS, PageTypes.EDIT, vertical.name))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vertical]);

    const selectChangeHandler = (e: any) => {
        genericSelectOnChangeHandler(e, form, setForm, 'vertical');
    };

    const onChangeHandler = (e: any) => {
        console.log(form);
        genericOnChangeHandler(e, form, setForm);
    };

    const handleEdit = (e: any) => {
        // we need to update the permission's data by doing API call with form
        updateVertical(form).then(response => {
            console.log(form);
            if (axios.isAxiosError(response)) {
                // show errors
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                // show generic error
                setFormErrors([GenericErrorMessage]);
            } else {
                // we got the updated permission so we're good
                krysApp.setAlert({message: generateSuccessMessage('vertical', Actions.EDIT), type: 'success'})
                // navigate(`/misc/verticals`);
            }
        });
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Vertical" icon="fa-solid fa-pencil" icon_style="fs-3 text-warning"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={vertical} validationSchema={VerticalSchema} onSubmit={handleEdit} enableReinitialize>
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

                                    {
                                        <Select name="parent_id" value={vertical.parent}
                                                options={verticals}
                                                getOptionLabel={(vertical) => vertical?.name}
                                                getOptionValue={(vertical) => vertical?.id ? vertical?.id.toString() : ''}
                                                onChange={selectChangeHandler}/>
                                    }


                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="parent_id" className="mt-2"/>
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