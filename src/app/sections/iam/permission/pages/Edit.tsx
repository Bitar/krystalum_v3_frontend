import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {GenericErrorMessage, genericOnChangeHandler} from '../../../../helpers/form';
import {defaultPermission, Permission} from '../../../../models/iam/Permission';
import {getPermission, updatePermission} from '../../../../requests/iam/Permission';
import {extractErrors} from '../../../../helpers/requests';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {Actions, PageTypes} from '../../../../helpers/variables';
import {useKrys} from "../../../../modules/general/KrysProvider";
import {generatePageTitle} from "../../../../helpers/pageTitleUtils";
import {generateSuccessMessage} from "../../../../helpers/alerts";
import {Modules} from "../../../../helpers/modules";


const PermissionEdit: React.FC = () => {
    const [permission, setPermission] = useState<Permission>(defaultPermission);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const krys = useKrys();

    const navigate = useNavigate();

    let {id} = useParams();

    useEffect(() => {
        if(id) {
            // get the permission we need to edit from the database
            getPermission(parseInt(id)).then(response => {
                if(axios.isAxiosError(response)) {
                    // we were not able to fetch the permission to edit so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if(response === undefined) {
                    navigate('/error/400');
                } else {
                    // we were able to fetch current permission to edit
                    setPermission(response);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        krys.setPageTitle(generatePageTitle(Modules.IAM_PERMISSIONS, PageTypes.EDIT, permission.name))
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
        updatePermission(permission).then(response => {
            if(axios.isAxiosError(response)) {
                // show errors
                setFormErrors(extractErrors(response));
            } else if(response === undefined) {
                // show generic error
                setFormErrors([GenericErrorMessage]);
            } else {
                // we got the updated permission so we're good
                krys.setAlert({message: generateSuccessMessage('permission', Actions.EDIT), type: 'success'})
                navigate(`/iam/permissions`);
            }
        });
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Permission" icon="fa-solid fa-pencil" icon_style="fs-3 text-warning"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={permission} validationSchema={EditPermissionSchema} onSubmit={handleEdit} enableReinitialize>
                    {
                        (formik) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true} />

                                    <Field className="form-control fs-6" type="text"
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
