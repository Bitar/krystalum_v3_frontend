import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {GenericErrorMessage, genericOnChangeHandler} from '../../../../helpers/form';
import {defaultPermission, Permission} from '../../../../models/iam/Permission';
import {storePermission} from '../../../../requests/iam/Permission';
import {extractErrors} from '../../../../helpers/requests';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from "../../../../modules/general/KrysApp";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {
    AlertMessageGenerator
} from "../../../../helpers/AlertMessageGenerator";
import {Sections} from "../../../../helpers/sections";


const PermissionCreate: React.FC = () => {
    const [permission, setPermission] = useState<Permission>(defaultPermission);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.IAM_PERMISSIONS, PageTypes.CREATE))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const CreatePermissionSchema = Yup.object().shape({
        name: Yup.string().required()
    });

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, permission, setPermission);
    };

    const navigate = useNavigate();

    const handleCreate = (e: any) => {
        // send API request to create the permission
        storePermission(permission).then(response => {
                if (axios.isAxiosError(response)) {
                    // we need to show the errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error message
                    setFormErrors([GenericErrorMessage])
                } else {
                    // it's permission for sure
                    krysApp.setAlert({message: new AlertMessageGenerator('permission', Actions.CREATE, KrysToastType.SUCCESS).message, type: KrysToastType.SUCCESS})
                    navigate(`/iam/permissions`);
                }
            }
        );
    };

    return (
        <KTCard>
            <KTCardHeader text="Create New Permission" />

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={permission} validationSchema={CreatePermissionSchema} onSubmit={handleCreate}>
                    {
                        (formik) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true} />

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter permission name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/iam/permissions'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default PermissionCreate;
