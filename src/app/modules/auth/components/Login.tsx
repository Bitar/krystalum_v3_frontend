/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import {Link} from 'react-router-dom'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import {Alert} from 'react-bootstrap'

import {getUserByToken, login} from '../core/_requests'
import {useAuth} from '../core/Auth'
import {defaultLoginFormFields, loginSchema} from '../core/_forms';

export function Login() {
    const {saveAuth, setCurrentUser} = useAuth();
    const [hasErrors, setHasErrors] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleSubmit = async (values: any, {setStatus, setSubmitting}: any) => {
        try {
            const {data: auth} = await login(values.email, values.password)

            saveAuth(auth)

            const {data: user} = await getUserByToken(auth.token)
            setCurrentUser(user)
        } catch (error) {
            saveAuth(undefined)
            setHasErrors(true)
            setErrorMessage('These credentials do not match our records.')
            setSubmitting(false)
        }
    }

    return (
        <Formik initialValues={defaultLoginFormFields} onSubmit={handleSubmit} validationSchema={loginSchema}>
            {({isSubmitting}) => (
                <Form className='form w-100'>
                    <div className='text-center mb-10'>
                        <h1 className='text-dark mb-3'>Sign In to Krystalum</h1>
                    </div>

                    {hasErrors && <Alert variant={'danger'}> {errorMessage} </Alert>}

                    <div className='fv-row mb-10'>
                        <label className='form-label fs-6 fw-bolder text-dark'>Email</label>
                        <Field
                            type='email'
                            name='email'
                            placeholder='Email'
                            className='form-control form-control-lg form-control-solid'
                            autoComplete='off'
                        />
                        <div className='text-danger mt-2'>
                            <ErrorMessage name='email'/>
                        </div>
                    </div>

                    <div className='fv-row mb-10'>
                        <div className='d-flex justify-content-between mt-n5'>
                            <div className='d-flex flex-stack mb-2'>
                                <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
                            </div>
                        </div>
                        <Field
                            type='password'
                            name='password'
                            placeholder='Password'
                            className='form-control form-control-lg form-control-solid'
                            autoComplete='off'
                        />
                        <div className='text-danger mt-2'>
                            <ErrorMessage name='password'/>
                        </div>
                    </div>

                    <div className='text-center'>
                        <button type='submit' className='btn btn-lg btn-krys btn-hover-primary w-100 mb-5'>
                            <span className='indicator-label'>Login</span>
                            {isSubmitting && (
                                <span className='indicator-progress'>
                  Please wait...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'/>
                </span>
                            )}
                        </button>
                        <div className="text-start">
                            <Link
                                to='/auth/forgot-password'
                                className='link-krys fs-6 fw-bolder'
                                style={{marginLeft: '5px'}}
                            >
                                Forgot Password?
                            </Link>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
