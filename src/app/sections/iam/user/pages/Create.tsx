import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Select from 'react-select';
import {useNavigate} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik, FormikProps} from 'formik';

import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {
    GenericErrorMessage, genericHandleSingleFile,
    genericMultiSelectOnChangeHandler, genericOnChangeHandler
} from '../../../../helpers/form';
import {Role} from '../../../../models/iam/Role';
import {getAllRoles} from '../../../../requests/iam/Role';
import {extractErrors} from '../../../../helpers/requests';
import {Actions, PageTypes} from '../../../../helpers/variables';
import {storeUser} from '../../../../requests/iam/User';
import {CreateUserSchema, defaultFormFields, FormFields} from '../core/form';
import {useKrys} from "../../../../modules/general/KrysProvider";
import {generatePageTitle} from "../../../../helpers/pageTitleUtils";
import {generateSuccessMessage} from "../../../../helpers/alerts";
import {Modules} from "../../../../helpers/modules";

const UserCreate: React.FC = () => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [roles, setRoles] = useState<Role[]>([]);

    const krys = useKrys();

    useEffect(() => {
        krys.setPageTitle(generatePageTitle(Modules.IAM_USERS, PageTypes.CREATE))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // we use this to navigate to the index page after the new user is saved
    const navigate = useNavigate();

    useEffect(() => {
        // get the roles so we can edit the user's roles
        getAllRoles().then(response => {
            if (axios.isAxiosError(response)) {
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                setFormErrors([GenericErrorMessage])
            } else {
                // if we were able to get the list of roles, then we fill our state with them
                if (response.data) {
                    setRoles(response.data);
                }
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const multiSelectChangeHandler = (e: any) => {
        genericMultiSelectOnChangeHandler(e, form, setForm, 'roles');
    };

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleFile = (e: any, formik: FormikProps<any>) => {
        genericHandleSingleFile(e, formik, form, setForm, 'image');
    };

    const handleCreate = (e: any) => {
        // send API request to create the user
        storeUser(form).then(response => {
                if (axios.isAxiosError(response)) {
                    // we need to show the errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error message
                    setFormErrors([GenericErrorMessage])
                } else {
                    // we were able to store the user
                    krys.setAlert({message: generateSuccessMessage('user', Actions.CREATE), type: 'success'})
                    navigate(`/iam/users`);
                }
            }
        );
    };

    return (
        <KTCard>
            <KTCardHeader text="Create New User" icon="fa-regular fa-plus" icon_style="fs-3 text-success"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={CreateUserSchema} onSubmit={handleCreate}
                        enableReinitialize>
                    {
                        (formik) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-6" type="text"
                                           placeholder="Enter full name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Email address" isRequired={true}/>

                                    <Field className="form-control fs-6" type="email"
                                           placeholder="Enter email address" name="email"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="email" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Password" isRequired={true}/>

                                    <Field className="form-control fs-6" type="password" value={undefined}
                                           placeholder="Enter user password" name="password"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="password" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Confirm password" isRequired={true}/>

                                    <Field className="form-control fs-6" type="password" value={undefined}
                                           placeholder="Confirm user password" name="password_confirmation"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="password_confirmation" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Profile picture" isRequired={false}/>

                                    <Field className="form-control fs-6" type="file" name="image" value={undefined}
                                           onChange={(e: any) => handleFile(e, formik)}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="image" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Roles" isRequired={true}/>

                                    <Select isMulti name="roles"
                                            options={roles}
                                            getOptionLabel={(role) => role?.name}
                                            getOptionValue={(role) => role?.id ? role?.id.toString() : ''}
                                            onChange={multiSelectChangeHandler}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="roles" className="mt-2"/>
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/iam/users'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    );
}

export default UserCreate;