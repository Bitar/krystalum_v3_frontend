import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {
    GenericErrorMessage, genericMultiSelectOnChangeHandler,
    genericOnChangeHandler, genericSelectOnChangeHandler,
} from '../../../../helpers/form';
import {extractErrors} from '../../../../helpers/requests';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import Select from 'react-select';
import {defaultFormFields, FormFields, FormatSchema} from '../core/form';
import {getAllFormats, getFormat, updateFormat} from "../../../../requests/misc/Format";
import {defaultFormat, Format} from "../../../../models/misc/Format";
import {AlertMessageGenerator} from "../../../../helpers/alertMessageGenerator";
import {getAllBuyingModels} from "../../../../requests/misc/BuyingModel";
import {BuyingModel} from "../../../../models/misc/BuyingModel";
import MultiSelect from "../../../../components/forms/MultiSelect";

const FormatEdit: React.FC = () => {
    const [format, setFormat] = useState<Format>(defaultFormat);
    const [form, setForm] = useState<FormFields>(defaultFormFields)
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [formats, setFormats] = useState<Format[]>([]);
    const [buyingModels, setBuyingModels] = useState<BuyingModel[]>([]);
    const [isResourceLoaded, setIsResourceLoaded] = useState<boolean>(false)

    const krysApp = useKrysApp();

    const navigate = useNavigate();

    let {id} = useParams();

    useEffect(() => {
        if (id) {
            // get the format we need to edit from the database
            getFormat(parseInt(id)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch the format to edit, so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    navigate('/error/400');
                } else {
                    // we were able to fetch current format to edit
                    setFormat(response);

                    const {buyingModels, ...currentFormat} = response

                    setForm({...currentFormat, buying_model_ids: response.buyingModels.map(buyingModel => buyingModel.id)});
                }
            });

            // get the formats
            getAllFormats().then(response => {
                if (axios.isAxiosError(response)) {
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    setFormErrors([GenericErrorMessage])
                } else {
                    // if we were able to get the list of formats, then we fill our state with them
                    if (response.data) {
                        setFormats(response.data);
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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        setIsResourceLoaded(true);

        krysApp.setPageTitle(generatePageTitle(Sections.MISC_FORMATS, PageTypes.EDIT, format.name))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [format]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const selectChangeHandler = (e: any) => {
        genericSelectOnChangeHandler(e, form, setForm, 'parent');
    };

    const multiSelectChangeHandler = (e: any) => {
        genericMultiSelectOnChangeHandler(e, form, setForm, 'buying_model_ids');
    };

    const handleEdit = (e: any) => {
        // we need to update the format's data by doing API call with form
        updateFormat(form).then(response => {
            if (axios.isAxiosError(response)) {
                // show errors
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                // show generic error
                setFormErrors([GenericErrorMessage]);
            } else {
                // we got the booking format so we're good
                krysApp.setAlert({
                    message: new AlertMessageGenerator('format', Actions.EDIT, KrysToastType.SUCCESS).message,
                    type: KrysToastType.SUCCESS
                });

                navigate(`/misc/formats`);
            }
        });
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Format"/>
            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={FormatSchema} onSubmit={handleEdit}
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
                                           placeholder="Enter format code" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="code" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Buying models" isRequired={false}/>

                                    <MultiSelect isResourceLoaded={isResourceLoaded} options={buyingModels}
                                                 defaultValue={format?.buyingModels} form={form} setForm={setForm}
                                                 name={'buying_model_ids'}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="buying_model_ids" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Format Parent" isRequired={false}/>

                                    <Select name="parent_id"
                                            options={formats}
                                            value={form.parent}
                                            getOptionLabel={(format) => format.name}
                                            getOptionValue={(format) => format.id.toString()}
                                            onChange={selectChangeHandler}
                                            formatOptionLabel={(option) => {
                                                if (option.parent !== null) {
                                                    // this is a child
                                                    return (
                                                        <div style={{marginLeft: '1em'}}>
                                                            {option.name}
                                                        </div>
                                                    );
                                                } else {
                                                    // this is a parent
                                                    return (
                                                        <div>
                                                            {option.name}
                                                        </div>
                                                    );
                                                }
                                            }}
                                            isClearable={true}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="parent_id" className="mt-2"/>
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

export default FormatEdit;