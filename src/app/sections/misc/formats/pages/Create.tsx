import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {defaultFormFields, FormFields, FormatSchema} from '../core/form';
import {
    GenericErrorMessage,
    genericMultiSelectOnChangeHandler,
    genericOnChangeHandler,
    genericSelectOnChangeHandler
} from '../../../../helpers/form';
import {extractErrors} from '../../../../helpers/requests';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import FormErrors from '../../../../components/forms/FormErrors';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {getAllFormats, storeFormat} from '../../../../requests/misc/Format';
import Select from "react-select";
import {Format} from "../../../../models/misc/Format";
import {AlertMessageGenerator} from "../../../../helpers/alertMessageGenerator";
import KrysCheckbox from "../../../../components/forms/KrysCheckbox";
import {BuyingModel} from "../../../../models/misc/BuyingModel";
import {getAllBuyingModels} from "../../../../requests/misc/BuyingModel";
import {filterData} from '../../../../helpers/dataManipulation';
import {indentOptions} from '../../../../components/forms/IndexOptions';


const FormatCreate: React.FC = () => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [formats, setFormats] = useState<Format[]>([]);
    const [buyingModels, setBuyingModels] = useState<BuyingModel[]>([]);

    const navigate = useNavigate();
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_FORMATS, PageTypes.CREATE))

        getAllFormats().then(response => {
            if (axios.isAxiosError(response)) {
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                setFormErrors([GenericErrorMessage]);
            } else {
                // if we were able to get the list of formats, then we fill our state with them
                if (response.data) {
                    setFormats(filterData(response.data, 'name', 'All Formats'));
                }
            }
        });

        getAllBuyingModels().then(response => {
            if (axios.isAxiosError(response)) {
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                setFormErrors([GenericErrorMessage]);
            } else {
                // if we were able to get the list of buying models, then we fill our state with them
                if (response.data) {
                    setBuyingModels(response.data);
                }
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const selectChangeHandler = (e: any) => {
        genericSelectOnChangeHandler(e, form, setForm, 'parent');
    };

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const multiSelectChangeHandler = (e: any) => {
        genericMultiSelectOnChangeHandler(e, form, setForm, 'buying_model_ids');
    };

    const handleCreate = (e: any) => {
        // send API request to create the format
        storeFormat(form).then(response => {
                if (axios.isAxiosError(response)) {
                    // we need to show the errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error message
                    setFormErrors([GenericErrorMessage])
                } else {
                    // it's format for sure
                    krysApp.setAlert({
                        message: new AlertMessageGenerator('format', Actions.CREATE, KrysToastType.SUCCESS).message,
                        type: KrysToastType.SUCCESS
                    })

                    navigate(`/misc/formats`);
                }
            }
        );
    };

    return (
        <KTCard>
            <KTCardHeader text="Create New Format" icon="fa-regular fa-plus" icon_style="fs-3 text-success"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={FormatSchema} onSubmit={handleCreate}
                        enableReinitialize>
                    {
                        () => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-6" type="text"
                                           placeholder="Enter format name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Code" isRequired={true}/>

                                    <Field className="form-control fs-6" type="text"
                                           placeholder="Enter format code" name="code"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="code" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Does this format has buying model?" isRequired={true}/>

                                    <KrysCheckbox name="has_buying_model" onChangeHandler={(e) => {
                                        e.stopPropagation();
                                        setForm({...form, has_buying_model: Number(!form.has_buying_model)});
                                    }} defaultValue={Boolean(form.has_buying_model)}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="has_buying_model" className="mt-2"/>
                                    </div>
                                </div>

                                {form.has_buying_model > 0 && <div className="mb-7">
                                    <KrysFormLabel text="Buying models" isRequired={true}/>

                                    <Select isMulti name="buying_model_ids"
                                            options={buyingModels}
                                            getOptionLabel={(buyingModel) => buyingModel.name}
                                            getOptionValue={(buyingModel) => buyingModel.id.toString()}
                                            onChange={multiSelectChangeHandler}
                                            placeholder="Select one or more buying models"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="buying_model_ids" className="mt-2"/>
                                    </div>
                                </div>
                                }

                                <div className="mb-7">
                                    <KrysFormLabel text="Format Parent" isRequired={false}/>

                                    <Select name="parent"
                                            options={formats}
                                            getOptionLabel={(format) => format.name}
                                            getOptionValue={(format) => format.id.toString()}
                                            onChange={selectChangeHandler}
                                            formatOptionLabel={indentOptions}
                                            isClearable={true}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="parent" className="mt-2"/>
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/misc/formats'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default FormatCreate;