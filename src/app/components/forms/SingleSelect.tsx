import React from 'react';
import {genericSingleSelectOnChangeHandler} from '../../helpers/form';
import Select from 'react-select';

interface Props {
    isResourceLoaded: boolean;
    options: any[];
    defaultValue: any;
    form: any;
    setForm: React.Dispatch<React.SetStateAction<any>>;
    name: string;
    isClearable?: boolean;
}

const SingleSelect: React.FC<Props> = ({
                                           isResourceLoaded,
                                           options,
                                           defaultValue,
                                           form,
                                           setForm,
                                           name,
                                           isClearable = false
                                       }) => {
    const singleSelectChangeHandler = (e: any) => {
        genericSingleSelectOnChangeHandler(e, form, setForm, name);
    };

    const namePlaceHolder = name.replace(/_id/g, "").replace(/_/g, " ");

    return (
        <>
            {
                !isResourceLoaded && <Select name={name}
                                             options={options}
                                             getOptionLabel={(instance) => instance.name}
                                             getOptionValue={(instance) => instance.id.toString()}
                                             placeholder={`Select ${namePlaceHolder}`}
                                             isClearable={isClearable}
                                             onChange={singleSelectChangeHandler}/>
            }

            {
                isResourceLoaded && <Select name={name} defaultValue={defaultValue}
                                            options={options}
                                            getOptionLabel={(instance) => instance.name}
                                            getOptionValue={(instance) => instance.id.toString()}
                                            placeholder={`Select ${namePlaceHolder}`}
                                            isClearable={isClearable}
                                            onChange={singleSelectChangeHandler}/>
            }
        </>
    );
}

export default SingleSelect;