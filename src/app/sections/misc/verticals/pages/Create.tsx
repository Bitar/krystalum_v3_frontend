import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {defaultFormFields, FormFields, VerticalSchema} from '../core/form';
import {GenericErrorMessage, genericOnChangeHandler, genericSelectOnChangeHandler} from '../../../../helpers/form';
import {extractErrors} from '../../../../helpers/requests';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import FormErrors from '../../../../components/forms/FormErrors';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {getAllVerticals, storeVertical} from '../../../../requests/misc/Vertical';
import Select from "react-select";
import {Vertical} from "../../../../models/misc/Vertical";
import {AlertMessageGenerator} from "../../../../helpers/alertMessageGenerator";


const VerticalCreate: React.FC = () => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [verticals, setVerticals] = useState<Vertical[]>([]);

    const navigate = useNavigate();
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_VERTICALS, PageTypes.CREATE))

        getAllVerticals().then(response => {
            if (axios.isAxiosError(response)) {
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                setFormErrors([GenericErrorMessage]);
            } else {
                // if we were able to get the list of roles, then we fill our state with them
                if (response.data) {
                    setVerticals(response.data);
                }
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const selectChangeHandler = (e: any) => {
        genericSelectOnChangeHandler(e, form, setForm, 'parent');
    };

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleCreate = (e: any) => {
        // send API request to create the vertical
        storeVertical(form).then(response => {
                if (axios.isAxiosError(response)) {
                    // we need to show the errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error message
                    setFormErrors([GenericErrorMessage])
                } else {
                    // it's vertical for sure

                    krysApp.setAlert({
                        message: new AlertMessageGenerator('vertical', Actions.CREATE, KrysToastType.SUCCESS).message,
                        type: KrysToastType.SUCCESS
                    })

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

                <Formik initialValues={form} validationSchema={VerticalSchema} onSubmit={handleCreate}
                        enableReinitialize>
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

                                    <Select name="parent"
                                            options={verticals}
                                            getOptionLabel={(vertical) => vertical.name}
                                            getOptionValue={(vertical) => vertical.id.toString()}
                                            onChange={selectChangeHandler}
                                            formatOptionLabel={(option) => {
                                                if (option.parent !== null) {
                                                    // this is a child
                                                    return (
                                                        <div style={{ marginLeft: '1em' }}>
                                                            {option.name}
                                                        </div>
                                                    );
                                                } else {
                                                    // this is a parent
                                                    return (
                                                        <div>
                                                            {option.name}
                                                        </div>
                                                    );
                                                }
                                            }}
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

export default VerticalCreate;