import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {
    GenericErrorMessage,
    genericOnChangeHandler
} from '../../../../helpers/form';
import {extractErrors} from '../../../../helpers/requests';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {defaultFormFields, FormFields, FormatSchema} from '../core/form';
import {getAllFormats, getFormat, updateFormat} from "../../../../requests/misc/Format";
import {Format} from "../../../../models/misc/Format";
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {getAllBuyingModels} from "../../../../requests/misc/BuyingModel";
import {BuyingModel} from "../../../../models/misc/BuyingModel";
import MultiSelect from "../../../../components/forms/MultiSelect";
import KrysSwitch from "../../../../components/forms/KrysSwitch";
import {filterData} from '../../../../helpers/dataManipulation';
import SingleSelect from '../../../../components/forms/SingleSelect';

const FormatEdit: React.FC = () => {
    const [format, setFormat] = useState<Format | null>(null);

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

                    const {buyingModels, parent, ...currentFormat} = response

                    if(parent) {
                        setForm({
                            ...currentFormat,
                            buying_model_ids: response.buyingModels.map(buyingModel => buyingModel.id),
                            parent_id: parent.id
                        });
                    } else {
                        setForm({
                            ...currentFormat,
                            buying_model_ids: response.buyingModels.map(buyingModel => buyingModel.id)
                        });
                    }
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
                        setFormats(filterData(response.data, 'name', ['All Formats']));
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
        if (format) {
            setIsResourceLoaded(true);

            krysApp.setPageTitle(generatePageTitle(Sections.MISC_FORMATS, PageTypes.EDIT, format.name))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [format]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleEdit = (e: any) => {
        if(format) {
            // we need to update the format's data by doing API call with form
            updateFormat(format.id, form).then(response => {
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
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Format"/>
            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={FormatSchema} onSubmit={handleEdit}
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

                                    <MultiSelect isResourceLoaded={isResourceLoaded} options={buyingModels}
                                                 defaultValue={format?.buyingModels} form={form} setForm={setForm}
                                                 name={'buying_model_ids'}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="buying_model_ids" className="mt-2"/>
                                    </div>
                                </div>}

                                <div className="mb-7">
                                    <KrysFormLabel text="Format Parent" isRequired={false}/>

                                    <SingleSelect isResourceLoaded={isResourceLoaded} options={formats} defaultValue={format?.parent} form={form} setForm={setForm} name='parent_id' showHierarchy={true}/>

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

export default FormatEdit;