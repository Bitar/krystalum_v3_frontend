import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {genericOnChangeHandler} from '../../../../helpers/form';
import {defaultPermission, Permission} from '../../../../models/iam/Permission';
import {getPermission, updatePermission} from '../../../../requests/iam/Permission';
import {getErrorPage, submitRequest} from '../../../../helpers/requests';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from "../../../../modules/general/KrysApp";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {Sections} from "../../../../helpers/sections";


const PermissionEdit: React.FC = () => {
    const [permission, setPermission] = useState<Permission>(defaultPermission);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const krysApp = useKrysApp();

    const navigate = useNavigate();

    let {id} = useParams();

    useEffect(() => {
        if (id) {
            // get the permission we need to edit from the database
            submitRequest(getPermission, [parseInt(id)], (response) => {
                let errorPage = getErrorPage(response);

                if (errorPage) {
                    navigate(errorPage);
                } else {
                    // we were able to fetch current permission to edit
                    setPermission(response);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.IAM_PERMISSIONS, PageTypes.EDIT, permission.name))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [permission]);

    const EditPermissionSchema = Yup.object().shape({
        name: Yup.string().required()
    });

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, permission, setPermission);
    };

    const handleEdit = (e: any) => {
        // we need to update the permission's data by doing API call with form
        submitRequest(updatePermission, [permission.id, permission], (response) => {
            // we got the updated permission so we're good
            krysApp.setAlert({
                message: new AlertMessageGenerator('permission', Actions.EDIT, KrysToastType.SUCCESS).message,
                type: KrysToastType.SUCCESS
            })

            navigate(`/iam/permissions`);
        }, setFormErrors);
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Permission"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={permission} validationSchema={EditPermissionSchema} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        (formik) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

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

export default PermissionEdit;
