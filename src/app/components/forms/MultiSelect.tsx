import React from 'react';
import Select from 'react-select';
import {genericMultiSelectOnChangeHandler} from '../../helpers/form';

interface Props {
    isResourceLoaded: boolean;
    options: any[];
    defaultValue: any;
    form: any;
    setForm: React.Dispatch<React.SetStateAction<any>>;
    name: string;
}

const MultiSelect: React.FC<Props> = ({isResourceLoaded, options, defaultValue, form, setForm, name}) => {
    const multiSelectChangeHandler = (e: any) => {
        genericMultiSelectOnChangeHandler(e, form, setForm, name);
    };

    return (
        <>
            {
                !isResourceLoaded && <Select isMulti name={name}
                                             options={options}
                                             getOptionLabel={(instance) => instance.name}
                                             getOptionValue={(instance) => instance.id.toString()}
                                             placeholder={`Select one or more ${name}`}
                                             onChange={multiSelectChangeHandler}/>
            }

            {
                isResourceLoaded && <Select isMulti name={name} defaultValue={defaultValue}
                                            options={options}
                                            getOptionLabel={(instance) => instance.name}
                                            getOptionValue={(instance) => instance.id.toString()}
                                            placeholder={`Select one or more ${name}`}
                                            onChange={multiSelectChangeHandler}/>
            }
        </>
    );
}

export default MultiSelect;