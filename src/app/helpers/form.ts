import React from 'react';
import {FormikProps} from 'formik';

export const genericOnChangeHandler = (e: any, form: any, setForm: React.Dispatch<React.SetStateAction<any>>) => {
    const value = e.target.value;
    const name = e.target.name;

    if(name) {
        setForm({
            ...form,
            [name]: value
        });
    }
};

export const GenericErrorMessage: string = 'Oops! Something went wrong. Try again later.';

export const genericMultiSelectOnChangeHandler = (e: any, form: any, setForm: React.Dispatch<React.SetStateAction<any>>, key: string) => {
    if (e.length > 0) {
        setForm({...form, [key]: e.map((entity: any) => entity.id)});
    } else {
        setForm({...form, [key]: []});
    }
};

export const genericSelectOnChangeHandler = (e: any, form: any, setForm: React.Dispatch<React.SetStateAction<any>>, key: string) => {
    if(e) {
        setForm({...form, [key]: e.id});
    } else {
        // this happens when we're trying to unselect an option
        // we need to remove the [key] property from the form and set the new value as form
        const {[key]: _, ...newForm} = form

        setForm(newForm);
    }
};

export const genericSingleSelectV2OnChangeHandler = (e: any, form: any, setForm: React.Dispatch<React.SetStateAction<any>>, key: string) => {
    setForm({...form, [key]: e});
};

export const genericSelectV2OnChangeHandler = (e: any, form: any, setForm: React.Dispatch<React.SetStateAction<any>>, key: string) => {
    setForm({...form, [key]: e});
};
export const genericSingleSelectOnChangeHandler = (e: any, form: any, setForm: React.Dispatch<React.SetStateAction<any>>, key: string, key2: string) => {
    if(e) {
        setForm({...form, [key]: e.id, [key2]: e});
    } else {
        // this happens when we're trying to unselect an option
        // we need to remove the [key] and [key2] properties from the form and set the new value as form
        const {[key]: _, [key2]: __, ...newForm} = form

        setForm(newForm);
    }
};

export const SUPPORTED_IMAGE_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
];
export const genericHandleSingleFile = (e: any, formik: FormikProps<any>, form: any, setForm: React.Dispatch<React.SetStateAction<any>>, key: string) => {
    let file = e.target.files[0];

    setForm({...form, [key]: file});

    formik.setFieldValue(key, file);
};