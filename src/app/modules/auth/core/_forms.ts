import * as Yup from 'yup';

// ---------------------------------------------------------------------------------------------------------------------
// Login Form
// ---------------------------------------------------------------------------------------------------------------------

export const loginSchema = Yup.object().shape({
    email: Yup.string().email().min(3, 'Minimum 3 symbols').max(50, 'Maximum 50 symbols').required(),
    password: Yup.string().min(3, 'Minimum 3 symbols').max(50, 'Maximum 50 symbols').required()
})

export interface LoginFormFields {
    email: string,
    password: string
}

export const defaultLoginFormFields: LoginFormFields = {
    email: '',
    password: ''
}

// ---------------------------------------------------------------------------------------------------------------------
// Forgot Password Form
// ---------------------------------------------------------------------------------------------------------------------

export const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email().min(3, 'Minimum 3 symbols').max(50, 'Maximum 50 symbols').required()
})

export interface ForgotPasswordFormFields {
    email: string
}

export const defaultForgotPasswordFormFields: ForgotPasswordFormFields = {
    email: ''
}

// ---------------------------------------------------------------------------------------------------------------------
// Reset Password Form
// ---------------------------------------------------------------------------------------------------------------------

export const resetPasswordSchema = Yup.object().shape({
    email: Yup.string().email().min(3, 'The email must be at least 3 characters.').max(50, 'The email must be at most 50 characters.').required(),
    password: Yup.string().required().min(6, 'The password must be at least 6 characters.'),
    password_confirmation: Yup.string().required().oneOf([Yup.ref("password")], "Passwords do not match."),
})

export interface ResetPasswordFormFields {
    token: string,
    email: string,
    password: string,
    password_confirmation: string
}

export const defaultResetPasswordFormFields: ResetPasswordFormFields = {
    token: '',
    email: '',
    password: '',
    password_confirmation: ''
}