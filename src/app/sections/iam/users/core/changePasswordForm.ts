import * as Yup from 'yup';

export interface FormFields {
    password: string,
    password_confirmation: string
}

export const defaultFormFields = {password: '', password_confirmation: ''}

export const ChangePasswordSchema = Yup.object().shape({
    password: Yup.string().required().min(6, 'The password must be at least 6 characters.'),
    password_confirmation: Yup.string().required().oneOf([Yup.ref("password")], "Passwords do not match."),
});