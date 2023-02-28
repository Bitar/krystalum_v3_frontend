import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik} from 'formik';

import {defaultRole, Role} from '../../../../models/iam/Role';
import {Permission} from '../../../../models/iam/Permission';
import {getAllPermissions} from '../../../../requests/iam/Permission';
import {extractErrors} from '../../../../helpers/requests';
import {GenericErrorMessage, genericMultiSelectOnChangeHandler, genericOnChangeHandler} from '../../../../helpers/form';
import {Actions, PageTypes} from '../../../../helpers/variables';
import {getRole, updateRole} from '../../../../requests/iam/Role';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {defaultFormFields, FormFields, RoleSchema} from '../core/form';
import {useKrysApp} from "../../../../modules/general/KrysApp";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {generateSuccessMessage} from "../../../../helpers/alerts";
import {Sections} from "../../../../helpers/sections";

const RoleEdit: React.FC = () => {
    const [role, setRole] = useState<Role>(defaultRole);
    const [form, setForm] = useState<FormFields>(defaultFormFields)


    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const krysApp = useKrysApp();

    const navigate = useNavigate();

    let {id} = useParams();

    useEffect(() => {
        if (id) {
            // get the permissions so we can edit the role's permissions
            getAllPermissions().then(response => {
                if (axios.isAxiosError(response)) {
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    setFormErrors([GenericErrorMessage])
                } else if (response.data) {
                    // if we were able to get the list of permissions, then we fill our state with them
                    setPermissions(response.data);
                }
            });

            // get the permission we need to edit from the database
            getRole(parseInt(id)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch the permission to edit so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    navigate('/error/400');
                } else {
                    // we were able to fetch current permission to edit
                    setRole(response);

                    const {permissions, ...currentRole} = response

                    setForm({...currentRole, permissions: response.permissions.map(permission => permission.id)});
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.IAM_ROLES, PageTypes.EDIT, role.name))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [role]);

    const onChangeHandler = (e: any) => {
        // in case of multi select, the element doesn't have a name because
        // we get only a list of values from the select and not an element with target value and name
        if (e.target.name !== '') {
            genericOnChangeHandler(e, form, setForm);
        }
    };

    const multiSelectChangeHandler = (e: any) => {
        genericMultiSelectOnChangeHandler(e, form, setForm, 'permissions');
    };

    const handleEdit = (e: any) => {
        // we need to update the permission's data by doing API call with form
        updateRole(form).then(response => {
            if (axios.isAxiosError(response)) {
                // show errors
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                // show generic error
                setFormErrors([GenericErrorMessage]);
            } else {
                // we got the updated permission so we're good
                krysApp.setAlert({message: generateSuccessMessage('role', Actions.EDIT), type: 'success'})
                navigate(`/iam/roles`);
            }
        });
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Role" icon="fa-solid fa-pencil" icon_style="fs-3 text-warning"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={RoleSchema} onSubmit={handleEdit} enableReinitialize>
                    {
                        (formik) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-6" type="text"
                                           placeholder="Enter role name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Permissions" isRequired={true}/>

                                    {role?.permissions?.length > 0 &&
                                        <Select isMulti
                                                name="permissions"
                                                defaultValue={role?.permissions}
                                                options={permissions}
                                                getOptionLabel={(permission) => permission?.name}
                                                getOptionValue={(permission) => permission?.id ? permission?.id.toString() : '0'}
                                                onChange={multiSelectChangeHandler}
                                                placeholder="Select one or more permissions"/>
                                    }

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="permissions" className="mt-2"/>
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/iam/roles'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    );
}

export default RoleEdit;