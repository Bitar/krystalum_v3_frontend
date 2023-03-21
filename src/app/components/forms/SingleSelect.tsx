import React, {useEffect, useRef} from 'react';
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
    doClear?: boolean;
}

const SingleSelect: React.FC<Props> = ({
                                           isResourceLoaded,
                                           options,
                                           defaultValue,
                                           form,
                                           setForm,
                                           name,
                                           isClearable = false,
                                           doClear = false
                                       }) => {

    const selectRef = useRef<any>(null);

    useEffect(() => {
        if(doClear) {
            selectRef.current?.clearValue();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doClear]);

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
                                             ref={selectRef}
                                             onChange={singleSelectChangeHandler}/>
            }

            {
                isResourceLoaded && <Select name={name} defaultValue={defaultValue}
                                            options={options}
                                            getOptionLabel={(instance) => instance.name}
                                            getOptionValue={(instance) => instance.id.toString()}
                                            placeholder={`Select ${name}`}
                                            isClearable={isClearable}
                                            ref={selectRef}
                                            onChange={singleSelectChangeHandler}/>
            }
        </>
    );
}

export default SingleSelect;