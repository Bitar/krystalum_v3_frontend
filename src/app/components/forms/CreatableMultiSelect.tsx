import React, {useEffect, useRef} from 'react';
import CreatableSelect from 'react-select/creatable';

interface Props {
    isResourceLoaded: boolean;
    options: any[];
    defaultValue: any;
    form: any;
    setForm: React.Dispatch<React.SetStateAction<any>>;
    name: string;
    newOptionsName: string;
    placeholder?: string;
    doClear?: boolean;
    isDisabled?: boolean;
}

const CreatableMultiSelect: React.FC<Props> = ({
                                                   isResourceLoaded,
                                                   options,
                                                   defaultValue,
                                                   form,
                                                   setForm,
                                                   name,
                                                   newOptionsName,
                                                   placeholder,
                                                   doClear = false,
                                                   isDisabled = false
                                               }) => {


    const selectRef = useRef<any>(null);

    useEffect(() => {
        if (doClear) {
            selectRef.current?.clearValue();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doClear]);

    const creatableSelectChangeHandler = (e: any) => {
        let newOptions: string [] = [];
        let selectedOptions: number[] = [];

        e.forEach((option: any) => {
            if (isNaN(parseInt(option.value))) {
                // this is a new option
                newOptions.push(option.value);
            } else {
                // this is a selected option
                selectedOptions.push(parseInt(option.value));
            }

            setForm({...form, [name]: selectedOptions, [newOptionsName]: newOptions});
        });
    }

    const namePlaceHolder = name.replace(/_ids/g, "").replace(/_/g, " ");

    return (
        <>
            {
                !isResourceLoaded && <CreatableSelect isMulti name={name}
                                                      options={options.map((option) => ({
                                                          value: option.id.toString(),
                                                          label: option.name,
                                                      }))}
                                                      onChange={creatableSelectChangeHandler}
                                                      isDisabled={isDisabled}
                                                      ref={selectRef}
                                                      placeholder={placeholder ? placeholder : `Select one or more ${namePlaceHolder}`}
                />
            }

            {
                isResourceLoaded && <CreatableSelect isMulti name={name}
                                                     defaultValue={defaultValue.map((option: any) => ({
                                                         value: option.id.toString(),
                                                         label: option.name,
                                                     }))}
                                                     options={options.map((option) => ({
                                                         value: option.id.toString(),
                                                         label: option.name,
                                                     }))}
                                                     onChange={creatableSelectChangeHandler}
                                                     isDisabled={isDisabled}
                                                     ref={selectRef}
                                                     placeholder={placeholder ? placeholder : `Select one or more ${namePlaceHolder}`}
                />
            }
        </>
    )
}

export default CreatableMultiSelect;