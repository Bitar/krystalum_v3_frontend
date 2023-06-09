import {ErrorMessage, Field, Form, Formik, FormikProps} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Select from 'react-select';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';

import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {
    genericHandleSingleFile,
    genericMultiSelectOnChangeHandler,
    genericOnChangeHandler
} from '../../../../helpers/form';
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {submitRequest} from '../../../../helpers/requests';
import {Sections} from "../../../../helpers/sections";
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {Role} from '../../../../models/iam/Role';
import {useKrysApp} from "../../../../modules/general/KrysApp";
import {getAllRoles} from '../../../../requests/iam/Role';
import {storeUser} from '../../../../requests/iam/User';
import {CreateUserSchema, defaultFormFields, FormFields} from '../core/form';

const UserCreate: React.FC = () => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [roles, setRoles] = useState<Role[]>([]);

    const krysApp = useKrysApp();
    // we use this to navigate to the index page after the new user is saved
    const navigate = useNavigate();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.IAM_USERS, PageTypes.CREATE));

        // get the roles so we can edit the user's roles
        submitRequest(getAllRoles, [], (response) => {
            setRoles(response);
        }, setFormErrors);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const multiSelectChangeHandler = (e: any) => {
        genericMultiSelectOnChangeHandler(e, form, setForm, 'roles');
    };

    const onChangeHandler = (e: any) => {
        // in case of multi select, the element doesn't have a name because
        // we get only a list of values from the select and not an element with target value and name

        if (e.target.name !== 'image') {
            genericOnChangeHandler(e, form, setForm);
        }
    };

    const handleFile = (e: any, formik: FormikProps<any>) => {
        genericHandleSingleFile(e, formik, form, setForm, 'image');
    };

    const handleCreate = (e: any) => {
        // send API request to create the user
        submitRequest(storeUser, [form], (response) => {
            // we were able to store the user
            krysApp.setAlert({
                message: new AlertMessageGenerator('user', Actions.CREATE, KrysToastType.SUCCESS).message,
                type: KrysToastType.SUCCESS
            });

            navigate(`/iam/users`);
        }, setFormErrors);
    };

    return (
        <KTCard>
            <KTCardHeader text="Create New User"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={CreateUserSchema} onSubmit={handleCreate}
                        enableReinitialize>
                    {
                        (formik) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter full name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Email address" isRequired={true}/>

                                    <Field className="form-control fs-base" type="email"
                                           placeholder="Enter email address" name="email"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="email" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Password" isRequired={true}/>

                                    <Field className="form-control fs-base" type="password" value={undefined}
                                           placeholder="Enter user password" name="password"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="password" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Confirm password" isRequired={true}/>

                                    <Field className="form-control fs-base" type="password" value={undefined}
                                           placeholder="Confirm user password" name="password_confirmation"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="password_confirmation" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Profile picture" isRequired={false}/>

                                    <Field className="form-control fs-base" type="file" name="image" value={undefined}
                                           onChange={(e: any) => handleFile(e, formik)}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="image" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Roles" isRequired={true}/>

                                    <Select isMulti name="roles"
                                            options={roles}
                                            getOptionLabel={(role) => role.name}
                                            getOptionValue={(role) => role.id.toString()}
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