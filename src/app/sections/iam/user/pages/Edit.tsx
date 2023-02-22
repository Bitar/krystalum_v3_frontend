import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik, FormikProps} from 'formik';
import Select from 'react-select';

import {Role} from '../../../../models/iam/Role';
import {defaultUser, User} from '../../../../models/iam/User';
import {getUser, updateUser} from '../../../../requests/iam/User';
import {getAllRoles} from '../../../../requests/iam/Role';
import {extractErrors} from '../../../../helpers/requests';
import {
    GenericErrorMessage, genericHandleSingleFile,
    genericMultiSelectOnChangeHandler,
    genericOnChangeHandler
} from '../../../../helpers/form';
import {Actions, PageTypes} from '../../../../helpers/variables';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {defaultFormFields, EditUserSchema, FormFields} from '../core/form';
import {useKrys} from "../../../../modules/general/KrysProvider";
import {generatePageTitle} from "../../../../helpers/pageTitleUtils";
import {generateSuccessMessage} from "../../../../helpers/alerts";
import {Modules} from "../../../../helpers/modules";

const UserEdit: React.FC = () => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [user, setUser] = useState<User>(defaultUser);
    const [roles, setRoles] = useState<Role[]>([]);

    const krys = useKrys();

    let {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            // get the user we need to edit from the database
            getUser(parseInt(id)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch the user to edit so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    // unknown error occurred
                    navigate('/error/400');
                } else {
                    setUser(response);

                    const {image, roles, ...currentUser} = response

                    // was able to get the user we want to edit
                    // the form is the same as user but without the image
                    setForm({...currentUser, roles: response.roles.map(role => role.id)});
                }
            });

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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        krys.setPageTitle(generatePageTitle(Modules.IAM_USERS, PageTypes.EDIT, user.name))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const multiSelectChangeHandler = (e: any) => {
        genericMultiSelectOnChangeHandler(e, form, setForm, 'roles');
    };

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleFile = (e: any, formik: FormikProps<any>) => {
        genericHandleSingleFile(e, formik, form, setForm, 'image');
    };

    const handleEdit = (e: any) => {
        // send API request to create the user
        updateUser(form).then(response => {
                if (axios.isAxiosError(response)) {
                    // we need to show the errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error message
                    setFormErrors([GenericErrorMessage])
                } else {
                    // we were able to store the user
                    krys.setAlert({message: generateSuccessMessage('user', Actions.EDIT), type: 'success'})
                    navigate(`/iam/users`);
                }
            }
        );
    };

    return (
        <KTCard>
            <KTCardHeader text="Edit User" icon="fa-solid fa-pencil" icon_style="fs-3 text-warning"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={EditUserSchema} onSubmit={handleEdit}
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
                                    <KrysFormLabel text="Profile picture" isRequired={false}/>

                                    <div className="mb-3">
                                        <img src={user.image} className="w-25"
                                             alt={`${user.name} profile`}/>
                                    </div>

                                    <Field className="form-control fs-6" type="file" name="image" value={undefined}
                                           onChange={(e: any) => handleFile(e, formik)}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="image" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Roles" isRequired={true}/>

                                    {
                                        user?.roles?.length > 0 &&

                                        <Select isMulti name="roles" defaultValue={user.roles}
                                                options={roles}
                                                getOptionLabel={(role) => role?.name}
                                                getOptionValue={(role) => role?.id ? role?.id.toString() : ''}
                                                onChange={multiSelectChangeHandler}/>
                                    }


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
};

export default UserEdit;