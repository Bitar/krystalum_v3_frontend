import React, {useEffect, useRef} from 'react';
import Select from 'react-select';
import {genericMultiSelectOnChangeHandler} from '../../helpers/form';

interface Props {
    isResourceLoaded: boolean;
    options: any[];
    defaultValue: any;
    form: any;
    setForm: React.Dispatch<React.SetStateAction<any>>;
    name: string;
    doClear?: boolean;
    setSelected?: React.Dispatch<React.SetStateAction<any>>;
}

const MultiSelect: React.FC<Props> = ({isResourceLoaded, options, defaultValue, form, setForm, name, doClear = false, setSelected}) => {
    const selectRef = useRef<any>(null);

    useEffect(() => {
        if(doClear) {
            selectRef.current?.clearValue();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doClear]);

    const multiSelectChangeHandler = (e: any) => {
        genericMultiSelectOnChangeHandler(e, form, setForm, name);

        if(setSelected !== undefined) {
            setSelected(e);
        }
    };

    const namePlaceHolder = name.replace(/_ids/g, "").replace(/_/g, " ");

    return (
        <>
            {
                !isResourceLoaded && <Select isMulti name={name}
                                             options={options}
                                             getOptionLabel={(instance) => instance.name}
                                             getOptionValue={(instance) => instance.id.toString()}
                                             placeholder={`Select one or more ${namePlaceHolder}`}
                                             ref={selectRef}
                                             onChange={multiSelectChangeHandler}/>
            }

            {
                isResourceLoaded && <Select isMulti name={name} defaultValue={defaultValue}
                                            options={options}
                                            getOptionLabel={(instance) => instance.name}
                                            getOptionValue={(instance) => instance.id.toString()}
                                            placeholder={`Select one or more ${namePlaceHolder}`}
                                            ref={selectRef}
                                            onChange={multiSelectChangeHandler}/>
            }
        </>
    );
}

export default MultiSelect;