import React, {useState} from 'react';
import {User} from '../../../../../models/iam/User';
import {KTCard, KTCardBody} from '../../../../../../_metronic/helpers';
import FormErrors from '../../../../../components/forms/FormErrors';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import KrysFormLabel from '../../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../../components/forms/KrysFormFooter';
import {ChangePasswordSchema, defaultFormFields, FormFields} from '../../core/changePasswordForm';
import {GenericErrorMessage, genericOnChangeHandler} from '../../../../../helpers/form';
import {changePassword} from '../../../../../requests/iam/User';
import axios from 'axios';
import {extractErrors} from '../../../../../helpers/requests';
import {AlertMessageGenerator} from '../../../../../helpers/AlertMessageGenerator';
import {Actions, KrysToastType} from '../../../../../helpers/variables';
import {useKrysApp} from '../../../../../modules/general/KrysApp';
import {useAuth} from '../../../../../modules/auth';

interface Props {
    user: User | null
}

const ChangePassword: React.FC<Props> = ({user}) => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const krysApp = useKrysApp();
    const {logout} = useAuth()

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleChangePassword = (e: any) => {
        // send API request to create the user
        changePassword(user, form).then(response => {
            console.log(response);
                if (axios.isAxiosError(response)) {
                    // we need to show the errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error message
                    setFormErrors([GenericErrorMessage])
                } else {
                    // we were able to store the user
                    krysApp.setAlert({
                        message: new AlertMessageGenerator('user', Actions.EDIT, KrysToastType.SUCCESS).message,
                        type: KrysToastType.SUCCESS
                    });

                    // timeout and then logout
                    setTimeout(() => {
                        logout();
                    }, 3000)
                }
            }
        );
    };

    return (
        <KTCard className='card-bordered border-1'>
            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={ChangePasswordSchema} onSubmit={handleChangePassword}
                        enableReinitialize>
                    {
                        (formik) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="New password" isRequired={true}/>

                                    <Field className="form-control fs-base" type="password"
                                           placeholder="Enter your new password" name="password"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="password" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Confirm new password" isRequired={true}/>

                                    <Field className="form-control fs-base" type="password"
                                           placeholder="Confirm your new password" name="password_confirmation"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="password_confirmation" className="mt-2"/>
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
}

export default ChangePassword;