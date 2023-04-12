import React, {useEffect, useRef} from 'react';
import {genericSingleSelectOnChangeHandler} from '../../helpers/form';
import Select from 'react-select';
import {indentOptions} from './IndentOptions';

interface Props {
    isResourceLoaded: boolean;
    options: any[];
    defaultValue: any;
    form: any;
    setForm: React.Dispatch<React.SetStateAction<any>>;
    name: string;
    showHierarchy?: boolean;
    isClearable?: boolean;
    doClear?: boolean;
    customOnChange?: (e: any) => void;
    placeholder?: string;
    isDisabled?: boolean;
}

const SingleSelect: React.FC<Props> = ({
                                           isResourceLoaded,
                                           options,
                                           defaultValue,
                                           form,
                                           setForm,
                                           name,
                                           showHierarchy = false,
                                           isClearable = false,
                                           doClear = false,
                                           customOnChange,
                                           placeholder,
                                           isDisabled = false
                                       }) => {

    const selectRef = useRef<any>(null);

    useEffect(() => {
        if (doClear) {
            selectRef.current?.clearValue();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doClear]);

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
                                             placeholder={placeholder ? placeholder : `Select ${namePlaceHolder}`}
                                             isClearable={isClearable}
                                             ref={selectRef}
                                             formatOptionLabel={showHierarchy ? indentOptions : undefined}
                                             onChange={customOnChange ? customOnChange : singleSelectChangeHandler}
                                             isDisabled={isDisabled}/>
            }

            {
                isResourceLoaded && <Select name={name} defaultValue={defaultValue}
                                            options={options}
                                            getOptionLabel={(instance) => instance.name}
                                            getOptionValue={(instance) => instance.id.toString()}
                                            placeholder={placeholder ? placeholder : `Select ${namePlaceHolder}`}
                                            isClearable={isClearable}
                                            ref={selectRef}
                                            formatOptionLabel={showHierarchy ? indentOptions : undefined}
                                            onChange={customOnChange ? customOnChange : singleSelectChangeHandler}
                                            isDisabled={isDisabled}/>
            }
        </>
    );
}

export default SingleSelect;