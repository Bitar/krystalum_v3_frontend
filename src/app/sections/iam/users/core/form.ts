import * as Yup from 'yup';
import {SUPPORTED_IMAGE_FORMATS} from '../../../../helpers/form';

export interface FormFields {
    name: string,
    password?: string,
    password_confirmation?: string,
    email: string,
    image?: File,
    roles: number[]
}

export const defaultFormFields: FormFields = {
    name: '',
    password: '',
    password_confirmation: '',
    email: '',
    image: undefined,
    roles: []
}

export const CreateUserSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required().email(),
    password: Yup.string().required().min(6, 'The password must be at least 6 characters.'),
    password_confirmation: Yup.string().required().oneOf([Yup.ref("password")], "Passwords do not match."),
    image: Yup.mixed().nullable().notRequired().test('fileFormat', 'The file must be an image of type .jpg .jpeg .gif or .png', value => !value || (value && SUPPORTED_IMAGE_FORMATS.includes(value.type))),
    roles: Yup.array().of(Yup.number()).required().min(1, 'You must select at least one role.')
});

export const EditUserSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required().email(),
    image: Yup.mixed().nullable().notRequired().test('fileFormat', 'The file must be an image of type .jpg .jpeg .gif or .png', value => !value || (value && SUPPORTED_IMAGE_FORMATS.includes(value.type))),
    roles: Yup.array().of(Yup.number()).required().min(1, 'You must select at least one role.')
});