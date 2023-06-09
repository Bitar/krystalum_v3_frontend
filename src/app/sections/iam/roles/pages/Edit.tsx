import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Select from 'react-select';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {genericMultiSelectOnChangeHandler, genericOnChangeHandler} from '../../../../helpers/form';
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {getErrorPage, submitRequest} from '../../../../helpers/requests';
import {Sections} from "../../../../helpers/sections";
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {Permission} from '../../../../models/iam/Permission';

import {Role} from '../../../../models/iam/Role';
import {useKrysApp} from "../../../../modules/general/KrysApp";
import {getAllPermissions} from '../../../../requests/iam/Permission';
import {getRole, updateRole} from '../../../../requests/iam/Role';
import {defaultFormFields, FormFields, RoleSchema} from '../core/form';

const RoleEdit: React.FC = () => {
    const [role, setRole] = useState<Role | null>(null);
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([]);

    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const krysApp = useKrysApp();
    const navigate = useNavigate();

    let {id} = useParams();

    useEffect(() => {
        if (id) {
            // get the permissions so we can edit the role's permissions
            submitRequest(getAllPermissions, [], (response) => {
                // if we were able to get the list of permissions, then we fill our state with them
                setPermissions(response);
            }, setFormErrors);

            // get the role we need to edit from the database
            submitRequest(getRole, [parseInt(id)], (response) => {
                let errorPage = getErrorPage(response);

                if (errorPage) {
                    navigate(errorPage);
                } else {
                    // we were able to fetch current permission to edit
                    setRole(response);

                    krysApp.setPageTitle(generatePageTitle(Sections.IAM_ROLES, PageTypes.EDIT, response.name));

                    const {permissions, ...currentRole} = response

                    setForm({...currentRole, permissions: permissions.map((permission: Permission) => permission.id)});
                    setSelectedPermissions(permissions);
                }
            })

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const onChangeHandler = (e: any) => {
        // in case of multi select, the element doesn't have a name because
        // we get only a list of values from the select and not an element with target value and name
        genericOnChangeHandler(e, form, setForm);
    };

    const handleEdit = (e: any) => {
        if (role) {
            // we need to update the permission's data by doing API call with form
            submitRequest(updateRole, [role.id, form], (response) => {
                // we got the updated permission so we're good
                krysApp.setAlert({
                    message: new AlertMessageGenerator('role', Actions.EDIT, KrysToastType.SUCCESS).message,
                    type: KrysToastType.SUCCESS
                });

                navigate(`/iam/roles`);
            }, setFormErrors);
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Role"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={RoleSchema} onSubmit={handleEdit} enableReinitialize>
                    {
                        (formik) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter role name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Permissions" isRequired={true}/>

                                    <Select isMulti name={'permissions'} value={selectedPermissions}
                                            options={permissions}
                                            getOptionLabel={(instance) => instance.name}
                                            getOptionValue={(instance) => instance.id.toString()}
                                            placeholder={`Select one or more permissions`}
                                            onChange={(e) => {
                                                genericMultiSelectOnChangeHandler(e, form, setForm, 'permissions');

                                                let newPermissions : Permission[] = e as Permission[];
                                                setSelectedPermissions(newPermissions);
                                            }}/>

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