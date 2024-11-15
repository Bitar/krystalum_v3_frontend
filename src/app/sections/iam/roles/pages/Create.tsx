import React, {useEffect, useState} from 'react';

import {GenericErrorMessage, genericMultiSelectOnChangeHandler, genericOnChangeHandler} from '../../../../helpers/form';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {extractErrors} from '../../../../helpers/requests';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {storeRole} from '../../../../requests/iam/Role';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import FormErrors from '../../../../components/forms/FormErrors';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import Select from 'react-select';
import {getAllPermissions} from '../../../../requests/iam/Permission';
import {Permission} from '../../../../models/iam/Permission';
import {defaultFormFields, FormFields, RoleSchema} from '../core/form';
import {useKrysApp} from "../../../../modules/general/KrysApp";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {Sections} from "../../../../helpers/sections";

const RoleCreate: React.FC = () => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [permissions, setPermissions] = useState<Permission[]>([]);

    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.IAM_ROLES, PageTypes.CREATE))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeHandler = (e: any) => {
        // in case of multi select, the element doesn't have a name because
        // we get only a list of values from the select and not an element with target value and name
        genericOnChangeHandler(e, form, setForm);
    };

    const multiSelectChangeHandler = (e: any) => {
        genericMultiSelectOnChangeHandler(e, form, setForm, 'permissions');
    };

    const navigate = useNavigate();

    useEffect(() => {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCreate = (e: any) => {
        // send API request to create the permission
        storeRole(form).then(response => {
                if (axios.isAxiosError(response)) {
                    // we need to show the errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error message
                    setFormErrors([GenericErrorMessage])
                } else {
                    // it's permission for sure
                    krysApp.setAlert({message: new AlertMessageGenerator('role', Actions.CREATE, KrysToastType.SUCCESS).message, type: KrysToastType.SUCCESS})
                    navigate(`/iam/roles`);
                }
            }
        );
    };

    return (
        <KTCard>
            <KTCardHeader text="Create New Role" />

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={RoleSchema} onSubmit={handleCreate}
                        enableReinitialize>
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

                                    <Select isMulti name="permissions"
                                            options={permissions}
                                            getOptionLabel={(permission) => permission.name}
                                            getOptionValue={(permission) => permission.id.toString()}
                                            onChange={multiSelectChangeHandler}
                                            placeholder="Select one or more permissions"/>

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
    )
}

export default RoleCreate;