import React, {useEffect, useState} from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import Select from 'react-select';
import {useNavigate} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik, FormikProps} from 'formik';

import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import FormErrors from '../../../../components/form/FormErrors';
import KrysFormLabel from '../../../../components/form/KrysFormLabel';
import KrysFormFooter from '../../../../components/form/KrysFormFooter';
import {
    GenericErrorMessage, genericHandleSingleFile,
    genericMultiSelectOnChangeHandler, genericOnChangeHandler,
    SUPPORTED_IMAGE_FORMATS
} from '../../../../helpers/form';
import {Role} from '../../../../models/iam/Role';
import {getRoles} from '../../../../requests/iam/Role';
import {extractErrors} from '../../../../requests/helpers';
import {Actions} from '../../../../helpers/variables';
import {storeUser} from '../../../../requests/iam/User';

interface FormFields {
    name: string,
    password: string,
    password_confirmation: string,
    email: string,
    image?: File,
    roles: Role[]
}

const defaultFormFields: FormFields = {
    name: '',
    password: '',
    password_confirmation: '',
    email: '',
    roles: [],
    image: undefined
}

const UserCreate: React.FC = () => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [roles, setRoles] = useState<Role[]>([]);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    // we use this to navigate to the index page after the new user is saved
    const navigate = useNavigate();

    useEffect(() => {
        // get the roles so we can edit the user's roles
        getRoles().then(response => {
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

    const CreateUserSchema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required().min(6, 'The password must be at least 6 characters.'),
        password_confirmation: Yup.string().required().oneOf([Yup.ref("password")], "Passwords do not match."),
        image: Yup.mixed().nullable().notRequired().test('fileFormat', 'The file must be an image of type .jpg .jpeg .gif or .png', value => !value || (value && SUPPORTED_IMAGE_FORMATS.includes(value.type))),
        roles: Yup.array().of(Yup.object().shape({
            id: Yup.number(),
            name: Yup.string(),
            permissions: Yup.array().of(Yup.object().shape({
                id: Yup.number(),
                name: Yup.string()
            }))
        })).required().min(1, 'You must select at least one role.')
    });

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
                    navigate(`/iam/users?success=${Actions.CREATE}`);
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
                                            getOptionValue={(role) => role?.id.toString()}
                                            onChange={multiSelectChangeHandler}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="roles" className="mt-2"/>
                                    </div>
                                </div>

                                <KrysFormFooter/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    );
}

export default UserCreate;