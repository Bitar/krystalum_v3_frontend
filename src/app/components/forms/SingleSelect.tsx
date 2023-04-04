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
                                           doClear = false
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
                                             placeholder={`Select ${namePlaceHolder}`}
                                             isClearable={isClearable}
                                             ref={selectRef}
                                             formatOptionLabel={showHierarchy ? indentOptions : undefined}
                                             onChange={singleSelectChangeHandler}/>
            }

            {
                isResourceLoaded && <Select name={name} defaultValue={defaultValue}
                                            options={options}
                                            getOptionLabel={(instance) => instance.name}
                                            getOptionValue={(instance) => instance.id.toString()}
                                            placeholder={`Select ${namePlaceHolder}`}
                                            isClearable={isClearable}
                                            ref={selectRef}
                                            formatOptionLabel={showHierarchy ? indentOptions : undefined}
                                            onChange={singleSelectChangeHandler}/>
            }
        </>
    );
}

export default SingleSelect;