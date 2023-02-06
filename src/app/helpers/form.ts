import React from 'react';

export const genericOnChangeHandler = (e: any, form: any, setForm: React.Dispatch<React.SetStateAction<any>>) => {
    const value = e.target.value;
    const name = e.target.name;

    setForm({
        ...form,
        [name]: value
    });
};

export const GenericErrorMessage: string = 'Oops! Something went wrong. Try again later.';