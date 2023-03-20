import React from 'react';
import {finalGenericSelectOnChangeHandler} from '../../helpers/form';
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
        finalGenericSelectOnChangeHandler(e, form, setForm, name);
    };

    return (
        <>
            {
                !isResourceLoaded && <Select name={name}
                                             options={options}
                                             getOptionLabel={(instance) => instance.name}
                                             getOptionValue={(instance) => instance.id.toString()}
                                             placeholder={`Select ${name}`}
                                             isClearable={isClearable}
                                             onChange={singleSelectChangeHandler}/>
            }

            {
                isResourceLoaded && <Select name={name} defaultValue={defaultValue}
                                            options={options}
                                            getOptionLabel={(instance) => instance.name}
                                            getOptionValue={(instance) => instance.id.toString()}
                                            placeholder={`Select ${name}`}
                                            isClearable={isClearable}
                                            onChange={singleSelectChangeHandler}/>
            }
        </>
    );
}

export default SingleSelect;