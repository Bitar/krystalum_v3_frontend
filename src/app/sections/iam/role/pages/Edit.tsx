import React, {useEffect, useState} from 'react';
import {defaultRole, Role} from '../../../../models/iam/Role';
import {Permission} from '../../../../models/iam/Permission';
import {getPermissions} from '../../../../requests/iam/Permission';
import axios from 'axios';
import {extractErrors} from '../../../../requests/helpers';
import {GenericErrorMessage, genericMultiSelectOnChangeHandler, genericOnChangeHandler} from '../../../../helpers/form';
import {useNavigate, useParams} from 'react-router-dom';
import * as Yup from 'yup';
import {Actions} from '../../../../helpers/variables';
import {getRole, updateRole} from '../../../../requests/iam/Role';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import FormErrors from '../../../../components/form/FormErrors';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import KrysFormLabel from '../../../../components/form/KrysFormLabel';
import Select from 'react-select';
import KrysFormFooter from '../../../../components/form/KrysFormFooter';

const RoleEdit: React.FC = () => {
    const [role, setRole] = useState<Role>(defaultRole);
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const navigate = useNavigate();

    let {id} = useParams();

    useEffect(() => {
        if(id) {
            // get the permissions so we can edit the role's permissions
            getPermissions().then(response => {
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
                if(axios.isAxiosError(response)) {
                    // we were not able to fetch the permission to edit so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if(response === undefined) {
                    navigate('/error/400');
                } else {
                    // we were able to fetch current permission to edit
                    setRole(response);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const EditRoleSchema = Yup.object().shape({
        name: Yup.string().required(),
        permissions: Yup.array().of(Yup.object().shape({
            id: Yup.number(),
            name: Yup.string()
        })).required().min(1, 'You must select at least one permission.')
    });

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, role, setRole);
    };


    const multiSelectChangeHandler = (e: any) => {
        genericMultiSelectOnChangeHandler(e, role, setRole, 'permissions');
    };

    const handleEdit = (e: any) => {
        // we need to update the permission's data by doing API call with form
        updateRole(role).then(response => {
            if(axios.isAxiosError(response)) {
                // show errors
                setFormErrors(extractErrors(response));
            } else if(response === undefined) {
                // show generic error
                setFormErrors([GenericErrorMessage]);
            } else {
                // we got the updated permission so we're good
                navigate(`/iam/roles?success=${Actions.EDIT}`);
            }
        });
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Role" icon="fa-solid fa-pencil" icon_style="fs-3 text-warning"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={role} validationSchema={EditRoleSchema} onSubmit={handleEdit} enableReinitialize>
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

                                    <Select isMulti name="permissions" value={role.permissions}
                                            options={permissions}
                                            getOptionLabel={(permission) => permission?.name}
                                            getOptionValue={(permission) => permission?.id ? permission?.id.toString() : '0'}
                                            onChange={multiSelectChangeHandler}
                                            placeholder="Select one or more permissions"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="permissions" className="mt-2"/>
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

export default RoleEdit;