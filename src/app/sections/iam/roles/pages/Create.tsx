import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Select from 'react-select';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";

import {genericMultiSelectOnChangeHandler, genericOnChangeHandler} from '../../../../helpers/form';
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {submitRequest} from '../../../../helpers/requests';
import {Sections} from "../../../../helpers/sections";
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {Permission} from '../../../../models/iam/Permission';
import {useKrysApp} from "../../../../modules/general/KrysApp";
import {getAllPermissions} from '../../../../requests/iam/Permission';
import {storeRole} from '../../../../requests/iam/Role';
import {defaultFormFields, FormFields, RoleSchema} from '../core/form';

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
        submitRequest(getAllPermissions, [], (response) => {
            // if we were able to get the list of permissions, then we fill our state with them
            setPermissions(response);
        }, setFormErrors);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCreate = (e: any) => {
        // send API request to create the permission
        submitRequest(storeRole, [form], (response) => {
            // it's permission for sure
            krysApp.setAlert({
                message: new AlertMessageGenerator('role', Actions.CREATE, KrysToastType.SUCCESS).message,
                type: KrysToastType.SUCCESS
            });

            navigate(`/iam/roles`);
        }, setFormErrors);
    };

    return (
        <KTCard>
            <KTCardHeader text="Create New Role"/>

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