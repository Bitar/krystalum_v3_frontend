import {ErrorMessage, Field, Form, Formik} from 'formik'
import React, {useEffect, useState} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import FormErrors from '../../../components/forms/FormErrors';
import FormSuccess from '../../../components/forms/FormSuccess';
import KrysFormFooter from '../../../components/forms/KrysFormFooter';
import KrysFormLabel from '../../../components/forms/KrysFormLabel';
import {genericOnChangeHandler} from '../../../helpers/form';
import {submitRequest} from '../../../helpers/requests';
import {defaultResetPasswordFormFields, ResetPasswordFormFields, resetPasswordSchema} from '../core/_forms';

import {resetPassword} from '../core/_requests'

export function ResetPassword() {
    const [searchParams] = useSearchParams();
    const [form, setForm] = useState<ResetPasswordFormFields>(defaultResetPasswordFormFields);
    const [token, setToken] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        // get the search params and set the form's token and email to the values there
        if (searchParams.has('token')) {
            let token = searchParams.get('token');

            if (token) {
                setToken(token);
            }
        }

        if (searchParams.has('email')) {
            let email = searchParams.get('email')

            if (email) {
                setEmail(email);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        let updatedFormFields: ResetPasswordFormFields = {
            token: token,
            email: email,
            password: '',
            password_confirmation: ''
        }

        setForm(updatedFormFields);
    }, [token, email]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handlePasswordReset = (e: any) => {
        // do API call to reset user and send confirmation email
        // when done we need to redirect to login page
        submitRequest(resetPassword, [form], (response) => {
            setIsSuccess(true);

            // we were able to store the user
            setTimeout(() => {
                navigate('/auth/login');
            }, 3000)
        }, setFormErrors);
    };

    return (
        <>
            <FormErrors errorMessages={formErrors}/>

            {
                isSuccess && <FormSuccess
                    message={'The password was successfully changed. You will now be redirected to login with your new password.'}/>
            }

            <Formik initialValues={form} validationSchema={resetPasswordSchema} onSubmit={handlePasswordReset}
                    enableReinitialize>
                {
                    (formik) => (
                        <Form onChange={onChangeHandler}>
                            <div className="mb-7">
                                <KrysFormLabel text="Email address" isRequired={true}/>

                                <Field className="form-control fs-6" type="text"
                                       placeholder="Enter email address" name="email" disabled={true}/>
                            </div>

                            <Field className="form-control fs-6" type="hidden" name="token"/>

                            <div className="mb-7">
                                <KrysFormLabel text="New password" isRequired={true}/>

                                <Field className="form-control fs-6" type="password"
                                       placeholder="Enter new password" name="password"/>

                                <div className="mt-1 text-danger">
                                    <ErrorMessage name="password" className="mt-2"/>
                                </div>
                            </div>

                            <div className="mb-7">
                                <KrysFormLabel text="Repeat new password" isRequired={true}/>

                                <Field className="form-control fs-6" type="password"
                                       placeholder="Repeat new password" name="password_confirmation"/>

                                <div className="mt-1 text-danger">
                                    <ErrorMessage name="password_confirmation" className="mt-2"/>
                                </div>
                            </div>

                            <KrysFormFooter cancelUrl={'/auth/login'} useSeparator={false}/>
                        </Form>
                    )
                }
            </Formik>
        </>
    )
}
