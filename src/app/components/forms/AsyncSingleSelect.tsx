import React, {useEffect, useRef} from 'react';
import {genericSingleSelectOnChangeHandler} from '../../helpers/form';
import {asyncSelectLoadOptions} from '../../helpers/requests';
import AsyncSelect from 'react-select/async';

interface Props {
    isResourceLoaded: boolean;
    options: any[];
    defaultValue: any;
    form: any;
    setForm: React.Dispatch<React.SetStateAction<any>>;
    name: string;
    setFormErrors: React.Dispatch<React.SetStateAction<string[]>>;
    getAllOptions: any;
    isClearable?: boolean;
    doClear?: boolean;
    customOnChange?: (e: any) => void;
    placeholder?: string;
    isDisabled?: boolean;
}

const AsyncSingleSelect: React.FC<Props> = ({
                                                isResourceLoaded,
                                                options,
                                                defaultValue,
                                                form,
                                                setForm,
                                                name,
                                                setFormErrors,
                                                getAllOptions,
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

    const asyncSingleSelectChangeHandler = (e: any) => {
        genericSingleSelectOnChangeHandler(e, form, setForm, name);
    }

    const namePlaceHolder = name.replace(/_id/g, "").replace(/_/g, " ");

    return (
        <>
            {
                !isResourceLoaded && <AsyncSelect name={name}
                                                  placeholder={placeholder ? placeholder : `Select ${namePlaceHolder}`}
                                                  defaultOptions={options}
                                                  getOptionLabel={(option) => option.name}
                                                  getOptionValue={(option) => option.id.toString()}
                                                  isClearable={isClearable}
                                                  ref={selectRef}
                                                  onChange={customOnChange ? customOnChange : asyncSingleSelectChangeHandler}
                                                  loadOptions={inputValue => asyncSelectLoadOptions(inputValue, getAllOptions, setFormErrors)}
                                                  isDisabled={isDisabled}
                />
            }

            {
                isResourceLoaded && <AsyncSelect name={name} defaultValue={defaultValue}
                                                 placeholder={placeholder ? placeholder : `Select ${namePlaceHolder}`}
                                                 defaultOptions={options}
                                                 getOptionLabel={(option) => option.name}
                                                 getOptionValue={(option) => option.id.toString()}
                                                 isClearable={isClearable}
                                                 ref={selectRef}
                                                 onChange={customOnChange ? customOnChange : asyncSingleSelectChangeHandler}
                                                 loadOptions={inputValue => asyncSelectLoadOptions(inputValue, getAllOptions, setFormErrors)}
                                                 isDisabled={isDisabled}/>
            }
        </>
    )
}

export default AsyncSingleSelect;