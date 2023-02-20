import React, {useEffect, useState} from 'react'
import * as Yup from 'yup'
import axios from 'axios';
import {useNavigate, useSearchParams} from 'react-router-dom'
import {ErrorMessage, Field, Form, Formik} from 'formik'

import {resetPassword} from '../core/_requests'
import KrysFormLabel from '../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../components/forms/KrysFormFooter';
import {extractErrors} from '../../../helpers/requests';
import {GenericErrorMessage, genericOnChangeHandler} from '../../../helpers/form';
import FormErrors from '../../../components/forms/FormErrors';

const resetPasswordSchema = Yup.object().shape({
    email: Yup.string().email().min(3, 'The email must be at least 3 characters.').max(50, 'The email must be at most 50 characters.').required(),
    password: Yup.string().required().min(6, 'The password must be at least 6 characters.'),
    password_confirmation: Yup.string().required().oneOf([Yup.ref("password")], "Passwords do not match."),
})

interface FormFields {
    token: string,
    email: string,
    password: string,
    password_confirmation: string
}

const defaultFormFields: FormFields = {
    token: '',
    email: '',
    password: '',
    password_confirmation: ''
}

export function ResetPassword() {
    const [searchParams] = useSearchParams();
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [token, setToken] = useState<string>('');
    const [email, setEmail] = useState<string>('');

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
        let updatedFormFields: FormFields = {
            token: token,
            email: email,
            password: '',
            password_confirmation: ''
        }

        setForm(updatedFormFields);
    }, [token, email]);

    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handlePasswordReset = (e: any) => {
        // do API call to reset user and send confirmation email
        setLoading(true);
        // when done we need to redirect to login page

        resetPassword(form).then(response => {
            setLoading(false);

                if (axios.isAxiosError(response)) {
                    // we need to show the errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error message
                    setFormErrors([GenericErrorMessage])
                } else {
                    // we were able to store the user
                    setTimeout(() => {
                        navigate('/auth/login');
                    }, 1000)
                }
            }
        );
    };

    return (
        <>
            <FormErrors errorMessages={formErrors}/>

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

                            <KrysFormFooter loading={loading}/>
                        </Form>
                    )
                }
            </Formik>
        </>
    )
}
