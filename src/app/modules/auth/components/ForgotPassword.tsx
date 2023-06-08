import {ErrorMessage, Field, Form, Formik} from 'formik'
import React, {useState} from 'react'
import FormErrors from '../../../components/forms/FormErrors';
import FormSuccess from '../../../components/forms/FormSuccess';
import KrysFormFooter from '../../../components/forms/KrysFormFooter';
import {genericOnChangeHandler} from '../../../helpers/form';
import {submitRequest} from '../../../helpers/requests';
import {defaultForgotPasswordFormFields, ForgotPasswordFormFields, forgotPasswordSchema} from '../core/_forms';

import {requestPassword} from '../core/_requests'

export function ForgotPassword() {
    const [form, setForm] = useState<ForgotPasswordFormFields>(defaultForgotPasswordFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const handleForgotPassword = (e: any) => {
        submitRequest(requestPassword, [form], (response) => {
            // we sent the request to reset password so we need to show success message
            setIsSuccess(true);
        }, setFormErrors);
    };

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    return (
        <>
            <div className='text-center mb-10'>
                {/* begin::Title */}
                <h1 className='text-dark mb-3 fs-2'>Forgot Password?</h1>
                {/* end::Title */}

                {/* begin::Link */}
                <div className='text-gray-400 fw-bold fs-5'>Enter your email to reset your password.</div>
                {/* end::Link */}
            </div>

            <FormErrors errorMessages={formErrors}/>

            {
                isSuccess && <FormSuccess
                    message={'The password reset request was sent. Check your inbox for further instructions.'}/>
            }

            <Formik initialValues={defaultForgotPasswordFormFields} validationSchema={forgotPasswordSchema}
                    onSubmit={handleForgotPassword}
                    enableReinitialize>
                {
                    () => (
                        <Form onChange={onChangeHandler}>
                            <div className="mb-7">
                                <Field className="form-control fs-6" type="text"
                                       placeholder="Enter email address" name="email"/>

                                <div className="mt-1 text-danger">
                                    <ErrorMessage name="email" className="mt-2"/>
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
