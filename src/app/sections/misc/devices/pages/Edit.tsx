import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {GenericErrorMessage, genericOnChangeHandler} from '../../../../helpers/form';
import {extractErrors} from '../../../../helpers/requests';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {getDevice, updateDevice} from '../../../../requests/misc/Device';
import {DeviceSchema} from '../core/form';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {defaultFormFields, FormFields} from "../../audiences/core/form";
import {Device} from '../../../../models/misc/Device';


const DeviceEdit: React.FC = () => {
    const [device, setDevice] = useState<Device|null>(null);

    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const krysApp = useKrysApp();

    const navigate = useNavigate();

    let {id} = useParams();

    useEffect(() => {
        if (id) {
            // get the device we need to edit from the database
            getDevice(parseInt(id)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch the device to edit, so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    navigate('/error/400');
                } else {
                    // we were able to fetch current device to edit
                    setDevice(response);
                    setForm(response);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if(device) {
            krysApp.setPageTitle(generatePageTitle(Sections.MISC_DEVICES, PageTypes.EDIT, device.name))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleEdit = () => {
        if(device) {
            // we need to update the device's data by doing API call with form
            updateDevice(device.id, form).then(response => {
                if (axios.isAxiosError(response)) {
                    // show errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error
                    setFormErrors([GenericErrorMessage]);
                } else {
                    // we got the device so we're good
                    krysApp.setAlert({message: new AlertMessageGenerator('device', Actions.EDIT, KrysToastType.SUCCESS).message, type: KrysToastType.SUCCESS})
                    navigate(`/misc/devices`);
                }
            });
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Device" icon="fa-solid fa-pencil" icon_style="fs-3 text-warning"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={DeviceSchema} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        () => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-6" type="text"
                                           placeholder="Enter device name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/misc/devices'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default DeviceEdit;
