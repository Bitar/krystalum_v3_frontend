import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Select from "react-select";
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../components/forms/FormErrors';
import {indentOptions} from '../../../../components/forms/IndentOptions';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysSwitch from "../../../../components/forms/KrysSwitch";
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {filterData} from '../../../../helpers/dataManipulation';
import {
    genericMultiSelectOnChangeHandler,
    genericOnChangeHandler,
    genericSingleSelectOnChangeHandler
} from '../../../../helpers/form';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {submitRequest} from '../../../../helpers/requests';
import {Sections} from '../../../../helpers/sections';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {BuyingModel} from "../../../../models/misc/BuyingModel";
import {Format} from "../../../../models/misc/Format";
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {getAllBuyingModels} from "../../../../requests/misc/BuyingModel";
import {getAllFormats, storeFormat} from '../../../../requests/misc/Format';
import {defaultFormFields, FormatSchema, FormFields} from '../core/form';


const FormatCreate: React.FC = () => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [formats, setFormats] = useState<Format[]>([]);
    const [buyingModels, setBuyingModels] = useState<BuyingModel[]>([]);

    const navigate = useNavigate();
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_FORMATS, PageTypes.CREATE))

        submitRequest(getAllFormats, [], (response) => {
            setFormats(filterData(response, 'name', ['All Formats']));
        }, setFormErrors);

        submitRequest(getAllBuyingModels, [], (response) => {
            setBuyingModels(response);
        }, setFormErrors);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const multiSelectChangeHandler = (e: any) => {
        genericMultiSelectOnChangeHandler(e, form, setForm, 'buying_model_ids');
    };

    const handleCreate = (e: any) => {
        // send API request to create the format
        submitRequest(storeFormat, [form], (response) => {
            // it's format for sure
            krysApp.setAlert({
                message: new AlertMessageGenerator('format', Actions.CREATE, KrysToastType.SUCCESS).message,
                type: KrysToastType.SUCCESS
            });

            navigate(`/misc/formats`);
        }, setFormErrors);
    };

    return (
        <KTCard>
            <KTCardHeader text="Create New Format"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={FormatSchema} onSubmit={handleCreate}
                        enableReinitialize>
                    {
                        ({errors}) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter format name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Code" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter format code" name="code"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="code" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Does this format has buying model?" isRequired={true}/>

                                    <KrysSwitch name="has_buying_model" onChangeHandler={(e) => {
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

                                    <Select name="parent_id"
                                            options={formats}
                                            getOptionLabel={(format) => format.name}
                                            getOptionValue={(format) => format.id.toString()}
                                            onChange={(e) => genericSingleSelectOnChangeHandler(e, form, setForm, 'parent_id')}
                                            formatOptionLabel={indentOptions}
                                            isClearable={true}/>

                                    <div className="mt-3 text-danger">
                                        {errors?.parent_id ? errors?.parent_id : null}
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