import React from 'react';
import {FormikProps} from 'formik';

export const genericOnChangeHandler = (e: any, form: any, setForm: React.Dispatch<React.SetStateAction<any>>) => {
    const value = e.target.value;
    const name = e.target.name;

    // if the value was Array then the multi select handler would take care of it
    if(name) {
        setForm({
            ...form,
            [name]: value
        });
    }
};

export const GenericErrorMessage: string = 'Oops! Something went wrong. Try again later.';

export const genericMultiSelectOnChangeHandler = (e: any, form: any, setForm: React.Dispatch<React.SetStateAction<any>>, key: string) => {
    if(e.length > 0) {
        setForm({...form, [key]: e.map((entity: any) => entity.id)});
    } else {
        setForm({...form, [key]: []});
    }
};

export const genericSelectOnChangeHandler = (e: any, form: any, setForm: React.Dispatch<React.SetStateAction<any>>, key: string) => {
    setForm({...form, [key]: e.id});
};

export const genericSelectV2OnChangeHandler = (e: any, form: any, setForm: React.Dispatch<React.SetStateAction<any>>, key: string) => {
    setForm({...form, [key]: e});
};


export const genericSingleSelectOnChangeHandler = (e: any, form: any, setForm: React.Dispatch<React.SetStateAction<any>>, key: string, key2: string) => {
    setForm({...form, [key]: e.id, [key2]: e});
};

export const genericSingleSelectV2OnChangeHandler = (e: any, form: any, setForm: React.Dispatch<React.SetStateAction<any>>, key: string) => {
    setForm({...form, [key]: e});
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