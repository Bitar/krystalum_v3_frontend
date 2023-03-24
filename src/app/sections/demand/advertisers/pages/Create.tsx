import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik} from 'formik';

import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {
    GenericErrorMessage, genericOnChangeHandler
} from '../../../../helpers/form';
import {extractErrors} from '../../../../helpers/requests';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {storeAdvertiser} from '../../../../requests/demand/Advertiser';
import {AdvertiserSchema, AdvertiserFormFields, defaultAdvertiserFormFields} from '../core/form';
import {useKrysApp} from "../../../../modules/general/KrysApp";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {AlertMessageGenerator} from "../../../../helpers/alertMessageGenerator";
import {Sections} from "../../../../helpers/sections";

const AdvertiserCreate: React.FC = () => {
    const [form, setForm] = useState<AdvertiserFormFields>(defaultAdvertiserFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const krysApp = useKrysApp();
    // we use this to navigate to the index page after the new advertiser is saved
    const navigate = useNavigate();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.DEMAND_ADVERTISERS, PageTypes.CREATE));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const onChangeHandler = (e: any) => {
        // in case of multi select, the element doesn't have a name because
        // we get only a list of values from the select and not an element with target value and name

        // add here any fields you don't want the default handler to handle
        genericOnChangeHandler(e, form, setForm);
    };

    const handleCreate = (e: any) => {
        // send API request to create the advertiser
        storeAdvertiser(form).then(response => {
                if (axios.isAxiosError(response)) {
                    // we need to show the errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error message
                    setFormErrors([GenericErrorMessage])
                } else {
                    // we were able to store the advertiser
                    krysApp.setAlert({
                        message: new AlertMessageGenerator('advertiser', Actions.CREATE, KrysToastType.SUCCESS).message,
                        type: KrysToastType.SUCCESS
                    });

                    navigate(`/demand/advertisers`);
                }
            }
        );
    };

    return (
        <KTCard>
            <KTCardHeader text="Create New Advertiser" icon="fa-regular fa-plus" icon_style="fs-3 text-success"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={AdvertiserSchema} onSubmit={handleCreate}
                        enableReinitialize>
                    {
                        (formik) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-6" type="text"
                                           placeholder="Enter full name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/demand/advertisers'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    );
}

export default AdvertiserCreate;